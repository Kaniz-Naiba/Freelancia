import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const MyPostedTasks = () => {
  const { user, token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      if (!user?.email) return;

      try {
        const res = await fetch(`https://freelance-marketplace-server-gamma.vercel.app/api/tasks?email=${user.email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch tasks");

        const data = await res.json();
        setTasks(data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load tasks.");
        setLoading(false);
      }
    };

    getData();
  }, [user?.email, token]);

  const handleDelete = async (taskId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this task?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`https://freelance-marketplace-server-gamma.vercel.app/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setTasks(prev => prev.filter(task => task._id !== taskId));
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Task has been deleted.',
          confirmButtonColor: '#3085d6',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete task.',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong while deleting the task.',
      });
    }
  };

  const handleUpdate = (id) => navigate(`/update-task/${id}`);
  const handleBids = (id) => navigate(`/task-details/${id}`);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <p className="text-lg animate-pulse text-gray-700 dark:text-gray-200">Loading your tasks...</p>
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <p className="text-center mt-10 text-gray-600 dark:text-gray-400 text-lg">
        You have no posted tasks yet.
      </p>
    );
  }
return (
  <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-100 to-pink-200 dark:from-gray-900 dark:to-gray-800 transition duration-300 px-4 py-10">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        📝 My Posted Tasks
      </h2>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-xl">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
              <th className="border px-4 py-3 text-left">Title</th>
              <th className="border px-4 py-3 text-left">Category</th>
              <th className="border px-4 py-3 text-left">Budget</th>
              <th className="border px-4 py-3 text-left">Deadline</th>
              <th className="border px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task._id}
                className="border-b dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition text-gray-800 dark:text-gray-100"
              >
                <td className="border px-4 py-3">{task.title}</td>
                <td className="border px-4 py-3">{task.category}</td>
                <td className="border px-4 py-3">${task.budget}</td>
                <td className="border px-4 py-3">{task.deadline}</td>
                <td className="border px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleUpdate(task._id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleBids(task._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Bids
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

 
};

export default MyPostedTasks;
