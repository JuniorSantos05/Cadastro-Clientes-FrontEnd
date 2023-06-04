import "./RegisterForm.sass";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useForm, SubmitHandler } from "react-hook-form";
import { TRegisterData, registerFormSchema } from "./RegisterFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { UserContext } from "../../providers/UserContext";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

export const RegisterForm = () => {
  const { userRegister } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState("password");
  const [showConfirmPass, setShowConfirmPass] = useState("password");

  const { register, handleSubmit, formState: { errors } } = useForm<TRegisterData>({
    resolver: zodResolver(registerFormSchema),
  });

  const submit: SubmitHandler<TRegisterData> = (userData) => {
    userRegister(userData, setLoading);
  };

  return (
    <div
      className="isolate bg-white px-6"
      style={{ paddingTop: "2rem", paddingBottom: "12px" }}
    >
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 4B8r3B4p7yhRXuBWLqsQ546WR43cqQwrbXMDFnBi6vSJBeif8tPW85a7r7DM961Jvk4hdryZoByEp8GC8HzsqJpRN4FxGM9.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Cadastro de Usuário
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Registre aqui suas informações para poder iniciar uma seção.
        </p>
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
                disabled={loading}
                data-tooltip-id="name-tooltip"
                data-tooltip-content={errors.name ? errors.name.message : ""}
                data-tooltip-place="top"
                data-tooltip-float={true}
              />
              <Tooltip id="name-tooltip" />
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
                disabled={loading}
                data-tooltip-id="email-tooltip"
                data-tooltip-content={errors.email ? errors.email.message : ""}
                data-tooltip-place="top"
                data-tooltip-float={true}
              />
              <Tooltip id="email-tooltip" />
            </div>
          </div>
          <div className="sm:col-span-2 relative">
            <label
              htmlFor="password"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Senha
            </label>
            <div className="mt-2.5">
              <input
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type={showPass}
                id="password"
                autoComplete="organization"
                {...register("password")}
                disabled={loading}
                data-tooltip-id="password-tooltip"
                data-tooltip-content={
                  errors.password ? errors.password.message : ""
                }
                data-tooltip-place="top"
                data-tooltip-float={true}
              />
              <Tooltip id="password-tooltip" />
              {showPass === "password" ? (
                <FaEye
                  className="eyeIcon text-gray-500"
                  onClick={() => setShowPass("text")}
                />
              ) : (
                <FaEyeSlash
                  className="eyeIcon text-gray-500"
                  onClick={() => setShowPass("password")}
                />
              )}
            </div>
          </div>
          <div className="sm:col-span-2 relative">
            <label
              htmlFor="password_confirm"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Confirme a senha
            </label>
            <div className="mt-2.5">
              <input
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type={showConfirmPass}
                id="password_confirm"
                autoComplete="organization"
                {...register("password_confirm")}
                disabled={loading}
                data-tooltip-id="password_confirm-tooltip"
                data-tooltip-content={
                  errors.password_confirm ? errors.password_confirm.message : ""
                }
                data-tooltip-place="top"
                data-tooltip-float={true}
              />
              <Tooltip id="password_confirm-tooltip" />
              {showConfirmPass === "password" ? (
                <FaEye
                  className="eyeIcon text-gray-500"
                  onClick={() => setShowConfirmPass("text")}
                />
              ) : (
                <FaEyeSlash
                  className="eyeIcon text-gray-500"
                  onClick={() => setShowConfirmPass("password")}
                />
              )}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="phone-number"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Telefone
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
                disabled={loading}
                data-tooltip-id="phone-tooltip"
                data-tooltip-content={errors.phone ? errors.phone.message : ""}
                data-tooltip-place="top"
                data-tooltip-float={true}
              />
              <Tooltip id="phone-tooltip" />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            disabled={loading}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </div>
      </form>
      <p className="mt-10 text-center text-sm text-gray-500">
        Já é cadastrado?{" "}
        <Link
          to="/"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Faça seu login aqui
        </Link>
      </p>
    </div>
  );
};
