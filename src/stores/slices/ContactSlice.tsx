import { createSlice } from "@reduxjs/toolkit";
import type { ContactList } from "@/types/Contact";

interface RemoveContactAction {
	type: string;
	payload: number;
}
interface UpdateContactAction {
	type: string;
	payload: ContactList["contacts"] extends (infer U)[] ? U : never;
}

const contactSlice = createSlice({
	name: "contact",
	initialState: { contacts: [] } satisfies ContactList as ContactList,
	reducers: {
		addContact(state, action) {
			state.contacts.push(action.payload);
		},
		removeContact(state, action: RemoveContactAction) {
			state.contacts = state.contacts.filter(
				(contact) => contact.id !== action.payload,
			);
		},
		updateContact(state, action: UpdateContactAction) {
			const index = state.contacts.findIndex(
				(contact) => contact.id === action.payload.id,
			);
			if (index !== -1) {
				state.contacts[index] = action.payload;
			}
		},
	},
});

export const { addContact, removeContact, updateContact } =
	contactSlice.actions;
export default contactSlice.reducer;
