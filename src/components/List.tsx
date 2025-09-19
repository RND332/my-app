import type { ContactList } from "@/types/Contact";
import { makeStore, useContactStore } from "@/stores/ContactStore";
import { Provider } from "react-redux";

function ContactsComponent({ initialState }: { initialState: ContactList }) {
	const store = useContactStore(initialState);

	return (
		<Provider store={store}>
			<List />
		</Provider>
	);
}

function List() {
	const store = makeStore();
	console.log(store.getState());

	return (
		<>
			{store.getState().contacts.map((contact) => (
				<div key={contact.id}>{contact.id}</div>
			))}
		</>
	);
}

export { ContactsComponent };
