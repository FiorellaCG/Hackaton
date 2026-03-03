import { useState } from "react";
import FormCarrera from "@/src/Components/PagPrincipal/FormCarrera";
import VisualizarCarreras from "@/src/Components/PagPrincipal/VisualizarCarreras";
import Navbar from "../../Components/PagPrincipal/Navbar/NavBar";
import { useTranslation } from 'react-i18next';

import Hero from "../../Components/PagPrincipal/Home/Hero";
import FeaturedJobs from "../../Components/PagPrincipal/Home/FeaturedJobs";
import Footer from "../../Components/PagPrincipal/Home/Footer";
import FloatingAI from "../../Components/PagPrincipal/Home/FloatingAI";
import { allJobs } from "../../data/mockJobs";

function Home() {
  const { t } = useTranslation();

  // Show a mix of featured jobs on the home page
  const featuredPreview = allJobs.slice(0, 3);

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