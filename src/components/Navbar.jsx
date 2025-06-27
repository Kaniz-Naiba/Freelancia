import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
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
      <NavLink to="/browse-tasks" className="hover:text-green-600 dark:text-white">Browse Tasks</NavLink>
      
      {user && (
        <>
          <NavLink to="/add-task" className="hover:text-green-600 dark:text-white">Add Task</NavLink>
          <NavLink to="/my-posted-tasks" className="hover:text-green-600 dark:text-white">My Posted Tasks</NavLink>
        </>
      )}

      <NavLink to="/about" className="hover:text-green-600 dark:text-white">About Us</NavLink>
    </>
  );

  const dashboardSidebar = (
    <div
      className="fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-5 shadow-lg z-50 transform transition-transform duration-300 ease-in-out"
      style={{ transform: isDrawerOpen ? "translateX(0)" : "translateX(-100%)" }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <button onClick={() => setIsDrawerOpen(false)}>
          <IoClose size={24} />
        </button>
      </div>
      <nav className="flex flex-col gap-4 text-lg">
        <NavLink to="/dashboard" onClick={() => setIsDrawerOpen(false)}>📊 Overview</NavLink>
        <NavLink to="/dashboard/browse-tasks" onClick={() => setIsDrawerOpen(false)}>📁 Browse Tasks</NavLink>
        <NavLink to="/dashboard/add-task" onClick={() => setIsDrawerOpen(false)}>➕ Add Task</NavLink>
        <NavLink to="/dashboard/my-posted-tasks" onClick={() => setIsDrawerOpen(false)}>📌 My Posted Tasks</NavLink>
        <Link to="/" onClick={() => setIsDrawerOpen(false)}>⬅ Back to Home</Link>
      </nav>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
      {user && dashboardSidebar}

      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left Side: Menu + Logo */}
        <div className="flex items-center space-x-4">
          {user && (
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="text-2xl text-gray-700 dark:text-white focus:outline-none"
            >
              <FiMenu />
            </button>
          )}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/Freelancia Logo with Pen Icon.png"
              alt="Freelancia Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-bold text-blue-600 dark:text-white">
              Freelancia
            </span>
          </Link>
        </div>

        {/* Center Nav */}
        <div className="space-x-6 font-medium hidden md:flex text-gray-700 dark:text-white">
          {navLinks}
        </div>

        {/* Right Side: Theme + Auth */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>

          {!user ? (
            <>
              <Link to="/login" className="text-green-600 font-semibold hover:underline dark:text-green-400">
                Login
              </Link>
              <Link to="/signup" className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
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
