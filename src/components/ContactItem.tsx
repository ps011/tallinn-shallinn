import {
  IonAvatar,
  IonItem,
  IonLabel,
  IonNote,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from '@ionic/react';
import Contact from '../interfaces/contacts';
import './ContactItem.css';
interface ContactItemProps {
  contact: Contact;
  deleteContact: (id: string) => {};
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, deleteContact }) => {

  return (
    <IonItemSliding>
      <IonItem routerLink={`/message/${contact.id}`} detail={false}>
        <IonAvatar slot="start">
          <img
            src={`https://avatars.dicebear.com/api/micah/${contact.name}.svg?mouth=laughing`}
            alt="User Avatar" />
        </IonAvatar>
        <IonLabel className="ion-text-wrap">
          <h2>
            {contact.name}
            <span className="date">
              <IonNote>{contact.lastCalled}</IonNote>
            </span>
          </h2>
          <h3>{contact.relation}</h3>
          <p>
            {contact.preferableTime}
          </p>
        </IonLabel>
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={() => deleteContact(contact.id!)}>Delete</IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default ContactItem;
