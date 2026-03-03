
import Navbar from "../../Components/PagPrincipal/Navbar/NavBar"
import { useTranslation } from 'react-i18next';


function Home() {

  const { t } = useTranslation();

  return (
    <div>
        
        <Navbar />

    </div>
  )
}

export default Home