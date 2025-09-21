import { combineReducers, configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./slices/contactSlice";
import toastReducer from "./slices/toastSlice";
import { useDispatch } from "react-redux";
import { toastMiddleware } from "./middlewares/toastMiddleware";

const reducer = combineReducers({
	contacts: contactsReducer,
	toast: toastReducer,
});

export function makeStore(preloadedState?: ReturnType<typeof reducer>) {
	return configureStore({
		reducer: reducer,
		preloadedState: preloadedState,
		middleware: (getDefault) =>
			getDefault().prepend(toastMiddleware.middleware),
	});
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
