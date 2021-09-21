import Contact from "../interfaces/contacts";

export const getAllContacts = async(): Promise<Contact[]> => {
    const fetchedContacts = await fetch(`${process.env.REACT_APP_BASE_URL}/contacts`);
    return await fetchedContacts.json();
}

export const createContact = async(contact: Contact): Promise<string> => {
    const createdContact = await fetch(`${process.env.REACT_APP_BASE_URL}/contacts`, {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: {
            authorization:  `Bearer ${process.env.REACT_APP_TOKEN}`
        }
    });
    return await createdContact.json();
}