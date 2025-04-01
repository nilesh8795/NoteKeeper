import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/home"); // Redirect to home page if token exists
    }
  }, [navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please enter both email and password",
      });
      return;
    }

    try {
      const URL = "https://note-backend-sw0f.onrender.com/login";
      const response = await axios.post(URL, formData);

      if (response.data.success === true) {
        localStorage.setItem("authToken", response.data.token);
        setError("");
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have successfully logged in.",
        });
        navigate("/home"); // Navigate to the home page after successful login
      } else {
        setError(response.data.message || "Login failed. Please try again.");
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: response.data.message || "Login failed. Please try again.",
        });
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message || "An error occurred during login",
        });
      } else {
        setError("An error occurred during login");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred during login. Please try again later.",
        });
      }
      console.error("Error occurred during login:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-16 p-8 bg-white shadow-md rounded-xl border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Login</h2>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="mt-2 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="mt-2 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
        >
          Login
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-yellow-500 font-semibold hover:underline">
              Signup here
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
