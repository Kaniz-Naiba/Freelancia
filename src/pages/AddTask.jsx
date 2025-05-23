import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const AddTask = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    deadline: "",
    budget: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      ...formData,
      email: user.email,
      name: user.displayName,
    };

    try {
      const res = await fetch("http://localhost:4000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!res.ok) {
        throw new Error("Failed to add task");
      }

      toast.success("Task added successfully!");

      // Clear form
      setFormData({
        title: "",
        category: "",
        description: "",
        deadline: "",
        budget: "",
      });
    } catch (error) {
      toast.error("Failed to add task.");
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-4">Add a New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Task Title"
          className="w-full p-2 border rounded bg-blue-950"
          onChange={handleChange}
          required
        />
        <select
          name="category"
          value={formData.category}
          className="w-full p-2 border rounded bg-blue-950 "
          onChange={handleChange}
          required
        >
         
          <option value="">Select Category</option>
          <option value="Web Development">Web Development</option>
          <option value="Design">Design</option>
          <option value="Writing">Writing</option>
          <option value="Marketing">Marketing</option>
         
        </select>
        <textarea
          name="description"
          value={formData.description}
          placeholder="Task Description"
          className="w-full p-2 border rounded bg-blue-950"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          className="w-full p-2 border rounded bg-blue-950"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="budget"
          value={formData.budget}
          placeholder="Budget"
          className="w-full p-2 border rounded bg-blue-950"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          value={user.displayName}
          readOnly
          className="w-full p-2 border  rounded bg-blue-950"
        />
        <input
          type="email"
          value={user.email}
          readOnly
          className="w-full p-2 border  rounded bg-blue-950"
        />
        <button
          type="submit"
          className="bg-cyan-800 text-white px-4 py-2 rounded hover:bg-emerald-700"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
