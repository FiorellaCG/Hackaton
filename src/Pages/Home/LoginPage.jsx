import { LoginModal } from "@/src/Components/PagPrincipal/Login/Login";
import Navbar from "@/src/Components/PagPrincipal/Navbar/NavBar";


function LoginPage() {
  return (
    <div>
      <Navbar />
      <LoginModal isOpen={true} onClose={() => window.history.back()} />
    </div>
  );
}

export default LoginPage;