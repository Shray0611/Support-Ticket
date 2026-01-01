import { useNavigate } from "react-router-dom";
import { logout } from "../auth/auth";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      className="px-5 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-semibold shadow-md"
    >
      Logout
    </button>
  );
}

export default LogoutButton;