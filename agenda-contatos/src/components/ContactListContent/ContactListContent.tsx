import { useContext } from "react"
import { ContactContext } from "../../providers/ContactsContext"
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Loading } from "../Loading/Loading";

export const ContactListContent = () => {

  const {contacts, removeContact, setSelectedContactId, setShowEditModal, loading} = useContext(ContactContext)

  const openEditModal = (contactId: number) => {
    setSelectedContactId(contactId);
    setShowEditModal(true);
  };

  if (loading) {
    return <Loading />;
  }

  if (!contacts || contacts.length === 0) {
    return <p>Não há contatos disponíveis.</p>;
  }

    return (
        <ul role="list" className="divide-y divide-gray-100">
          {contacts.map((contact) => (
            <li key={contact.email} className="flex justify-between gap-x-6 py-5">
              <div className="flex gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{contact.name}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{contact.phone}</p>
                </div>
              </div>
              <div className="sm:flex sm:flex-col sm:items-end">
               
                  <div className="mt-1 flex items-center gap-x-4">
                    <p className="text-xs leading-5 text-gray-500">{contact.email}</p>
                    <FaEdit onClick={() => openEditModal(contact.id)} className="hover:text-blue-500 cursor-pointer"/>
                    <FaTrash onClick={() => removeContact(contact.id)} className="hover:text-red-500 cursor-pointer"/>
                  </div>
               
              </div>
            </li>
          ))}
        </ul>
      )
}