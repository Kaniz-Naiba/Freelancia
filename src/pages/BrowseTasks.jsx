import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"
  const [categoryFilter, setCategoryFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://freelance-marketplace-server-gamma.vercel.app/api/tasks")
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        setFilteredTasks(data);
      })
      .catch(err => console.error("Error loading tasks:", err));
  }, []);

  useEffect(() => {
    let updated = [...tasks];

    // Filtering
    if (categoryFilter) {
      updated = updated.filter(task => task.category === categoryFilter);
    }

    // Sorting
    if (sortOrder === "asc") {
      updated.sort((a, b) => a.budget - b.budget);
    } else if (sortOrder === "desc") {
      updated.sort((a, b) => b.budget - a.budget);
    }

    setFilteredTasks(updated);
  }, [sortOrder, categoryFilter, tasks]);

  // Unique category list
  const uniqueCategories = [...new Set(tasks.map(task => task.category))];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-blue-100 to-pink-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 px-4">

    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center  text-gray-800 dark:text-white">Browse Tasks</h2>

      {/* Filter + Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <label className="mr-2 font-medium text-blue-600 ">Filter by Category:</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border rounded text-blue-600"
          >
            <option value="">All</option>
            {uniqueCategories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mr-2 font-medium  text-blue-600">Sort by Budget:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 border rounded text-blue-600"
          >
            <option value="">None</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTasks.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">No tasks found.</p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task._id}
              className="bg-white dark:bg-gray-800 border p-4 rounded shadow hover:shadow-lg transition"
            >
                {task.image && (
      <img
        src={task.image}
        alt={task.title}
        className="w-full h-40 object-cover rounded mb-3"
      />
    )}
              <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-300">{task.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">Category: {task.category}</p>
              <p className="text-gray-700 dark:text-gray-300">Budget: ${task.budget}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {task.description.slice(0, 80)}...
              </p>
              <button
                onClick={() => navigate(`/task-details/${task._id}`)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                See Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
};

export default BrowseTasks;
