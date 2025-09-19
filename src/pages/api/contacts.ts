import type { NextApiRequest, NextApiResponse } from "next";
import type { ContactList } from "@/types/Contact";

const data: ContactList = {
	contacts: [
		{
			id: 1,
			type: "phone-number",
			value: "+7 (937) 363 40 22",
			description: "Work",
		},
		{
			id: 2,
			type: "email",
			value: "rnd332@proton.me",
			description: "Personal",
		},
		{ id: 3, type: "telegram", value: "@rnd332", description: "Main handle" },
	],
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ContactList>,
) {
	res.status(200).json(data);
}
