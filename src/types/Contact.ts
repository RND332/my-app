type ContactType = "phone-number" | "email" | "address" | "telegram";

type ContactList = {
	contacts: Array<{
		id: number;
		type: ContactType;
		value: string;
		description: string;
	}>;
};

export type { ContactType, ContactList };
