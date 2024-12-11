import React, { useState } from "react";

export default function Notes() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);

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
    const res = notes.filter((note,index) => {
      return index != id;
    });
    setNotes(res);
  };

  function edit(){
    alert("Hello edit")
  }

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
          style={{ resize: "none" }} // Disables resizing
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
            className="h-auto w-full p-4 bg-gray-700 rounded shadow-lg"
          >
            <button type="button" onClick={() => trash(index) }  class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Red</button>
            {/* <button onClick={edit}>edit</button> */}
            <h2 className="text-xl font-bold mb-2">{note.title}</h2>
            <p className="text-gray-300">{note.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
