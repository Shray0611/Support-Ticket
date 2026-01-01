import LogoutButton from "./LogoutButton";

function Navbar({ title }) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default Navbar;