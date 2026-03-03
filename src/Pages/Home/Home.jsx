import FormCarrera from "@/src/Components/PagPrincipal/FormCarrera";
import VisualizarCarreras from "@/src/Components/PagPrincipal/VisualizarCarreras";
import Navbar from "../../Components/PagPrincipal/Navbar/NavBar"
import { useTranslation } from 'react-i18next';


function Home() {

  const { t } = useTranslation();

  return (
    <div>

      <Navbar />
      <FormCarrera />
      <VisualizarCarreras />

    </div>
  )
}

export default Home