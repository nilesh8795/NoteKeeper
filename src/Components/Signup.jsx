import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/home"); // Redirect to the home page if already logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      const URL = "http://localhost:5000/register"; // Your backend endpoint
      console.log(URL);
      const response = await axios.post(URL, formData);
      if (response.data.success) {
        // Success: Show SweetAlert success message and redirect to login page
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You can now log in with your credentials.',
        });
        navigate("/"); // Navigate to the login page after successful registration
      } else {
        // Error: Show SweetAlert error message
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: response.data.message || "Something went wrong, please try again.",
        });
      }
    } catch (error) {
      console.error("Server error:", error.response?.data || error.message);
      // Show SweetAlert error message for server errors
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'An error occurred while processing your request. Please try again later.',
      });
    }
  };

  return (
    <form
      method="POST"
      onSubmit={handleSubmit}
      className="max-w-lg mt-16 mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-xl font-bold mb-6 text-center text-gray-700">Sign Up</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
      >
        Submit
      </button>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-700">
          Already have an account?{" "}
          <Link to="/" className="text-yellow-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </form>
  );
}
