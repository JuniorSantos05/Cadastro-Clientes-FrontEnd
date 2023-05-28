import { createContext } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { TRegisterData } from "../components/RegisterForm/RegisterFormSchema";
import { TLoginData } from "../components/LoginForm/LoginFormSchema";
import { AxiosError } from "axios";
import Toastify from "../components/Toastify/Toastify";


interface IUserProviderProps {
  children: React.ReactNode;
}

interface IUserContext {
  userRegister: (userData: TRegisterData, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => Promise<void>
  login: (loginData: TLoginData, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => Promise<void>
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
  token: string;
  user: IUser
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const navigate = useNavigate();
    
  const userRegister = async (userData: TRegisterData, setLoading: React.Dispatch<React.SetStateAction<boolean>>): Promise<void> => {
    try {
      setLoading(true);
      await api.post<IUser>("/users", userData);
      Toastify.sucess("Conta registrada! 😎");
    } catch (error) {
      const requestError = error as AxiosError;
      Toastify.error(requestError.response?.data);
    } finally {
      setLoading(false);
      navigate("/")
    }
  };

  const login =async (loginData:TLoginData, setLoading: React.Dispatch<React.SetStateAction<boolean>>): Promise<void> => {
    try {
      setLoading(true);
      const response = await api.post<ILoginResponse>("/login", loginData);
      const { user: userResponse, token } = response.data
      localStorage.setItem("@TOKEN", token);
      localStorage.setItem("@USERID", JSON.stringify(userResponse.id));
      Toastify.sucess("Login realizado com sucesso! 😎");
    } catch (error) {
      const requestError = error as AxiosError;
      Toastify.error(requestError.response?.data);
    } finally {
      setLoading(false);
      navigate("/dashboard")
    }
  };
  

  return (
    <UserContext.Provider value={{ userRegister, login }}>
      {children}
    </UserContext.Provider>
  );
};

