enum ContactType {
	PhoneNumber = "phone-number",
	Email = "email",
	Address = "address",
	Telegram = "telegram",
}

type ContactList = {
	contactList: Array<{
		id: number;
		type: ContactType;
		value: string;
		description: string;
	}>;
};

export { ContactType, type ContactList };
