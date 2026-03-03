import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home/Home";
import MiPerfilPage from "../Pages/Home/MiPerfilPage";
import LoginPage from "../Pages/Home/LoginPage";
import RegisterPage from "../Pages/Home/RegisterPage";

import DashboardAspirante from "../Components/PagPrincipal/DashboardAspirante";
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

function Routing() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/mi-perfil" element={<MiPerfilPage />} />
      <Route path="/dashboard-aspirante" element={<DashboardAspirante />} />
      <Route path="/nueva-carrera" element={<FormCarrera />} />
      <Route path="/carreras" element={<VisualizarCarreras />} />

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