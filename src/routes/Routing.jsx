import { Routes, Route } from 'react-router-dom';
import Home from "../Pages/Home/Home";
import MiPerfilPage from '../Pages/Home/MiPerfilPage';
import LoginPage from '../Pages/Home/LoginPage';
import RegisterPage from '../Pages/Home/RegisterPage';
import DashboardAspirante from '../Components/PagPrincipal/DashboardAspirante';



function Routing() {
  return (
    <Routes>

      <Route path='/' element={<Home />} />



      {/* Agrega más rutas según tu app */}

      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/mi-perfil' element={<MiPerfilPage />} />
      <Route path='/dashboard-aspirante' element={<DashboardAspirante />} />
    </Routes>
  );
}

export default Routing;