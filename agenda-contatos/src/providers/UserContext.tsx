import { createContext, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { TRegisterData } from "../components/RegisterForm/RegisterFormSchema";
import { TLoginData } from "../components/LoginForm/LoginFormSchema";
import { Toastify } from "../components/Toastify/Toastify"
import { isAxiosError } from 'axios';


interface IUserProviderProps {
  children: React.ReactNode;
}

interface IUserContext {
  userRegister: (userData: TRegisterData, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => Promise<void>
  login: (loginData: TLoginData) => Promise<void>
  userLogout: () => void
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

interface IUser {
  id: number
  name: string;
  email: string;
  password: string;
  phone: string;
  createdAt: string
}

interface ILoginResponse {
  user: IUser
  token: string;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
    
  const userRegister = async (userData: TRegisterData, setLoading: React.Dispatch<React.SetStateAction<boolean>>): Promise<void> => {
    try {
      setLoading(true);
      await api.post<IUser>("/users", userData);
      Toastify.success("Conta registrada! 😎")
    } catch (error) {
      console.log(error)
      Toastify.error(error)
    } finally {
      setLoading(false);
      navigate("/")
    }
  };

  const login =async (loginData:TLoginData): Promise<void> => {
    try {
      setLoading(true);
      const response = await api.post<ILoginResponse>("/login", loginData);
      localStorage.setItem("@TOKEN", response.data.token);
      Toastify.success("Conectado com sucesso!")
      navigate("/dashboard", { replace: true })
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 401) {
        const errorMessage = "Credenciais inválidas.";
        Toastify.error(errorMessage);
      } else {
        Toastify.error(error);
      }
    } finally {
      setLoading(false);
   }
  };

  const userLogout = () => {
    localStorage.removeItem("@TOKEN");
    navigate("/");
  };
  

  return (
    <UserContext.Provider value={{ userRegister, login, userLogout, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

