import { useNavigate } from "react-router-dom";
import { logout } from "../auth/auth";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();                      // remove token
    navigate("/", { replace: true }); // force redirect
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
