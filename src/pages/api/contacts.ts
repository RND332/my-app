import type { NextApiRequest, NextApiResponse } from "next";
import type { ContactList } from "@/types/Contact";

const data: ContactList = {
	contacts: [
		{ id: 1, type: "phone-number", value: "+41 123 456", description: "Work" },
		{
			id: 2,
			type: "email",
			value: "test@example.com",
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
