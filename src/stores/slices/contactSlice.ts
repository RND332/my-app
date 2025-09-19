import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ContactList } from "@/types/Contact";

const initialState: ContactList = { contacts: [] };

const contactsSlice = createSlice({
	name: "contacts",
	initialState,
	reducers: {
		setContacts: (_, action: PayloadAction<ContactList>) => action.payload,
		addContact: (state, action: PayloadAction<ContactList["contacts"][0]>) => {
			state.contacts.push(action.payload);
		},
		removeContact: (state, action: PayloadAction<number>) => {
			state.contacts = state.contacts.filter((c) => c.id !== action.payload);
		},
		updateContact: (
			state,
			action: PayloadAction<ContactList["contacts"][0]>,
		) => {
			const index = state.contacts.findIndex((c) => c.id === action.payload.id);
			if (index !== -1) {
				state.contacts[index] = action.payload;
			}
		},
	},
});

export const { setContacts, addContact, removeContact, updateContact } =
	contactsSlice.actions;
export default contactsSlice.reducer;
