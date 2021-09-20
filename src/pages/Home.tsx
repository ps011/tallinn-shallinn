import ContactItem from '../components/ContactItem';
import { useState } from 'react';
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
  
} from '@ionic/react';
import './Home.css';
import { add } from 'ionicons/icons';
import { getAllContacts } from '../services/contacts';
import Contact from '../interfaces/contacts';

const Home: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useIonViewWillEnter(async () => {
    const contactsData = await getAllContacts();
    setContacts(contactsData);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inbox</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Inbox
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {contacts.map(c => <ContactItem key={c.number} contact={c} />)}
        </IonList>
        <IonFab 
        vertical="bottom"
        horizontal="end"
        slot="fixed"
        >
          <IonFabButton>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
