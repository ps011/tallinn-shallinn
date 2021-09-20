import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
export const KEYS = {
    CONTACTS: 'contacts'
}
export default class DB {
    private static storage: SQLiteObject;
    private constructor() { }
    public static getStorage(): SQLiteObject {
        if (!DB.storage) {
            SQLite.create({
                name: 'tallinnshallinn.db',
                location: 'default'
              })
              .then(db => {
                db.executeSql('create table contacts(id VARCHAR, name VARCHAR, number VARCHAR, closenessFactor INT, frequency VARCHAR, relation VARCHAR, country VARCHAR, preferableTime VARCHAR, lastCalled VARCHAR;)')
                .then(() => {
                    console.log('Table Created Successfully')
                    DB.storage = db
                })
                .catch(e => console.log(e));          
                  
                })
              .catch(err => console.error(err));
            }
        return DB.storage;
    }
}