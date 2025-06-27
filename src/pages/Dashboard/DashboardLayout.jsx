import { NavLink, Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-12">
      {/* Sidebar */}
      <aside className="col-span-3 bg-gray-800 text-white p-5 space-y-6 sticky top-0 h-screen">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>

        {/* Back to Home */}
        <Link
          to="/"
          className="block text-center bg-white text-black px-4 py-2 rounded hover:bg-gray-200 font-semibold"
        >
          ⬅ Back to Home
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-3 mt-6">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive ? "text-green-400 font-bold" : "hover:text-green-300"
            }
          >
            📊 Overview
          </NavLink>

          <NavLink
            to="/dashboard/browse-tasks"
            className={({ isActive }) =>
              isActive ? "text-green-400 font-bold" : "hover:text-green-300"
            }
          >
            📁 All Items
          </NavLink>

          <NavLink
            to="/dashboard/add-task"
            className={({ isActive }) =>
              isActive ? "text-green-400 font-bold" : "hover:text-green-300"
            }
          >
            ➕ Add Item
          </NavLink>

          <NavLink
            to="/dashboard/my-posted-tasks"
            className={({ isActive }) =>
              isActive ? "text-green-400 font-bold" : "hover:text-green-300"
            }
          >
            📌 My Items
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="col-span-9 p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
