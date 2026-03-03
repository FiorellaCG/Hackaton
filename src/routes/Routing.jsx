import { Routes, Route } from 'react-router-dom';
import Home from "../Pages/Home/Home";
import MiPerfilPage from '../Pages/Home/MiPerfilPage';
import LoginPage from '../Pages/Home/LoginPage';
import RegisterPage from '../Pages/Home/RegisterPage';


function Routing() {
  return (
    <Routes>
<<<<<<< HEAD
      <Route path='/' element={<Home/>}/>
      

     
      {/* Agrega más rutas según tu app */}
=======
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/mi-perfil' element={<MiPerfilPage />} />
>>>>>>> a281648b8ba0205ba00765a9fd8598e8190e9df2
    </Routes>
  );
}

export default Routing;