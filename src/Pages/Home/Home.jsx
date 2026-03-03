
import Navbar from "../../Components/PagPrincipal/Navbar/NavBar"
import { useTranslation } from 'react-i18next';

import Hero from "../../Components/PagPrincipal/Home/Hero";
import FeaturedJobs from "../../Components/PagPrincipal/Home/FeaturedJobs";
import Footer from "../../Components/PagPrincipal/Home/Footer";

function Home() {

  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow">
        <Hero />
        <FeaturedJobs />
      </main>

      <Footer />
    </div>
  )
}

export default Home