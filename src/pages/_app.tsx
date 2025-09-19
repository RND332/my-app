import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { makeStore } from "@/stores/ContactStore";

export default function App({ Component, pageProps }: AppProps) {
	const store = makeStore(pageProps.initialReduxState);
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}
