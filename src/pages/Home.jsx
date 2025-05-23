import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typewriter } from 'react-simple-typewriter';
import { FaClock, FaShieldAlt, FaTasks } from "react-icons/fa";

const bannerSlides = [
  {
    title: "Welcome to Freelancia",
    description: "Organize your work and meet deadlines efficiently.",
    imageUrl: "https://i.ibb.co/cKRVSvtd/Chat-GPT-Image-May-23-2025-12-44-32-PM.png",
  },
  {
    title: "Track Your Progress",
    description: "Visualize your tasks and stay motivated every day.",
    imageUrl: "https://i.ibb.co/ym3x1B4q/pexels-william-fortunato-6393024.jpg",
  },
  {
    title: "Achieve More",
    description: "Focus on what matters and get things done faster.",
    imageUrl: "https://i.ibb.co/bRqkzQpH/pexels-george-milton-7034720.jpg",
  },
];

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return null; // You can add a toggle button if needed
};

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("https://freelance-marketplace-server-gamma.vercel.app/api/tasks");
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching featured tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300 min-h-screen">
      <ThemeToggle />

      {/* Typewriter Intro Section */}
      <section className="bg-white dark:bg-gray-900 text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
          Welcome to{" "}
          <span className="text-purple-600">
            <Typewriter
              words={["Freelancia", "Your Daily Manager", "Plan Smarter"]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Organize your tasks, boost productivity, and stay on track!
        </p>
      </section>

      {/* Banner Slider */}
      <section className="relative w-full h-[60vh] md:h-[80vh] lg:h-screen overflow-hidden">
        <Slider {...sliderSettings}>
          {bannerSlides.map((slide, idx) => (
            <div
              key={idx}
              className="relative min-h-[300px] md:min-h-[500px] overflow-hidden rounded"
            >
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center p-6">
                <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                <p className="text-lg max-w-xl">{slide.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Featured Tasks Section */}
      <section className="max-w-6xl mx-auto mb-12 px-4">
        <h2 className="text-2xl font-bold text-center mb-6">Featured Tasks</h2>
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No tasks found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-blue-200 dark:bg-gray-800 shadow-md rounded p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2 ">
                  {task.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2 ">
                  {task.description?.slice(0, 100)}...
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <span className="font-medium">Deadline:</span>{" "}
                  {new Date(task.deadline).toLocaleDateString()}
                </p>
                
                
              </div>
            ))}
          </div>
        )}
      </section>

     

{/* How It Works Section */}
  <section className="bg-gradient-to-r from-purple-500 via-blue-200 to-red-500 py-10 px-4">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
      How It Works
    </h2>
    <p className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
      Post your tasks with deadlines, explore freelance gigs that match your skills,
      and track progress in real-time. Freelancia connects doers with dreamers to get things done faster and smarter.
    </p>
  </div>
</section>

{/* Why Choose Us Section */}
<section className="max-w-7xl mx-auto py-16 px-4">
  <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-12">
    Why Choose Us
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
      <div className="text-purple-600 dark:text-purple-400 mb-4 text-4xl flex justify-center">
        <FaClock />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
        Real-time Task Updates
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        Get notified instantly on progress and deadlines with seamless live updates.
      </p>
    </div>

    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
      <div className="text-green-600 dark:text-green-400 mb-4 text-4xl flex justify-center">
        <FaShieldAlt />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
        Secure & Reliable
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        Protect your data with enterprise-grade security and robust authentication.
      </p>
    </div>

    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
      <div className="text-blue-600 dark:text-blue-400 mb-4 text-4xl flex justify-center">
        <FaTasks />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
        Efficient Task Management
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        Smart filters and productivity tools help you stay organized and ahead.
      </p>
    </div>
  </div>
</section>

    </div>
  );
};

export default Home;
