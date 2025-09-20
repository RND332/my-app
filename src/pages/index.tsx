import { useSelector } from "react-redux";
import {
	makeStore,
	useAppDispatch,
	type RootState,
} from "@/stores/ContactStore";
import {
	addContact,
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
	const contacts = useSelector((s: RootState) => s.contactList);

	return (
		<Container className="container mt-4">
			<Row>
				<Col>
					<h1>Contacts</h1>
				</Col>
				<Col className="d-flex justify-content-end">
					<EditContactModal />
				</Col>
			</Row>
			<Row>
				<Table striped bordered hover size="sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>Type</th>
							<th>Value</th>
							<th>Description</th>
							<th>Edit</th>
						</tr>
					</thead>
					<tbody>
						{contacts.map((c) => (
							<tr key={c.id}>
								<td>{c.id}</td>
								<td>{c.type}</td>
								<td>{c.value}</td>
								<td>{c.description}</td>
								<td>
									<EditContactModal id={c.id} />
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Row>
		</Container>
	);
}

function EditContactModal({ id }: { id?: number }) {
	const [show, setShow] = useState(false);
	const currentValue = useSelector((s: RootState) =>
		id ? s.contactList.find((c) => c.id === id) : null,
	);
	const lastId = useSelector((s: RootState) =>
		s.contactList.reduce((max, c) => (c.id > max ? c.id : max), 0),
	);
	const newId = lastId + 1;

	const dispatch = useAppDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Omit<ContactList["contactList"][number], "id">>();

	function onSubmit(data: {
		type: ContactType;
		value: string;
		description: string;
	}) {
		setShow(false);
		if (!id) {
			dispatch(addContact({ id: newId, ...data }));
			return;
		}

		dispatch(updateContact({ id, ...data }));
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
				variant={id ? "secondary" : "primary"}
				onClick={() => setShow(true)}
			>
				{id ? "Edit" : "Add"}
			</Button>
		</>
	);
}
