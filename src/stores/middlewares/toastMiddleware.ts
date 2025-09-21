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
		if (setContacts.match(action)) {
			listenerApi.dispatch(
				addToast({ text: "Contacts list loaded", variant: "primary" }),
			);
		}
		if (addContact.match(action)) {
			listenerApi.dispatch(
				addToast({ text: "Contact added", variant: "success" }),
			);
		}
		if (removeContact.match(action)) {
			listenerApi.dispatch(
				addToast({ text: "Contact removed", variant: "danger" }),
			);
		}
		if (updateContact.match(action)) {
			listenerApi.dispatch(
				addToast({ text: "Contact updated", variant: "info" }),
			);
		}
	},
});
