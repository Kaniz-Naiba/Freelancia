import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { login, googleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Login failed: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Logged in with Google!");
      navigate("/");
    } catch (error) {
      toast.error("Google login failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-blue-100 to-pink-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 px-4">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-900 rounded-lg shadow-xl border dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-green-500 text-center">Login</h2>

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-3">
          <input type="text" name="fakeusernameremembered" className="hidden" />
          <input type="password" name="fakepasswordremembered" className="hidden" />

          <input
            type="email"
            placeholder="Email"
            autoComplete="new-email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded text-black dark:text-white dark:bg-gray-800"
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded text-black dark:text-white dark:bg-gray-800"
          />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 flex items-center justify-center gap-2 border border-gray-300 rounded shadow-sm py-2 px-4 bg-white hover:bg-gray-100 transition text-gray-700"
        >
          <img
            src="https://i.ibb.co/v4MVCrXD/Google-Icons-09-512.webp"
            alt="Google logo"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium">Sign in with Google</span>
        </button>

        <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline dark:text-blue-400">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
