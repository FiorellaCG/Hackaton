import DashboardAspirante from "@/src/Components/PagPrincipal/DashboardAspirante";
import MiPerfil from "@/src/Components/PagPrincipal/MiPerfil/MiPerfil";
import Navbar from "@/src/Components/PagPrincipal/Navbar/NavBar";


function MiPerfilPage() {
  return (
    <div>
        <Navbar />
        <MiPerfil />
        <DashboardAspirante />
    </div>
  );
}

export default MiPerfilPage;