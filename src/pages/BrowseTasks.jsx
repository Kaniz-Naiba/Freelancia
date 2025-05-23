// src/pages/BrowseTasks.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Error loading tasks:", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 ">
      <h2 className="text-3xl font-bold mb-6 text-center">Browse Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {tasks.map(task => (
          <div key={task._id} className="border p-4 rounded shadow bg-gray-900">
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p className="text-gray-600">Category: {task.category}</p>
            <p className="text-gray-600">Budget: ${task.budget}</p>
            <p className="text-sm text-gray-500 mt-2">{task.description.slice(0, 80)}...</p>
            <button
              onClick={() => navigate(`/task-details/${task._id}`)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              See Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseTasks;
