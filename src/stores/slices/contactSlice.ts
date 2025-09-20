import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ContactList } from "@/types/Contact";

const initialState: ContactList = { contactList: [] };

const contactsSlice = createSlice({
	name: "contacts",
	initialState,
	reducers: {
		setContacts: (_, action: PayloadAction<ContactList>) => action.payload,
		addContact: (
			state,
			action: PayloadAction<ContactList["contactList"][0]>,
		) => {
			state.contactList.push(action.payload);
		},
		removeContact: (state, action: PayloadAction<number>) => {
			state.contactList = state.contactList.filter(
				(c) => c.id !== action.payload,
			);
		},
		updateContact: (
			state,
			action: PayloadAction<ContactList["contactList"][0]>,
		) => {
			const index = state.contactList.findIndex(
				(c) => c.id === action.payload.id,
			);
			if (index !== -1) {
				state.contactList[index] = action.payload;
			}
		},
	},
});

export const { setContacts, addContact, removeContact, updateContact } =
	contactsSlice.actions;
export default contactsSlice.reducer;
