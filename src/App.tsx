import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './routes/Routing';
import './assents/i18n';
import Lenguaje from './Components/lenguaje/Lenguaje';
import Navbar from './Components/PagPrincipal/Navbar/NavBar';

function App() {
  return (
    <Router>
      <Navbar />   {/* Navbar dentro del Router */}
     
      <Routing />   {/* Todas las rutas */}
    </Router>
  );
}

export default App;