import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './routes/Routing';
import './assents/i18n';
import Lenguaje from './Components/lenguaje/Lenguaje';


function App() {
  return (
    <Router>
      
     
      
      <Routing />  {/* Todas las rutas */}
    </Router>
  );
}

export default App;