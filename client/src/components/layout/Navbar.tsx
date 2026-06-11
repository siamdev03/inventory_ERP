import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "@/redux/features/auth/authSlice";

const Navbar = () => {
  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    localStorage.removeItem(
      "token"
    );

    navigate("/login");
  };

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <h2 className="font-semibold text-lg">
        Inventory ERP
      </h2>

      <div className="flex items-center gap-4">
        {/* User Profile Card */}
        <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            A
          </div>

          <div className="hidden md:block">
            <p className="font-semibold text-slate-800">
              Admin User
            </p>

            <p className="text-xs text-slate-500">
              Super Admin
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-medium transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;