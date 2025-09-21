import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { makeStore } from "@/stores/store";
import { GlobalToasts } from "@/components/Toast";

export default function App({ Component, pageProps }: AppProps) {
	const store = makeStore(pageProps.initialReduxState);
	return (
		<Provider store={store}>
			<Component {...pageProps} />
			<GlobalToasts />
		</Provider>
	);
}
