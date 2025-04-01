import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

export default function Notes() {
  const [formData, setFormData] = useState({ title: "", text: "" });
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null); // ID of the note being edited
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
    } else {
      fetchNotes();
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      if (editId) {
        // Update Note
        const URL = `https://note-backend-sw0f.onrender.com/update/${editId}`;
        const response = await axios.put(URL, formData, config);
        if (response.data.success) {
          fetchNotes();
          setShowModal(false);
        }
      } else {
        // Add Note
        const URL = "https://note-backend-sw0f.onrender.com/addnote";
        const response = await axios.post(URL, formData, config);
        if (response.data.success) {
          fetchNotes();
        }
      }
      setFormData({ title: "", text: "" });
      setEditId(null);
    } catch (error) {
      console.error("Error in submitting note:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("authToken");
    const URL = `https://note-backend-sw0f.onrender.com/deletenote/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.delete(URL, config);
      if (response.data.success) {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const fetchNotes = async () => {
    const token = localStorage.getItem("authToken");
    const URL = "https://note-backend-sw0f.onrender.com/getnotes";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(URL, config);
      if (response.data.success) {
        setNotes(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error.response?.data?.message || error.message);
    }
  };

  const handleEdit = (note) => {
    setFormData({ title: note.title, text: note.text });
    setEditId(note._id);
    setShowModal(true); // Open the modal
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData({ title: "", text: "" });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-800 text-white p-4">
        <form onSubmit={handleSubmit} className="sm:flex-row items-start sm:items-center gap-2 mb-6">
          <div className="my-5">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Title"
              className="flex-1 p-2 text-white bg-transparent border-b-2 border-gray-500 focus:outline-none focus:ring-0"
            />
          </div>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Enter Text"
            rows="4"
            className="w-full p-2 text-white bg-transparent border-b-2 border-gray-500 focus:outline-none focus:ring-0"
            style={{ resize: "none" }}
          />
          <button
            type="submit"
            className="px-4 my-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded"
          >
            Add Note
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="h-auto w-full p-4 bg-gray-700 rounded shadow-lg relative"
            >
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleDelete(note._id)}
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 flex items-center gap-2"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => handleEdit(note)}
                  className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 flex items-center gap-2"
                >
                  <FaEdit />
                </button>
              </div>
              <h2 className="text-xl font-bold mb-2 mt-8">{note.title}</h2>
              <p className="text-gray-300">{note.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Updating Notes */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Update Note</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter Title"
                className="w-full p-2 text-white bg-transparent border-b-2 border-gray-500 focus:outline-none focus:ring-0 mb-4"
              />
              <textarea
                name="text"
                value={formData.text}
                onChange={handleChange}
                placeholder="Enter Text"
                rows="4"
                className="w-full p-2 text-white bg-transparent border-b-2 border-gray-500 focus:outline-none focus:ring-0 mb-4"
                style={{ resize: "none" }}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
