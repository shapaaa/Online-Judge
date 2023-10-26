"use client";

import { useState } from "react";
import TextEditor from "./TextEditor";
import axios from "axios";
import DropDown from "./DropDown";
import { useRouter, usePathname } from "next/navigation";
import { useContext } from "react";
import LoadingSpinner from "@/app/components/LoadingSpinner";

const NewProblemForm = (props) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [title, setTitle] = useState();
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
      try {
        setLoading(true);
        const newQuestion = {
          title,
          description,
          difficulty,
        };
        const {
          data: { question },
        } = await axios.post("/api/questions", newQuestion);
        setLoading(false);
        router.refresh();
        router.push(
          `${pathname}/${question.title
            .toLowerCase()
            .replaceAll(" ", "-")}/submit-testcases`,
        );
      } catch (error) {
        setLoading(false);
        setError(error.message);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    }
  };
  return (
    <>
      {loading ? (
        <div className="flex h-[300px] items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {error && <div>{error}</div>}
          <div className="flex flex-col gap-y-[20px] p-[20px]">
            <h2
              htmlFor="message"
              className="mb-2 block self-start text-lg font-extrabold text-gray-900 "
            >
              Add New Problem
            </h2>
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-900 "
              >
                Title
              </label>
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
            </div>
            <DropDown
              label="Select difficulty level"
              value={difficulty}
              id="difficulty"
              handleChange={handleDifficulty}
              options={["Easy", "Medium", "Hard"]}
            />
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-900 "
              >
                Description
              </label>
              <TextEditor handleEditorChange={handleEditorChange} />
            </div>
            <button
              onClick={handleSubmit}
              type="button"
              className="mb-2 mr-2 w-2/12 self-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default NewProblemForm;
