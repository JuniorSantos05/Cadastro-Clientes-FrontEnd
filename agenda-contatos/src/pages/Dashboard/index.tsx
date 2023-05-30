import { useContext } from 'react';
import { ContactList } from "../../components/ContactsList/ContactsList"
import { ContactContext } from "../../providers/ContactsContext";
import { Header } from "../../components/Header/Header";
import { UserContext } from '../../providers/UserContext';

export const Dashboard = () => {
    const { setShowModalCreate } = useContext(ContactContext);
    const { userLogout } = useContext(UserContext);


    return (
        <div>
            <Header openModalCreate={() => setShowModalCreate(true)} userLogout={userLogout} />
            <ContactList />
        </div>
    )
}