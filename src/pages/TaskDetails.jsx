import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [error, setError] = useState("");
  const [bidsCount, setBidsCount] = useState(0);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`https://freelance-marketplace-server-gamma.vercel.app/api/tasks/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Task not found");
        setTask(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTask();
  }, [id]);

  const handleBidsClick = () => {
    setBidsCount((prevCount) => prevCount + 1);
  };

  if (error) return <p className="text-center text-red-500 mt-10">Failed to load task: {error}</p>;
  if (!task) return <p className="text-center mt-10">Loading task details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 border rounded bg-purple-800 shadow mt-8">
      <p className="mb-4 text-white font-semibold text-lg">
        You bid for {bidsCount} {bidsCount === 1 ? "opportunity" : "opportunities"}.
      </p>

      <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
      <p><strong>Category:</strong> {task.category}</p>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Budget:</strong> ${task.budget}</p>
      <p><strong>Deadline:</strong> {task.deadline}</p>
      <p><strong>Posted By:</strong> {task.userName} ({task.userEmail})</p>

      <button
        onClick={handleBidsClick}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Bids
      </button>
    </div>
  );
};

export default TaskDetails;
