import { useDispatch, useSelector } from "react-redux";
import {
	makeStore,
	useAppDispatch,
	type RootState,
} from "@/stores/ContactStore";
import { setContacts } from "@/stores/slices/contactSlice";
import type { ContactList } from "@/types/Contact";
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import { useState } from "react";

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
	const contacts = useSelector((s: RootState) => s.state.contacts);
	const [showModal, setShowModal] = useState(false);

	return (
		<Container className="container mt-4">
			<Row>
				<Col>
					<h1>Contacts</h1>
				</Col>
				<Col className="d-flex justify-content-end">
					<Button variant="primary" onClick={() => setShowModal(true)}>
						Add Contact
					</Button>
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
	const dispatch = useAppDispatch();

	return (
		<>
			<Modal show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>{id ? "Edit Contact" : "Add Contact"}</Modal.Title>
				</Modal.Header>
				<Modal.Body></Modal.Body>
			</Modal>
			<Button variant="secondary" onClick={() => setShow(true)}>
				{id ? "Edit" : "Add"}
			</Button>
		</>
	);
}
