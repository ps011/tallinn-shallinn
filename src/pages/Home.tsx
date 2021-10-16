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
  useIonViewWillEnter,
  IonModal,
  IonButton,
  IonItem,
  IonInput,
  IonLabel,
  IonLoading,
  IonFabList,
  IonCheckbox

} from '@ionic/react';
import './Home.css';
import { add, cloudDownloadSharp } from 'ionicons/icons';
import { getAllContacts, createContact as create, deleteItem } from '../services/contacts';
import Contact from '../interfaces/contacts';
import { Contacts, Contact as ContactNative } from "@ionic-native/contacts";

const Home: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [closenessFactor, setClosenessFactor] = useState(0);
  const [relation, setRelation] = useState('');
  const [country, setCountry] = useState('');
  const [preferableTime, setPreferableTime] = useState('');
  const [frequency, setFrequency] = useState('');
  const [contactsToImport, setContactsToImport] = useState<ContactNative[]>([]);
  const contactsNative = new Contacts();
  const checkedList = [];

  useIonViewWillEnter(async () => {
    if (!contacts.length)
      await getContacts();
  });

  const refresh = async (e: CustomEvent) => {
    await getContacts();
  };

  const getContacts = async () => {
    setShowLoading(true);
    const contactsData = await getAllContacts();
    setContacts(contactsData);
    setShowLoading(false);
  }

  const createContact = async () => {
    const contactDetails = {
      name,
      number,
      closenessFactor,
      relation,
      country,
      preferableTime,
      frequency
    }
    await create(contactDetails);
    setShowModal(false);
    resetForm();
    await getContacts();
  }

  const resetForm = () => {
    setName('');
    setNumber('');
    setClosenessFactor(0);
    setRelation('');
    setCountry('');
    setPreferableTime('');
    setFrequency('');
    setShowModal(false);
  }

  const deleteContact = async (id: string) => {
    await deleteItem(id);
    const updatedContacts = contacts.filter(c => c.id !== id);
    setContacts(updatedContacts);
  }

  const importContacts = async () => {
    setShowImportModal(true);
    const ctcs: ContactNative[] = await contactsNative.find(["*"], { multiple: true })
    // console.log(ctcs);
    setContactsToImport(ctcs.slice(10));
  }

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inbox</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonLoading
          cssClass='my-custom-class'
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={'Please wait...'}
        />
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonList>
          {contacts.map(c => <ContactItem key={c.number} contact={c} deleteContact={(id: string) => deleteContact(id)} />)}
        </IonList>
        <IonFab
          vertical="bottom"
          horizontal="end"
          slot="fixed"
        >
          <IonFabButton>
            <IonIcon icon={add} />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton onClick={() => importContacts()}><IonIcon icon={cloudDownloadSharp} /></IonFabButton>
            <IonFabButton onClick={() => setShowModal(true)}> <IonIcon icon={add} /></IonFabButton>
          </IonFabList>
        </IonFab>

        {/* Modal to create a new contact */}
        <IonModal isOpen={showModal} cssClass='createContact'>
          <IonItem>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput value={name} onIonChange={(e) => setName(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Number</IonLabel>
            <IonInput value={number} onIonChange={(e) => setNumber(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Closeness Factor</IonLabel>
            <IonInput value={closenessFactor} onIonChange={(e) => setClosenessFactor(parseInt(e.detail.value!))}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Relation</IonLabel>
            <IonInput value={relation} onIonChange={(e) => setRelation(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Country</IonLabel>
            <IonInput value={country} onIonChange={(e) => setCountry(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Frequency</IonLabel>
            <IonInput value={frequency} onIonChange={(e) => setFrequency(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Preferable Time</IonLabel>
            <IonInput value={preferableTime} onIonChange={(e) => setPreferableTime(e.detail.value!)}></IonInput>
          </IonItem>
          <IonButton onClick={createContact}>Create Contact</IonButton>
          <IonButton onClick={resetForm}>Cancel</IonButton>
        </IonModal>

        {/* Modal to select and import contacts */}
        <IonModal isOpen={showImportModal} cssClass='importContacts'>
          {
            contactsToImport!.map((c) => {
              // return <IonItem key={c.id}>
              return <IonLabel>{c.name.formatted}</IonLabel>
              // <IonCheckbox onIonChange={e => checkedList.push(e.detail.checked)} />
              // </IonItem>
            })
          }
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;
