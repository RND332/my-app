import { useSelector } from "react-redux";
import { makeStore, useAppDispatch, type RootState } from "@/stores/store";
import {
	addContact,
	removeContact,
	setContacts,
	updateContact,
} from "@/stores/slices/contactSlice";
import { ContactType, type ContactList } from "@/types/Contact";
import {
	Button,
	Col,
	Container,
	Form,
	Modal,
	Row,
	Table,
	Toast,
	ToastContainer,
} from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";

export async function getServerSideProps() {
	const res = await fetch("http://localhost:3000/api/contacts");
	const data: ContactList = await res.json();

	const store = makeStore();
	store.dispatch(setContacts(data));

	return {
		props: {
			initialReduxState: store.getState(),
		},
	};
}

export default function Home() {
	const contacts = useSelector((s: RootState) => s.contacts.contactList);
	const dispatch = useAppDispatch();

	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState("");

	const groupedContacts = contacts.reduce(
		(groups, contact) => {
			const type = contact.type;
			if (!groups[type]) {
				groups[type] = [];
			}
			groups[type].push(contact);
			return groups;
		},
		{} as Record<ContactType, typeof contacts>,
	);

	Object.keys(groupedContacts).forEach((type) => {
		groupedContacts[type as ContactType].sort((a, b) =>
			sortOrder === "desc" ? b.id - a.id : a.id - b.id,
		);
	});

	const handleDelete = (id: number) => {
		dispatch(removeContact(id));
		setShowToast(true);
	};

	return (
		<>
			<Container className="container mt-4">
				<Row>
					<Col>
						<h1>Contacts</h1>
					</Col>
					<Col className="d-flex justify-content-end gap-2">
						<Button
							variant="outline-secondary"
							onClick={() =>
								setSortOrder(sortOrder === "desc" ? "asc" : "desc")
							}
						>
							Sort {sortOrder === "desc" ? "Ascending" : "Descending"}
						</Button>
						<EditContactModal />
					</Col>
				</Row>
				{Object.entries(groupedContacts).map(([type, typeContacts]) => (
					<Row key={type} className="mb-4">
						<Col>
							<h3>{type}</h3>
							<Table striped bordered hover size="sm">
								<thead>
									<tr>
										<th>ID</th>
										<th>Value</th>
										<th>Description</th>
										<th>Edit</th>
									</tr>
								</thead>
								<tbody>
									{typeContacts.map((c) => (
										<tr key={c.id}>
											<td>{c.id}</td>
											<td>{c.value}</td>
											<td>{c.description}</td>
											<td className="d-flex gap-2">
												<EditContactModal id={c.id} />
												<Button
													variant="danger"
													onClick={() => handleDelete(c.id)}
												>
													Delete
												</Button>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</Col>
					</Row>
				))}
			</Container>

			<ToastContainer position="bottom-end">
				<Toast
					onClose={() => setShowToast(false)}
					show={showToast}
					delay={3000}
					autohide
				>
					<Toast.Header>
						<strong className="me-auto">Contact Manager</strong>
					</Toast.Header>
					<Toast.Body>Contact updated successfully!</Toast.Body>
				</Toast>
			</ToastContainer>
		</>
	);
}

function EditContactModal({ id }: { id?: number }) {
	const [show, setShow] = useState(false);
	const currentValue = useSelector((s: RootState) =>
		id ? s.contacts.contactList.find((c) => c.id === id) : null,
	);
	const newId =
		useSelector((s: RootState) =>
			s.contacts.contactList.reduce((max, c) => (c.id > max ? c.id : max), 0),
		) + 1;

	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Omit<ContactList["contactList"][number], "id">>();

	function onSubmit(data: {
		type: ContactType;
		value: string;
		description?: string;
	}) {
		if (!id) {
			dispatch(addContact({ id: newId, ...data }));
		} else {
			dispatch(updateContact({ id, ...data }));
		}

		setTimeout(() => {
			setShow(false);
		}, 3000);
	}

	return (
		<>
			<Modal show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>{id ? "Edit Contact" : "Add Contact"}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group className="mb-3">
							<Form.Label>Type *</Form.Label>
							<Form.Select
								{...register("type", { required: "Type is required" })}
								isInvalid={!!errors.type}
								defaultValue={currentValue?.type || ""}
							>
								<option value={ContactType.Email}>Email</option>
								<option value={ContactType.PhoneNumber}>Phone</option>
								<option value={ContactType.Address}>Address</option>
								<option value={ContactType.Telegram}>Telegram</option>
							</Form.Select>
							<Form.Control.Feedback type="invalid">
								{errors.type?.message}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Contact *</Form.Label>
							<Form.Control
								type="text"
								{...register("value", { required: "Contact is required" })}
								isInvalid={!!errors.value}
								defaultValue={currentValue?.value || ""}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.value?.message}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Description</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								{...register("description")}
								defaultValue={currentValue?.description || ""}
							/>
							<Form.Text className="text-muted">
								Optional description for this contact
							</Form.Text>
						</Form.Group>

						<div className="d-flex justify-content-end gap-2">
							<Button variant="secondary" onClick={() => setShow(false)}>
								Cancel
							</Button>
							<Button variant="primary" type="submit">
								{id ? "Update" : "Create"}
							</Button>
						</div>
					</Form>
				</Modal.Body>
			</Modal>
			<Button
				className="px-3"
				variant={id ? "secondary" : "primary"}
				onClick={() => setShow(true)}
			>
				{id ? "Edit" : "Add"}
			</Button>
		</>
	);
}
