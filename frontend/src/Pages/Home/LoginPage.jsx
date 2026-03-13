import { LoginModal } from "../../Components/PagPrincipal/Login/Login";
import Navbar from "../../Components/PagPrincipal/Navbar/NavBar";

function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <div className="flex items-center justify-center pt-20">
        <LoginModal isOpen={true} onClose={() => window.history.back()} />
      </div>
    </div>
  );
}

export default LoginPage;