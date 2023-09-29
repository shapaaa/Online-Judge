"use client";

import { useState } from "react";
import TextEditor from "./TextEditor";
import axios from "axios";
import DropDown from "./DropDown";

const NewProblemForm = () => {
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [title, setTitle] = useState("");
  const handleEditorChange = ({ html, text }) => {
    setDescription(text);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDifficulty = (e) => {
    setDifficulty(e.target.value);
  };
  const handleSubmit = async () => {
    const newProblem = {
      description,
      title,
      difficulty,
    };
    const result = await axios.post("/api/questions", newProblem);
    console.log(result);
  };
  return (
    <div>
      <DropDown difficulty={difficulty} handleDifficulty={handleDifficulty} />
      <input
        onChange={handleTitle}
        value={title}
        type="title"
        name="title"
        id="title"
        className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
        placeholder="Enter Problem Title"
        required
      />
      <TextEditor handleEditorChange={handleEditorChange} />
      <button
        onClick={handleSubmit}
        type="button"
        class="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </div>
  );
};

export default NewProblemForm;
