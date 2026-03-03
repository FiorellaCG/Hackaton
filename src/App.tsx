import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect } from 'react';
import Routing from './routes/Routing';
import './assents/i18n';
import { obtenerMiPerfil } from './services/services';

function App() {
  useEffect(() => {
    // 1. Aplicar tema inicial desde localStorage para evitar parpadeo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }

    // 2. Sincronizar con el perfil del usuario si está logueado
    const usuarioStr = localStorage.getItem("usuario");
    if (usuarioStr) {
      const usuario = JSON.parse(usuarioStr);
      if (usuario.id) {
        obtenerMiPerfil(usuario.id).then(perfil => {
          if (perfil.preferencias?.dark_mode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
          } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
          }
        }).catch(err => console.error("Error al sincronizar tema:", err));
      }
    }
  }, []);

  return (
    <Router>
      <Routing />
    </Router>
  );
}

export default App;