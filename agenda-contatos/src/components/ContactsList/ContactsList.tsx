import "./ContactList.sass"
import { useContext } from 'react';
import { CreateContact } from '../ModalCreateContact/CreateContact';
import { ContactListContent } from '../ContactListContent/ContactListContent';
import { ContactContext } from '../../providers/ContactsContext';
import { EditContact } from "../ModalEditContact/EditContact";
import { Loading } from "../Loading/Loading";

export const ContactList = () => {
  const {
    showModalCreate, 
    setShowModalCreate, 
    showEditModal, 
    setShowEditModal, 
    selectedContactId,
    contacts,
    loading
  } = useContext(ContactContext);

  const closeModalCreate = () => {
    setShowModalCreate(false);
  };

  const closeModalEdit = () => {
    setShowEditModal(false);
  };


  return (
<>
      <CreateContact open={showModalCreate} onClose={closeModalCreate} />
      <EditContact open={showEditModal} onClose={closeModalEdit} contact={selectedContactId !== null ? { id: selectedContactId } : undefined} />

      <div className={`container ${loading ? 'flex items-center' : ''}`}>
        {loading ? (
          <Loading/> 
        ) : contacts.length > 0 ? (
          <ContactListContent /> 
        ) : (
          <p>Não há contatos disponíveis.</p> 
        )}
      </div>
    </>  );
}


