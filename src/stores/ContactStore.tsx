import { configureStore } from "@reduxjs/toolkit";
import type { ContactList } from "@/types/Contact";
import contactReducer from "./slices/ContactSlice";

export function makeStore(preloadedState?: ContactList) {
	return configureStore({
		reducer: contactReducer,
		preloadedState,
	});
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
