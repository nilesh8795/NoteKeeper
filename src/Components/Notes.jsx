import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { MdClose, MdSave } from "react-icons/md";

export default function Notes() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState("");

  const handleAddNote = () => {
    const obj = {
      title: title,
      text: text,
    };
    setNotes([...notes, obj]);
    setTitle("");
    setText("");
  };

  const trash = (id) => {
    const res = notes.filter((_, index) => index !== id);
    setNotes(res);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditTitle(notes[index].title);
    setEditText(notes[index].text);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    const updatedNotes = [...notes];
    updatedNotes[editIndex] = {
      title: editTitle,
      text: editText,
    };
    setNotes(updatedNotes);
    setIsModalOpen(false);
    setEditIndex(null);
    setEditTitle("");
    setEditText("");
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-4">
      {/* Input Fields */}
      <div className="sm:flex-row items-start sm:items-center gap-2 mb-6">
        <div className="my-5">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title"
            className="flex-1 p-2 rounded text-white bg-transparent border-b-2 border-gray-500 focus:outline-none focus:ring-0"
          />
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter Text"
          rows="4"
          className="w-full p-2 rounded text-white bg-transparent border-b-2 border-gray-500 focus:outline-none focus:ring-0"
          style={{ resize: "none" }}
        />

        <button
          onClick={handleAddNote}
          className="px-4 my-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded"
        >
          Add Note
        </button>
      </div>

{/* Notes Display */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {notes.map((note, index) => (
    <div
      key={index}
      className="h-auto w-full p-4 bg-gray-700 rounded shadow-lg relative"
    >
      {/* Icons in Top Right Corner */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          type="button"
          onClick={() => trash(index)}
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 flex items-center gap-2"
        >
          <FaTrash />
        </button>
        <button
          onClick={() => handleEdit(index)}
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


      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Note</h2>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Edit Title"
              className="w-full p-2 rounded text-white bg-transparent border-b-2 border-gray-500 focus:outline-none focus:ring-0 mb-4"
            />
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="Edit Text"
              rows="4"
              className="w-full p-2 rounded text-white bg-transparent border-b-2 border-gray-500 focus:outline-none focus:ring-0 mb-4"
              style={{ resize: "none" }}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded flex items-center gap-2"
              >
                <MdClose /> Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded flex items-center gap-2"
              >
                <MdSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
