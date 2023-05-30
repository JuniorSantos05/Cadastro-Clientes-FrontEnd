import { useContext } from 'react';
import { ContactList } from "../../components/ContactsList/ContactsList"
import { ContactContext } from "../../providers/ContactsContext";
import { Header } from "../../components/Header/Header";

export const Dashboard = () => {
    const { setShowModalCreate} = useContext(ContactContext);

    return (
        <div>
            <Header openModalCreate={() => setShowModalCreate(true)}/>
            <ContactList/>                
        </div>
    )
}