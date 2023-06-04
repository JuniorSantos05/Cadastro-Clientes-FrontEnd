import { UserProvider } from "./providers/UserContext";
import { ContactProvider } from "./providers/ContactsContext";
import { RoutesMain } from "./routes";
import { ToastContainer } from 'react-toastify';
import "./styles/main.sass";
import "./styles/tailwind.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
  <>
  <ToastContainer />
  <UserProvider>
    <ContactProvider>
      <RoutesMain />;
    </ContactProvider>
  </UserProvider>
  </>
  )

}

export default App;
