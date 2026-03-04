import { useState, useEffect } from "react";
import FormCarrera from "../../Components/PagPrincipal/FormCarrera";
import VisualizarCarreras from "../../Components/PagPrincipal/VisualizarCarreras";
import Navbar from "../../Components/PagPrincipal/Navbar/NavBar";
import { useTranslation } from 'react-i18next';

import Hero from "../../Components/PagPrincipal/Home/Hero";
import FeaturedJobs from "../../Components/PagPrincipal/Home/FeaturedJobs";
import Footer from "../../Components/PagPrincipal/Home/Footer";
import FloatingAI from "../../Components/PagPrincipal/Home/FloatingAI";
import { allJobs } from "../../data/mockJobs";

function Home() {
  const { t } = useTranslation();

  const [featuredPreview, setFeaturedPreview] = useState([]);

  useEffect(() => {
    let combinedJobs = [...allJobs];
    try {
      const stored = localStorage.getItem('vacantes_empresa');
      if (stored) {
        const parsed = JSON.parse(stored);
        let companyName = "Empresa Confidencial";
        let companyLogo = `https://ui-avatars.com/api/?name=Empresa&background=163a6d&color=fff`;

        const currentUser = localStorage.getItem('usuario');
        if (currentUser) {
          const u = JSON.parse(currentUser);
          if (u.empresa?.nombre) {
            companyName = u.empresa.nombre;
            companyLogo = u.empresa.url_imagen || `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=163a6d&color=fff`;
          }
        }

        const localJobs = parsed.map(v => ({
          id: `local-${v.id}`,
          title: v.titulo,
          company: companyName,
          location: v.ubicacion,
          type: v.tipo || "Empleo",
          schedule: v.horario || v.modalidad,
          level: "Profesional",
          salary: "A convenir",
          logo: companyLogo,
          tags: [v.modalidad, ...(v.requisitos ? v.requisitos.split(',').map(r => r.trim()) : [])]
        }));

        // Put newest first
        combinedJobs = [...localJobs, ...combinedJobs];
      }
    } catch (e) {
      console.error(e);
    }
    setFeaturedPreview(combinedJobs.slice(0, 3));
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
