import Contact from "../interfaces/contacts";

export const getAllContacts = async(): Promise<Contact[]> => {
    const fetchedContacts = await fetch(`${process.env.REACT_APP_BASE_URL}/contacts`);
    return await fetchedContacts.json();
}