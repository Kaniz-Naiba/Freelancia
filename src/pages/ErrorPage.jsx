import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-9xl font-extrabold text-red-600 mb-6">404</h1>
        <h2 className="text-3xl font-semibold mb-4 dark:text-white">Oops! Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
