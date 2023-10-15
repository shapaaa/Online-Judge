"use client";

import { useState } from "react";
import TextEditor from "./TextEditor";
import axios from "axios";
import DropDown from "./DropDown";
import { useRouter, usePathname } from "next/navigation";
import { useContext } from "react";
import { ProblemContext } from "@/ContextProviders/ProblemProvider";

const NewProblemForm = (props) => {
  const {
    description,
    setDescription,
    difficulty,
    setDifficulty,
    title,
    setTitle,
  } = useContext(ProblemContext);
  const [error, setError] = useState("");
  const pathname = usePathname();
  const router = useRouter();
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
    if (title == "" || description == "") {
      setError("You should fill all the fields");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      // try {
      //   setLoading(true);
      //   const result = await axios.post("/api/questions", newProblem);
      //   setLoading(false);
      //   setSuccess(true);
      //   setTimeout(() => {
      //     setSuccess(false);
      //   }, 2000);
      // } catch (error) {
      //   setLoading(false);
      //   setError(error.message);
      //   setTimeout(() => {
      //     setError("");
      //   }, 2000);
      // }
      router.push(`${pathname}/submit-testcases`);
    }
  };
  return (
    <div className="flex flex-col gap-y-[20px] p-[20px]">
      <input
        onChange={handleTitle}
        value={title}
        type="title"
        name="title"
        id="title"
        className="focus:ring-primary-600 focus:border-primary-600  w-3/12 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
        placeholder="Enter Problem Title"
        required
      />
      <DropDown difficulty={difficulty} handleDifficulty={handleDifficulty} />
      <TextEditor handleEditorChange={handleEditorChange} />
      <button
        onClick={handleSubmit}
        type="button"
        className="mb-2 mr-2 w-2/12 self-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </div>
  );
};

export default NewProblemForm;
