import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home/Home";
import MiPerfilPage from "../Pages/Home/MiPerfilPage";
import LoginPage from "../Pages/Home/LoginPage";
import RegisterPage from "../Pages/Home/RegisterPage";
import DashboardAspirantePage from "../Pages/Home/DashboardAspirantePage";
import DashboardEmpresaPage from "../Pages/Home/DashboardEmpresaPage";
import DashboardInstitucion from "../Components/PagPrincipal/Institucion/DashboardInstitucion";
import PerfilInstitucion from "../Components/PagPrincipal/Institucion/PerfilInstitucion";
import AjustesPage from "../Pages/Home/AjustesPage";
import JobsPage from "../Pages/Home/JobsPage";
import CompaniesPage from "../Pages/Home/CompaniesPage";
import EntrevistaIA from "../Components/PagPrincipal/Home/EntrevistaIA/EntrevistaIA";
import FormCarrera from "../Components/PagPrincipal/FormCarrera";
import VisualizarCarreras from "../Components/PagPrincipal/VisualizarCarreras";
import StatsPage from "../Pages/Home/StatsPage";
import TalentMatchPage from "../Pages/Home/TalentMatchPage";
import CapacitacionesPage from "../Pages/Home/CapacitacionesPage";

// ADMIN
import AdminLayout from "../Pages/admin/AdminLayout";
import UsersManagement from "../Pages/admin/UsersManagement";
import ContentManagement from "../Pages/admin/ContentManagement";
import VacantesManagement from "../Pages/admin/VacantesManagement";
import ProgramasManagement from "../Pages/admin/ProgramasManagement";
import PracticasManagement from "../Pages/admin/PracticasManagement";
import ReportsDashboard from "../Pages/admin/ReportsDashboard";
import RequireAdminAuth from "../Components/admin/RequireAdminAuth";

import CreateCompanyInstitutionForm from "../Components/admin/CreateCompanyInstitutionForm";

// EMPRESA
import RequireEmpresaAuth from "../Components/PagPrincipal/Empresa/RequireEmpresaAuth";
import DashboardEmpresa from "../Components/PagPrincipal/Empresa/DashboardEmpresa";
import PerfilEmpresa from "../Components/PagPrincipal/Empresa/PerfilEmpresa";
import AjustesEmpresa from "../Components/PagPrincipal/Empresa/AjustesEmpresa";
import AspirantesEmpresa from "../Components/PagPrincipal/Empresa/AspirantesEmpresa";
import EstadisticasEmpresa from "../Components/PagPrincipal/Empresa/EstadisticasEmpresa";
import VacantesEmpresa from "../Components/PagPrincipal/Empresa/VacantesEmpresa";
import MensajesEmpresa from "../Components/PagPrincipal/Empresa/MensajesEmpresa";
import EmpresaHome from "../Components/PagPrincipal/Empresa/EmpresaHome";
import CapacitacionesEmpresa from "../Components/PagPrincipal/Empresa/CapacitacionesEmpresa";
import EntrevistasEmpresa from "../Components/PagPrincipal/Empresa/EntrevistasEmpresa";
import EntrevistasAspirante from "../Components/PagPrincipal/EntrevistasAspirante";

function Routing() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/mi-perfil" element={<MiPerfilPage />} />
      <Route path="/dashboard-aspirante" element={<DashboardAspirantePage />} />
      <Route path="/dashboard-empresa" element={<DashboardEmpresaPage />} />
      <Route path="/institucion/dashboard" element={<DashboardInstitucion />} />
      <Route path="/institucion/perfil" element={<PerfilInstitucion />} />
      <Route path="/ajustes" element={<AjustesPage />} />
      <Route path="/empleos" element={<JobsPage tipo="empleo" />} />
      <Route path="/pasantias" element={<JobsPage tipo="pasantia" />} />
      <Route path="/empresas" element={<CompaniesPage />} />
      <Route path="/estadisticas" element={<StatsPage />} />
      <Route path="/entrevista-ia" element={<EntrevistaIA />} />
      <Route path="/talento-match" element={<TalentMatchPage />} />
      <Route path="/capacitaciones" element={<CapacitacionesPage />} />
      <Route path="/entrevistas" element={<EntrevistasAspirante />} />


      {/* RUTAS EMPRESA */}
      <Route element={<RequireEmpresaAuth />}>
        <Route path="/empresa/dashboard" element={<DashboardEmpresa />}>
          <Route index element={<EmpresaHome />} />
          <Route path="perfil" element={<PerfilEmpresa />} />
          <Route path="ajustes" element={<AjustesEmpresa />} />
          <Route path="aspirantes" element={<AspirantesEmpresa />} />
          <Route path="estadisticas" element={<EstadisticasEmpresa />} />
          <Route path="vacantes" element={<VacantesEmpresa />} />
          <Route path="mensajes" element={<MensajesEmpresa />} />
          <Route path="capacitaciones" element={<CapacitacionesEmpresa />} />
          <Route path="entrevistas" element={<EntrevistasEmpresa />} />
        </Route>
      </Route>

      {/* ADMIN ROUTES PROTEGIDAS */}
      <Route path="/admin/*" element={<RequireAdminAuth />}>
        <Route element={<AdminLayout />}>
          <Route index element={<ReportsDashboard />} />
          <Route path="users" element={<UsersManagement />} />
          <Route path="users/create-company" element={<CreateCompanyInstitutionForm />} />
          <Route path="content" element={<ContentManagement />} />
          <Route path="content/vacantes" element={<VacantesManagement />} />
          <Route path="content/programas" element={<ProgramasManagement />} />
          <Route path="content/practicas" element={<PracticasManagement />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Routing;