import { Routes, Route } from 'react-router-dom';
import Home from "../Pages/Home/Home"
import Login from "../Components/PagPrincipal/Login/Login"

function Routing() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Login' element={<Login/>}/>

     
      {/* Agrega más rutas según tu app */}
    </Routes>
  )
}

export default Routing;