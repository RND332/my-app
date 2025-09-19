("use client");
import React from "react";
import { useForm } from "react-hook-form";
import type { ContactList } from "@/types/Contact";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, ListGroup, Form } from "react-bootstrap";

function List({ initialState }: { initialState: ContactList }) {
	const dispatch = useDispatch();
	const contacts = useSelector((state: ContactList) => state.contacts);
	const [editingId, setEditingId] = React.useState<string | null>(null);

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm<ContactFormData>();

	React.useEffect(() => {
		dispatch({ type: "SET_CONTACTS", payload: initialContacts });
	}, [initialContacts, dispatch]);

	const onSubmit = (data: ContactFormData) => {
		if (editingId) {
			dispatch({
				type: "UPDATE_CONTACT",
				payload: { id: editingId, ...data },
			});
			setEditingId(null);
		} else {
			dispatch({
				type: "ADD_CONTACT",
				payload: { id: Date.now().toString(), ...data },
			});
		}
		reset();
	};

	const handleEdit = (contact: Contact) => {
		setEditingId(contact.id);
		setValue("name", contact.name);
		setValue("email", contact.email);
		setValue("phone", contact.phone || "");
	};

	const handleRemove = (id: string) => {
		dispatch({ type: "REMOVE_CONTACT", payload: id });
	};

	const cancelEdit = () => {
		setEditingId(null);
		reset();
	};

	return (
		<Container>
			<Row>
				<Col md={6}>
					<h3>Contacts</h3>
					<ListGroup>
						{contacts.map((contact) => (
							<ListGroup.Item
								key={contact.id}
								className="d-flex justify-content-between align-items-center"
							>
								<div>
									<strong>{contact.name}</strong>
									<br />
									<small>{contact.email}</small>
									{contact.phone && (
										<>
											<br />
											<small>{contact.phone}</small>
										</>
									)}
								</div>
								<div>
									<Button
										variant="outline-primary"
										size="sm"
										className="me-2"
										onClick={() => handleEdit(contact)}
									>
										Edit
									</Button>
									<Button
										variant="outline-danger"
										size="sm"
										onClick={() => handleRemove(contact.id)}
									>
										Remove
									</Button>
								</div>
							</ListGroup.Item>
						))}
					</ListGroup>
				</Col>

				<Col md={6}>
					<h3>{editingId ? "Edit Contact" : "Add New Contact"}</h3>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group className="mb-3">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								{...register("name", { required: "Name is required" })}
								isInvalid={!!errors.name}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.name?.message}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								{...register("email", {
									required: "Email is required",
									pattern: {
										value: /^\S+@\S+$/i,
										message: "Invalid email address",
									},
								})}
								isInvalid={!!errors.email}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.email?.message}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Phone (Optional)</Form.Label>
							<Form.Control type="tel" {...register("phone")} />
						</Form.Group>

						<div className="d-flex gap-2">
							<Button variant="primary" type="submit">
								{editingId ? "Update" : "Add"} Contact
							</Button>
							{editingId && (
								<Button variant="secondary" onClick={cancelEdit}>
									Cancel
								</Button>
							)}
						</div>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}

export { List };
