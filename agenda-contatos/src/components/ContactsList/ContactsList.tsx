import "./ContactList.sass"
import { useContext } from 'react';
import { CreateContact } from '../ModalCreateContact/CreateContact';
import { ContactListContent } from '../ContactListContent/ContactListContent';
import { ContactContext } from '../../providers/ContactsContext';

export const ContactList = () => {
  const {showModalCreate, setShowModalCreate} = useContext(ContactContext);

  const closeModalCreate = () => {
    setShowModalCreate(false);
  };

  const toggleModal = () => {
    setShowModalCreate(!showModalCreate);
  };

  return (
    <>
      <CreateContact open={showModalCreate} onClose={closeModalCreate} toggleModal={toggleModal} />

      <div className="container">
        <ContactListContent />
      </div>
    </>
  );
}


