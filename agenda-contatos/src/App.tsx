import { UserProvider } from "./providers/UserContext";
import { RoutesMain } from "./routes";
import "./styles/main.sass";
import "./styles/tailwind.css";

function App() {
  return (
  <UserProvider>
    <RoutesMain />;
  </UserProvider>
  )

}

export default App;
