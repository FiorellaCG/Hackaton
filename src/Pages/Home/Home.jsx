import Login from "@/src/Components/PagPrincipal/Login/Login";
import Navbar from "../../Components/PagPrincipal/Navbar/NavBar"
import { useTranslation } from 'react-i18next';
import Register from "@/src/Components/PagPrincipal/Register/Register";

function Home() {

  const { t } = useTranslation();

  return (
    <div>
        
        <Navbar />
        <Login />
        <Register /> 
    </div>
  )
}

export default Home