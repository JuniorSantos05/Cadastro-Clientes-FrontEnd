import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { TContactData } from "../components/ModalCreateContact/CreateContactSchema";

interface IContactProviderProps {
    children: React.ReactNode;
  }
  
interface IContactContext {
    contacts: IContact[]
    showModalCreate: boolean
    setShowModalCreate: React.Dispatch<React.SetStateAction<boolean>>
    createContact: (contactData: TContactData, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => Promise<void>
   }

interface IContact {
    id: number,
    name: string,
    email: string,
    phone: string,
    createdAt: string
}

export const ContactContext = createContext({} as IContactContext);

export const ContactProvider = ({ children }: IContactProviderProps) => {
    const [contacts, setContacts] = useState([] as IContact[])
    const [showModalCreate, setShowModalCreate] = useState(false)

    const getContacts = async (): Promise<void> => {
      try {
        const token = localStorage.getItem("@TOKEN");
        const response = await api.get("/contacts", {
            headers: { Authorization: `Bearer ${token}`}
        });
        setContacts(response.data);
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
        getContacts();        
      }, []);

      const createContact = async (contactData: TContactData, setLoading: React.Dispatch<React.SetStateAction<boolean>>): Promise<void> => {
        try {
          setLoading(true);
          const token = localStorage.getItem("@TOKEN")
          await api.post<IContact>("/contacts", contactData, {
            headers: { Authorization: `Bearer ${token}`}
          });
          console.log("Conta registrada! 😎");

          getContacts();
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false);
          setShowModalCreate(false)
        }
      };
    


    return (
        <ContactContext.Provider value={{ contacts, showModalCreate, setShowModalCreate, createContact }}>
          {children}
        </ContactContext.Provider>
      );
}
