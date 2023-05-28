import { UserProvider } from "./providers/UserContext";
import { RoutesMain } from "./routes";
import { ToastContainer } from 'react-toastify';
import "./styles/main.sass";
import "./styles/tailwind.css";

function App() {
  return (
    <>
  <ToastContainer />
  <UserProvider>
    <RoutesMain />;
  </UserProvider>
    </>
  )

}

export default App;
