import FormCarrera from "@/src/Components/PagPrincipal/FormCarrera";
import VisualizarCarreras from "@/src/Components/PagPrincipal/VisualizarCarreras";
import Navbar from "../../Components/PagPrincipal/Navbar/NavBar"
import { useTranslation } from 'react-i18next';

import Hero from "../../Components/PagPrincipal/Home/Hero";
import FeaturedJobs from "../../Components/PagPrincipal/Home/FeaturedJobs";
import Footer from "../../Components/PagPrincipal/Home/Footer";

function Home() {

  const { t } = useTranslation();

  return (
<<<<<<< HEAD
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
=======
    <div>

      <Navbar />
      <FormCarrera />
      <VisualizarCarreras />
>>>>>>> c975a9f713806c5e1941e97a1031da003a413098

      <main className="flex-grow">
        <Hero />
        <FeaturedJobs />
      </main>

      <Footer />
    </div>
  )
}

export default Home