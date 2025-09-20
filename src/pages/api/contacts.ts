import type { NextApiRequest, NextApiResponse } from "next";
import { type ContactList, ContactType } from "@/types/Contact";

const data = {
	contactList: [
		{
			id: 1,
			type: ContactType.PhoneNumber,
			value: "+7 (937) 363 40 22",
			description: "Work",
		},
		{
			id: 2,
			type: ContactType.Email,
			value: "rnd332@proton.me",
			description: "Personal",
		},
		{
			id: 3,
			type: ContactType.Telegram,
			value: "@rnd332",
			description: "Main handle",
		},
	],
} satisfies ContactList;

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ContactList>,
) {
	res.status(200).json(data);
}
