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
        <p className="text-lg animate-pulse text-gray-700">Loading your tasks...</p>
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <p className="text-center mt-10 text-gray-600 text-lg">
        You have no posted tasks yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-800">
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Budget</th>
            <th className="border px-4 py-2">Deadline</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task._id} className="text-center">
              <td className="border px-4 py-2">{task.title}</td>
              <td className="border px-4 py-2">{task.category}</td>
              <td className="border px-4 py-2">${task.budget}</td>
              <td className="border px-4 py-2">{task.deadline}</td>
              <td className="border px-4  flex flex-col md:flex-row justify-center gap-2 py-2">
                <button
                  onClick={() => handleUpdate(task._id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleBids(task._id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  Bids
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPostedTasks;
