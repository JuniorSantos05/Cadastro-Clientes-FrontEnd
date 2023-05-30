import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { TContactData } from "../components/ModalCreateContact/CreateContactSchema";
import { TContactUpdateData } from "../components/ModalEditContact/EditContactSchema";

interface IContactProviderProps {
  children: React.ReactNode;
}

interface IContactContext {
  contacts: IContact[];
  showModalCreate: boolean;
  setShowModalCreate: React.Dispatch<React.SetStateAction<boolean>>;
  createContact: (contactData: TContactData) => Promise<void>
  removeContact: (contactId: number) => Promise<void>;
  updateContact: (contactData: TContactUpdateData, contactId: number) => Promise<void>
  getContacts: () => Promise<void>
  selectedContactId: number | null
  setSelectedContactId: React.Dispatch<React.SetStateAction<number | null>>
  showEditModal: boolean
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IContact {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface ContactId {
  id: number;
}


export type PartialContact = Partial<IContact>;

export const ContactContext = createContext({} as IContactContext);

export const ContactProvider = ({ children }: IContactProviderProps) => {
  const [contacts, setContacts] = useState([] as IContact[]);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);



  const getContacts = async (): Promise<void> => {
    try {
      const token = localStorage.getItem("@TOKEN");
      const response = await api.get("/contacts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const createContact = async ( contactData: TContactData): Promise<void> => {
    const token = localStorage.getItem("@TOKEN");
    try {
      await api.post<IContact>("/contacts", contactData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Contato Criado! 😎");
      getContacts();
    } catch (error) {
      console.log(error);
    } finally {
      setShowModalCreate(false);
    }
  };

  const removeContact = async (contactId: number) => {
    const token = localStorage.getItem("@TOKEN");

    try {
      await api.delete(`/contacts/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newContactsList = contacts.filter(
        (contact) => contact.id !== contactId
      );
      setContacts(newContactsList);
      console.log("Contato removido com sucesso!");
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contactData: TContactUpdateData, contactId: number) => {
    const token = localStorage.getItem("@TOKEN");
    try {
      await api.patch(`/contacts/${contactId}`, contactData, {
        headers: {
          Authorization: `Bearer ${token}`},
      });
      console.log("Contato Atualizado! 😎");
      getContacts();
    } catch (error) {
      console.log(error);
    } finally {
      setShowEditModal(false);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        showModalCreate,
        setShowModalCreate,
        createContact,
        removeContact,
        updateContact,
        getContacts,
        selectedContactId,
        setSelectedContactId,
        showEditModal, 
        setShowEditModal
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
