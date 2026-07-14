# 🌿 TalentMatch — GreenTalent

Plataforma de búsqueda de empleo con un enfoque interactivo estilo **"dating"** para conectar talentos con empresas de forma rápida y efectiva. Desarrollada para **Zona Franca La Lima** en alianza estratégica con **Garnier**.

---

## ✨ Funcionalidades

- **Talent Match** — Swipe tipo Tinder para descubrir vacantes usando gestos de arrastre (Framer Motion)
- **Búsqueda inteligente** — Búsqueda por categorías (empleos, pasantías, todos) con filtros
- **Entrevista con IA** — Simulacro de entrevista laboral potenciado por Google Gemini
- **Dashboard por rol** — Aspirante, Empresa, Institución Educativa y Admin
- **Postulaciones y favoritos** — Like a vacantes, postulación con un clic
- **Capacitaciones** — Catálogo de cursos ofrecidos por empresas e instituciones
- **Estadísticas del mercado** — Visualización con gráficas (Recharts)
- **Dark mode** — Tema oscuro completo con persistencia en preferencias
- **Multilenguaje** — Español e Inglés (i18next)
- **Gestión de estudiantes** — Carga masiva vía Excel para instituciones

---

## 🧱 Stack Tecnológico

| Capa | Tecnología |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion |
| **Backend** | Django, Django REST Framework, SQLite |
| **IA** | Google Gemini API |
| **Internacionalización** | i18next, react-i18next |
| **Gráficos** | Recharts |
| **Utilerías** | Axios, jsPDF, xlsx, Lucide React |

---

## 🚀 Instalación y Ejecución

### Requisitos

- Node.js 18+
- Python 3.10+
- Una clave de API de Google Gemini

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/FiorellaCG/Hackaton.git
cd Hackaton

# 2. Instalar dependencias del frontend
npm install

# 3. Configurar variable de entorno (Gemini API)
# Crear archivo .env.local con:
# GEMINI_API_KEY=tu_clave_aqui

# 4. Inicializar y ejecutar backend (Django)
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver &
cd ..

# 5. Iniciar frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

## 🧑‍💼 Roles de Usuario

| Rol | Acceso principal |
|---|---|
| **Aspirante** | Match de vacantes, postulaciones, perfil, capacitaciones, entrevista IA |
| **Empresa** | Gestión de vacantes, revisión de aspirantes, entrevistas, estadísticas |
| **Institución** | Dashboard de estudiantes, carga masiva vía Excel, métricas |
| **Admin** | Reportes globales, gestión de usuarios y contenido |

---

## 🗺️ Rutas Principales

| Ruta | Pantalla |
|---|---|
| `/` | Landing con Hero y empleos destacados |
| `/login` | Inicio de sesión |
| `/register` | Registro de usuario |
| `/empleos` / `/pasantias` / `/explorar` | Listado de vacantes |
| `/talento-match` | Swipe de vacantes (Tinder-style) |
| `/entrevista-ia` | Simulacro de entrevista con IA |
| `/dashboard-aspirante` | Panel del aspirante |
| `/empresa/dashboard` | Panel de empresa (con sidebar) |
| `/institucion/dashboard` | Panel de institución |
| `/admin` | Panel de administración |

---

## 📁 Estructura del Proyecto

```
Hackaton/
├── frontend/              # React + Vite + TypeScript
│   └── src/
│       ├── Components/    # Componentes reutilizables
│       ├── Pages/         # Páginas de cada rol
│       ├── routes/        # Configuración de rutas
│       ├── services/      # Llamadas API
│       └── assets/        # Imágenes e i18n
├── backend/               # Django + DRF
│   └── api/
│       ├── models.py      # Modelos de datos
│       ├── views.py       # Endpoints REST
│       └── serializers.py # Serialización
├── talentmatch.db         # Base de datos SQLite
└── package.json
```

---

## 📄 Licencia

Proyecto desarrollado para **Zona Franca La Lima** en colaboración con **Garnier**.
