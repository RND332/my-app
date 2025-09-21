import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { addToast } from "@/stores/slices/toastSlice";
import {
	setContacts,
	addContact,
	removeContact,
	updateContact,
} from "@/stores/slices/contactSlice";

export const toastMiddleware = createListenerMiddleware();

toastMiddleware.startListening({
	matcher: isAnyOf(setContacts, addContact, removeContact, updateContact),
	effect: async (action, listenerApi) => {
		const messages = {
			[addContact.type]: { text: "Contact added", variant: "success" },
			[removeContact.type]: { text: "Contact removed", variant: "danger" },
			[updateContact.type]: { text: "Contact updated", variant: "info" },
		};

		const message = messages[action.type as keyof typeof messages];
		if (message) {
			listenerApi.dispatch(addToast(message));
		}
	},
});
