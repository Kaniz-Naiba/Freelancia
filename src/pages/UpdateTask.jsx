import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';


const UpdateTask = () => {
  const { id } = useParams();
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    category: "",
    budget: "",
    deadline: "",
    description: "",
    username: "",
    useremail: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !token) return;

    fetch(`/api/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch task");
        return res.json();
      })
      .then((data) => {
        setTaskData({
          title: data.title || "",
          category: data.category || "",
          budget: data.budget || "",
          deadline: data.deadline || "",
          description: data.description || "",
          username: data.username || user?.displayName || "",
          useremail: data.useremail || user?.email || "",
        });
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load task.");
        setLoading(false);
      });
  }, [id, token, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://freelance-marketplace-server-gamma.vercel.app/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    })
      .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Task updated successfully!',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        navigate("/my-posted-tasks"); // Navigate only after the alert is closed
      });
    })
    .catch(() => {
      toast.error("Failed to update task.");
    });
};

  if (loading) {
    return <p>Loading task data...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">User Name</label>
         <input
          type="text"
          value={user.displayName}
          readOnly
          className="w-full p-2 border  rounded bg-blue-950"
        />
        
        </div>
        <div>
          <label className="block font-semibold">User Email</label>
         <input
          type="email"
          value={user.email}
          readOnly
          className="w-full p-2 border  rounded bg-blue-950"
        />
        </div>
        <div>
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Category</label>
          <input
            type="text"
            name="category"
            value={taskData.category}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Budget</label>
          <input
            type="number"
            name="budget"
            value={taskData.budget}
            onChange={handleChange}
            required
            min="0"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={taskData.deadline}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
