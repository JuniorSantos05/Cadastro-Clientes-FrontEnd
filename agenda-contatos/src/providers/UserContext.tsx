import { createContext } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { TRegisterData } from "../components/RegisterForm/RegisterFormSchema";
import { TLoginData } from "../components/LoginForm/LoginFormSchema";


interface IUserProviderProps {
  children: React.ReactNode;
}

interface IUserContext {
  userRegister: (userData: TRegisterData, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => Promise<void>
  login: (loginData: TLoginData, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => Promise<void>
  userLogout: () => void
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
  const navigate = useNavigate();
    
  const userRegister = async (userData: TRegisterData, setLoading: React.Dispatch<React.SetStateAction<boolean>>): Promise<void> => {
    try {
      setLoading(true);
      await api.post<IUser>("/users", userData);
      console.log("Conta registrada! 😎");
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
      navigate("/")
    }
  };

  const login =async (loginData:TLoginData, setLoading: React.Dispatch<React.SetStateAction<boolean>>): Promise<void> => {
    try {
      setLoading(true);
      const { data } = await api.post<ILoginResponse>("/login", loginData);
      localStorage.setItem("@TOKEN", data.token);
      //localStorage.setItem("@USERID", JSON.stringify(data.user.id)); 
      setLoading(false);
      navigate("/dashboard", { replace: true })
    } catch (error) {
      console.log(error)
    } 
  };

  const userLogout = () => {
    localStorage.removeItem("@TOKEN");
    navigate("/");
  };
  

  return (
    <UserContext.Provider value={{ userRegister, login, userLogout }}>
      {children}
    </UserContext.Provider>
  );
};

