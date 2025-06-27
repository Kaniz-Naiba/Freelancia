import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typewriter } from 'react-simple-typewriter';
import { FaClock, FaShieldAlt, FaTasks } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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

  return null;
};

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 leading-snug">
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
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
          Organize your tasks, boost productivity, and stay on track!
        </p>
      </section>

      {/* Banner Slider */}
      <section className="relative w-full h-[50vh] sm:h-[70vh] overflow-hidden mb-12">
        <Slider {...sliderSettings}>
          {bannerSlides.map((slide, idx) => (
            <div key={idx} className="relative h-[50vh] sm:h-[70vh] w-full">
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-4">
                <h2 className="text-2xl sm:text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="text-sm sm:text-base max-w-xl">{slide.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Featured Tasks Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Featured Tasks</h2>
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No tasks found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-blue-200 dark:bg-gray-800 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
              >
                  {task.image && (
      <img
        src={task.image}
        alt={task.title}
        className="w-full h-40 object-cover rounded mb-3"
      />
    )}
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                  {task.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {task.description?.slice(0, 100)}...
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <span className="font-medium">Deadline:</span>{" "}
                  {new Date(task.deadline).toLocaleDateString()}
                </p>
                <button
                  onClick={() => navigate(`/task-details/${task._id}`)}
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                >
                  See More
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-r from-purple-500 via-blue-200 to-red-500 py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
            How It Works
          </h2>
          <p className="max-w-3xl mx-auto text-sm sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Post your tasks with deadlines, explore freelance gigs, and track progress in real-time.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-10">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[{
            icon: <FaClock />,
            title: "Real-time Task Updates",
            desc: "Instant progress updates and deadlines."
          }, {
            icon: <FaShieldAlt />,
            title: "Secure & Reliable",
            desc: "Enterprise-grade data security."
          }, {
            icon: <FaTasks />,
            title: "Efficient Task Management",
            desc: "Smart filters to organize your workflow."
          }].map(({ icon, title, desc }, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="text-4xl text-purple-600 dark:text-purple-400 mb-4 flex justify-center">
                {icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                {title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Rated Tasks */}
      <section className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:to-gray-900 px-4 sm:px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
          🌟 Top Rated Tasks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {tasks
            .filter(task => task.budget > 1000)
            .slice(0, 3)
            .map(task => (
              <div
                key={task._id}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1"
              >
                <div className="mb-4">
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-semibold">
                    ${task.budget}+ Budget
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {task.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {task.description.slice(0, 100)}...
                </p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
