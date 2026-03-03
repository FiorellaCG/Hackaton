import Navbar from "@/src/Components/PagPrincipal/Navbar/NavBar";
import RegisterModal from "@/src/Components/PagPrincipal/Login/Registrer";

function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <div className="flex items-center justify-center pt-20">
        <RegisterModal isOpen={true} onClose={() => window.history.back()} />
      </div>
    </div>
  );
}

export default RegisterPage;