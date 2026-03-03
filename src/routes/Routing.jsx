import { Routes, Route } from 'react-router-dom';
import Home from "../Pages/Home/Home"


function Routing() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      

     
      {/* Agrega más rutas según tu app */}
    </Routes>
  )
}

export default Routing;