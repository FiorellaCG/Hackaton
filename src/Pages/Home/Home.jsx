
import Navbar from "../../Components/PagPrincipal/Navbar/NavBar"
import { useTranslation } from 'react-i18next';
import Register from "@/src/Components/PagPrincipal/Register/Register";

function Home() {

  const { t } = useTranslation();

  return (
    <div>
        
        <Navbar />

    </div>
  )
}

export default Home