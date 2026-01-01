import LogoutButton from "./LogoutButton";

function Navbar({ title }) {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <h1 className="text-xl font-semibold">{title}</h1>
      <LogoutButton />
    </div>
  );
}

export default Navbar;
