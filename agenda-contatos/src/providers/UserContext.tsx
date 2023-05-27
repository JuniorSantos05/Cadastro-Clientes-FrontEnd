import { createContext, useState } from "react";
import { TRegisterData } from "../components/RegisterFormSchema";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

interface IUserProviderProps {
  children: React.ReactNode;
}

interface IUserContext {
  userRegister: (userData: TRegisterData, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => Promise<void>
  loading: boolean 
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
    
  const userRegister = async (userData: TRegisterData, setLoading: React.Dispatch<React.SetStateAction<boolean>>): Promise<void> => {
    try {
      setLoading(true);
      await api.post<IUser>("/users", userData);
      console.log("Cadastro efetuado com sucesso");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      navigate("/")
    }
  };

  return (
    <UserContext.Provider value={{ userRegister, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};
