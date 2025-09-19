import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./slices/contactSlice";
import { useDispatch } from "react-redux";

export const makeStore = (preloadedState?: {
	contacts: ReturnType<typeof contactsReducer>;
}) =>
	configureStore({
		reducer: { contacts: contactsReducer },
		preloadedState,
	});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
