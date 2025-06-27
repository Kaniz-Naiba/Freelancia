import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Overview = () => {
  const { user } = useContext(AuthContext);
  const [allTasks, setAllTasks] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        setLoading(true);
        const res = await fetch("https://freelance-marketplace-server-gamma.vercel.app/api/tasks");
        
        const data = await res.json();

        setAllTasks(data);

        if (user && data.length) {
          // Assuming each task has a "postedBy" or "userId" field to identify the creator
          const filtered = data.filter(task => task.email === user.email);
          setMyTasks(filtered);
        } else {
          setMyTasks([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        setLoading(false);
      }
    }

    fetchTasks();
  }, [user]);

  if (loading) return <p>Loading stats...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Welcome, {user?.displayName}</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded shadow">
          <p className="text-lg font-semibold">Total Items</p>
          <p className="text-3xl">{allTasks.length}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <p className="text-lg font-semibold">My Items</p>
          <p className="text-3xl">{myTasks.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
