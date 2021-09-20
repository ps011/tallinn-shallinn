import Contact from "../interfaces/contacts";
import DB, { KEYS } from "./db";

export default class CRUD {
    db = DB.getStorage();
    
    public async getContacts() {  
        return await  this.db.executeSql('SELECt * FROM contacts');
    }

    // public async addContact(contact: Contact) {
    //     const contacts = JSON.parse(await this.getContacts()) || [];
    //     contacts.push(contact);
    //     await this.db.set(KEYS.CONTACTS, JSON.stringify(contacts))
    // }
}