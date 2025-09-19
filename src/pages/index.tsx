import { useSelector } from "react-redux";
import { makeStore, type RootState } from "@/stores/ContactStore";
import { setContacts } from "@/stores/slices/contactSlice";
import type { ContactList } from "@/types/Contact";

export default function Home() {
	const contacts = useSelector((s: RootState) => s.contacts.contacts);

	return (
		<div>
			<h1>Contacts</h1>
			<ul>
				{contacts.map((c) => (
					<li key={c.id}>
						[{c.type}] {c.value} - {c.description}
					</li>
				))}
			</ul>
		</div>
	);
}

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
