import "./EditContact.sass";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useContext, useEffect, useRef } from "react";
import { ContactContext, ContactId } from "../../providers/ContactsContext";
import { TContactUpdateData, editContactSchema } from "./EditContactSchema";
import { SubmitHandler, useForm } from "react-hook-form";

interface EditContactProps {
  open: boolean;
  contact: ContactId | undefined;
  onClose: () => void;
}

export const EditContact = ({ open, onClose, contact }: EditContactProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { updateContact } = useContext(ContactContext);

  const { register, handleSubmit, formState: { errors } } = useForm<TContactUpdateData>({
    resolver: zodResolver(editContactSchema),
    shouldUnregister: true
  });

  const submit: SubmitHandler<TContactUpdateData> = (contactData) => {
    if (contact !== undefined) {
      updateContact(contactData, contact.id)}
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (open) {
      window.addEventListener("click", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="background" onClick={onClose}>
      <section
        className="container"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Editar Contato
          </h2>
        </div>
        <form
          action="#"
          method="POST"
          className="mx-auto mt-16 max-w-xl sm:mt-20"
          onSubmit={handleSubmit(submit)}
        >
          <div className="sm:col-span-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Nome Completo
              </label>
              <div className="mt-2.5">
                <input
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="text"
                  id="name"
                  autoComplete="given-name"
                  {...register("name")}
                />
                {errors.name && (
                  <span id="erro_msg">{errors.name.message}</span>
                )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2.5">
                <input
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="email"
                  id="email"
                  autoComplete="email"
                  {...register("email")}
                />
                {errors.email && (
                  <span id="erro_msg">{errors.email.message}</span>
                )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="phone-number"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Phone number
              </label>
              <div className="relative mt-2.5">
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <label htmlFor="country" className="sr-only">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  >
                    <option>BR</option>
                    <option>US</option>
                    <option>CA</option>
                  </select>
                  <ChevronDownIcon
                    className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="tel"
                  id="phone-number"
                  autoComplete="tel"
                  {...register("phone")}
                />
                {errors.phone && (
                  <span id="erro_msg">{errors.phone.message}</span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Atualizar Contato
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
