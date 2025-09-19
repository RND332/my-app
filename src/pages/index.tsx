import type { GetServerSideProps } from "next";
import type { Contact } from "@/types/Contact";

export const getServerSideProps: GetServerSideProps<{
	contacts: Contact[];
}> = async () => {
	const baseUrl = `https://jsonplaceholder.typicode.com`;
	const res = await fetch(`${baseUrl}/users`);
	const contacts: Contact[] = await res.json();

	return {
		props: { contacts },
	};
};

export default function Home({ contacts }: { contacts: Contact[] }) {
	console.log(contacts);

	return (
		<div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"></div>
	);
}
