import { useContext } from "react"
import { ContactContext } from "../../providers/ContactsContext"


export const ContactListContent = () => {

  const {contacts} = useContext(ContactContext)

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
              <div className="hidden sm:flex sm:flex-col sm:items-end">
               
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">{contact.email}</p>
                  </div>
               
              </div>
            </li>
          ))}
        </ul>
      )
}