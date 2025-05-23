import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
    }
  };
 

  const navLinks = (
    <>
      <NavLink to="/" className="hover:text-green-600 dark:text-white">Home</NavLink>
      <NavLink to="/add-task" className="hover:text-green-600 dark:text-white">Add Task</NavLink>
      <NavLink to="/browse-tasks" className="hover:text-green-600 dark:text-white">Browse Tasks</NavLink>
      <NavLink to="/my-posted-tasks" className="hover:text-green-600 dark:text-white">My Posted Tasks</NavLink>
    </>
  );

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r text-blue-400 bg-clip-textt"
        >
        Freelancia
        </Link>

        {/* Nav Links */}
        <div className="space-x-6 font-medium hidden md:flex text-gray-700 dark:text-white">
          {navLinks}
        </div>

        {/* Right Side: Theme + Auth */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>

          {/* Auth Buttons / Profile */}
          {!user ? (
            <>
              <Link to="/login" className="text-green-600 font-semibold hover:underline dark:text-green-400">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              >
                Signup
              </Link>
            </>
          ) : (
            <div className="relative group flex items-center space-x-3">
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-green-500"
              />
              <span className="absolute top-2 mt-1 left-2 transform -translate-x-1/2 text-sm bg-blue-300 shadow-md rounded px-2 py-1 hidden group-hover:block">
                {user.displayName}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
