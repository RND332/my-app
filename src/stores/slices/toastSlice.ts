import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastMessage {
	id: string;
	text: string;
	variant?: string;
}

interface ToastState {
	queue: ToastMessage[];
}

const initialState: ToastState = { queue: [] };

const toastSlice = createSlice({
	name: "toast",
	initialState,
	reducers: {
		addToast: (state, action: PayloadAction<Omit<ToastMessage, "id">>) => {
			state.queue.push({
				id: crypto.randomUUID(),
				...action.payload,
			});
		},
		removeToast: (state, action: PayloadAction<string>) => {
			state.queue = state.queue.filter((t) => t.id !== action.payload);
		},
	},
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
