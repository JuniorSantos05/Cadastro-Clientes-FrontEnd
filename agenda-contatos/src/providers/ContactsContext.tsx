import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { TContactData } from "../components/ModalCreateContact/CreateContactSchema";
import { TContactUpdateData } from "../components/ModalEditContact/EditContactSchema";
import { Toastify } from "../components/Toastify/Toastify";

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
  selectedContactId: number | null
  setSelectedContactId: React.Dispatch<React.SetStateAction<number | null>>
  showEditModal: boolean
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
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
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getContacts = async (): Promise<void> => {
      try {
        const token = localStorage.getItem("@TOKEN");
        const response = await api.get("/contacts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContacts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
      getContacts()
    }, []);

  const createContact = async ( contactData: TContactData): Promise<void> => {
    const token = localStorage.getItem("@TOKEN");
    try {
      const response = await api.post<IContact>("/contacts", contactData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newContact: IContact = response.data;
      Toastify.success("Contato Criado com sucesso! 😎")
      setContacts([...contacts, newContact])
    } catch (error) {
      console.log(error);
      Toastify.error(error)
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
      Toastify.success("Contato removido com sucesso!")
    } catch (error) {
      console.log(error);
      Toastify.error(error)
    }
  };

  const updateContact = async (contactData: TContactUpdateData, contactId: number) => {
    const token = localStorage.getItem("@TOKEN");
    try {
      const response = await api.patch(`/contacts/${contactId}`, contactData, {
        headers: {
          Authorization: `Bearer ${token}`},
      });
      const updateContact: IContact = response.data;
      Toastify.success("Contato Atualizado! 😎")
      setContacts([...contacts, updateContact])
    } catch (error) {
      console.log(error);
      Toastify.error(error)
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
        selectedContactId,
        setSelectedContactId,
        showEditModal, 
        setShowEditModal,
        loading
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
