import { Routes, Route, Navigate } from "react-router-dom";

// PUBLIC & GENERAL
import Home from "../Pages/Home/Home";
import LoginPage from "../Pages/Home/LoginPage";
import RegisterPage from "../Pages/Home/RegisterPage";
import JobsPage from "../Pages/Home/JobsPage";
import CompaniesPage from "../Pages/Home/CompaniesPage";
import StatsPage from "../Pages/Home/StatsPage";

// ASPIRANTE / PRIVATE USERS
import MiPerfilPage from "../Pages/Home/MiPerfilPage";
import AjustesPage from "../Pages/Home/AjustesPage";
import DashboardAspirantePage from "../Pages/Home/DashboardAspirantePage";
import EntrevistaIA from "../Components/PagPrincipal/Home/EntrevistaIA/EntrevistaIA";
import TalentMatchPage from "../Pages/Home/TalentMatchPage";
import CapacitacionesPage from "../Pages/Home/CapacitacionesPage";
import EntrevistasAspirante from "../Components/PagPrincipal/EntrevistasAspirante/EntrevistasAspirante";
// INSTITUCION
import DashboardInstitucion from "../Components/PagPrincipal/Institucion/DashboardInstitucion";
import PerfilInstitucion from "../Components/PagPrincipal/Institucion/PerfilInstitucion";

// EMPRESA
import RequireEmpresaAuth from "../Components/PagPrincipal/Empresa/RequireEmpresaAuth";
import DashboardEmpresaLayout from "../Components/PagPrincipal/Empresa/DashboardEmpresaLayout";
import PerfilEmpresa from "../Components/PagPrincipal/Empresa/PerfilEmpresa";
import AjustesEmpresa from "../Components/PagPrincipal/Empresa/AjustesEmpresa";
import AspirantesEmpresa from "../Components/PagPrincipal/Empresa/AspirantesEmpresa";
import EstadisticasEmpresa from "../Components/PagPrincipal/Empresa/EstadisticasEmpresa";
import VacantesEmpresa from "../Components/PagPrincipal/Empresa/VacantesEmpresa";
import MensajesEmpresa from "../Components/PagPrincipal/Empresa/MensajesEmpresa";
import EmpresaHome from "../Components/PagPrincipal/Empresa/EmpresaHome";
import CapacitacionesEmpresa from "../Components/PagPrincipal/Empresa/CapacitacionesEmpresa";
import EntrevistasEmpresa from "../Components/PagPrincipal/Empresa/EntrevistasEmpresa";

// ADMIN
import AdminLayout from "../Pages/Admin/AdminLayout";
import UsersManagement from "../Pages/Admin/UsersManagement";
import ContentManagement from "../Pages/Admin/ContentManagement";
import VacantesManagement from "../Pages/Admin/VacantesManagement";
import ProgramasManagement from "../Pages/Admin/ProgramasManagement";
import PracticasManagement from "../Pages/Admin/PracticasManagement";
import ReportsDashboard from "../Pages/Admin/ReportsDashboard";
import RequireAdminAuth from "../Components/admin/RequireAdminAuth";
import CreateCompanyInstitutionForm from "../Components/admin/CreateCompanyInstitutionForm";

function Routing() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/empleos" element={<JobsPage tipo="empleo" />} />
      <Route path="/pasantias" element={<JobsPage tipo="pasantia" />} />
      <Route path="/explorar" element={<JobsPage tipo="todos" />} />
      <Route path="/empresas" element={<CompaniesPage />} />
      <Route path="/estadisticas" element={<StatsPage />} />

      {/* ASPIRANTE ROUTES */}
      <Route path="/mi-perfil" element={<MiPerfilPage />} />
      <Route path="/ajustes" element={<AjustesPage />} />
      <Route path="/dashboard-aspirante" element={<DashboardAspirantePage />} />
      <Route path="/entrevista-ia" element={<EntrevistaIA />} />
      <Route path="/talento-match" element={<TalentMatchPage />} />
      <Route path="/capacitaciones" element={<CapacitacionesPage />} />
      <Route path="/entrevistas" element={<EntrevistasAspirante />} />

      {/* INSTITUCION ROUTES */}
      <Route path="/institucion/dashboard" element={<DashboardInstitucion />} />
      <Route path="/institucion/perfil" element={<PerfilInstitucion />} />

      {/* EMPRESA ROUTES (PROTECTED) */}
      <Route element={<RequireEmpresaAuth />}>
        <Route path="/empresa/dashboard" element={<DashboardEmpresaLayout />}>
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
        {/* Redirección por compatibilidad */}
        <Route path="/dashboard-empresa" element={<Navigate to="/empresa/dashboard" replace />} />
      </Route>

      {/* ADMIN ROUTES (PROTECTED) */}
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

      {/* 404 - Redirect to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default Routing;
