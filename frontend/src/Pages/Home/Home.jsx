import { useState, useEffect } from "react";
import Navbar from "../../Components/PagPrincipal/Navbar/NavBar";
import { useTranslation } from 'react-i18next';

import Hero from "../../Components/PagPrincipal/Home/Hero";
import FeaturedJobs from "../../Components/PagPrincipal/Home/FeaturedJobs";
import Footer from "../../Components/PagPrincipal/Home/Footer";
import FloatingAI from "../../Components/PagPrincipal/Home/FloatingAI";
import { obtenerVacantes } from "../../services/services";

function Home() {
  const { t } = useTranslation();

  const [featuredPreview, setFeaturedPreview] = useState([]);

  useEffect(() => {
    obtenerVacantes()
      .then(data => setFeaturedPreview(data.slice(0, 3)))
      .catch(err => console.error("Error al cargar vacantes:", err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-main)] transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedJobs jobs={featuredPreview} />
      </main>
      <Footer />
      <FloatingAI />
    </div>
  );
}

export default Home;
