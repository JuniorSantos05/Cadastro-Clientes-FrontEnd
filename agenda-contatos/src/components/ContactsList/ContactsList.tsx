import "./ContactList.sass"
import { useContext } from 'react';
import { CreateContact } from '../ModalCreateContact/CreateContact';
import { ContactListContent } from '../ContactListContent/ContactListContent';
import { ContactContext } from '../../providers/ContactsContext';
import { EditContact } from "../ModalEditContact/EditContact";

export const ContactList = () => {
  const {showModalCreate, setShowModalCreate, showEditModal, setShowEditModal, selectedContactId} = useContext(ContactContext);

  const closeModalCreate = () => {
    setShowModalCreate(false);
  };

  const closeModalEdit = () => {
    setShowEditModal(false);
  };


  return (
    <>
      <CreateContact open={showModalCreate} onClose={closeModalCreate} />
      <EditContact 
      open={showEditModal} 
      onClose={closeModalEdit} 
      contact={selectedContactId !== null ? { id: selectedContactId } : undefined}
/>

      <div className="container">
        <ContactListContent />
      </div>
    </>
  );
}


