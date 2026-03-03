import { Routes, Route } from 'react-router-dom';
import Home from "../Pages/Home/Home";
import MiPerfilPage from '../Pages/Home/MiPerfilPage';
import LoginPage from '../Pages/Home/LoginPage';
import RegisterPage from '../Pages/Home/RegisterPage';

function Routing() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/:lang' element={<Home />} />
      <Route path='/:lang/login' element={<LoginPage />} />
      <Route path='/:lang/register' element={<RegisterPage />} />
      <Route path='/:lang/mi-perfil' element={<MiPerfilPage />} />
      <Route path='/:lang/jobs' element={<Home />} />
      <Route path='/:lang/internships' element={<Home />} />
    </Routes>
  );
}

export default Routing;