import Navbar from "../../Components/PagPrincipal/Navbar/NavBar";
import Register from "../../Components/PagPrincipal/Register/Register";

// Main register page component
function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <div className="flex items-center justify-center pt-20">
        <Register isOpen={true} onClose={() => window.history.back()} />
      </div>
    </div>
  );
}

export default RegisterPage;