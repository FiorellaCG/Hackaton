import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home/Home";
import MiPerfilPage from "../Pages/Home/MiPerfilPage";
import LoginPage from "../Pages/Home/LoginPage";
import RegisterPage from "../Pages/Home/RegisterPage";
import DashboardAspirantePage from "../Pages/Home/DashboardAspirantePage";
import DashboardEmpresaPage from "../Pages/Home/DashboardEmpresaPage";
import DashboardInstitucion from "../Components/PagPrincipal/Institucion/DashboardInstitucion";
import AjustesPage from "../Pages/Home/AjustesPage";
import JobsPage from "../Pages/Home/JobsPage";
import EntrevistaIA from "../Components/PagPrincipal/Home/EntrevistaIA/EntrevistaIA";
import FormCarrera from "../Components/PagPrincipal/FormCarrera";
import VisualizarCarreras from "../Components/PagPrincipal/VisualizarCarreras";

// ADMIN
import AdminLayout from "../Pages/admin/AdminLayout";
import UsersManagement from "../Pages/admin/UsersManagement";
import ContentManagement from "../Pages/admin/ContentManagement";
import VacantesManagement from "../Pages/admin/VacantesManagement";
import ProgramasManagement from "../Pages/admin/ProgramasManagement";
import PracticasManagement from "../Pages/admin/PracticasManagement";
import ReportsDashboard from "../Pages/admin/ReportsDashboard";

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
      <Route path="/ajustes" element={<AjustesPage />} />
      <Route path="/empleos" element={<JobsPage tipo="empleo" />} />
      <Route path="/pasantias" element={<JobsPage tipo="pasantia" />} />
      <Route path="/entrevista-ia" element={<EntrevistaIA />} />


      {/* RUTAS EMPRESA */}
      <Route element={<RequireEmpresaAuth />}>
        <Route path="/empresa/dashboard" element={<DashboardEmpresa />}>
          <Route path="perfil" element={<PerfilEmpresa />} />
          <Route path="ajustes" element={<AjustesEmpresa />} />
          <Route path="aspirantes" element={<AspirantesEmpresa />} />
          <Route path="estadisticas" element={<EstadisticasEmpresa />} />
          <Route path="vacantes" element={<VacantesEmpresa />} />
          <Route path="mensajes" element={<MensajesEmpresa />} />
        </Route>
      </Route>

      {/* ADMIN ROUTES CON NESTING */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* Dashboard por defecto */}
        <Route index element={<ReportsDashboard />} />

        {/* Users */}
        <Route path="users" element={<UsersManagement />} />
        <Route path="users/create-company" element={<CreateCompanyInstitutionForm />} />

        {/* Content */}
        <Route path="content" element={<ContentManagement />} />
        <Route path="content/vacantes" element={<VacantesManagement />} />
        <Route path="content/programas" element={<ProgramasManagement />} />
        <Route path="content/practicas" element={<PracticasManagement />} />

        {/* Reports */}
        <Route path="reports" element={<ReportsDashboard />} />
      </Route>
    </Routes>
  );
}

export default Routing;