"use client";
import { ProblemContext } from "@/ContextProviders/ProblemProvider";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";

const SubmitTestCases = () => {
  const [testCases, setTestCases] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { description, difficulty, title } = useContext(ProblemContext);
  const handleChange = (e) => {
    setTestCases(e.target.value);
  };
  const handleSubmit = async () => {
    const newProblem = {
      description,
      title,
      difficulty,
      testcases: testCases.split("\n\n"),
    };
    try {
      setLoading(true);
      const result = await axios.post("/api/questions", newProblem);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };
  return (
    <div className="mx-auto mb-[20px] flex  w-9/12  flex-col items-center gap-y-[10px]">
      <label
        htmlFor="message"
        className="mb-2 block self-start text-sm font-medium text-gray-900 "
      >
        Add TestCases
      </label>
      <textarea
        value={testCases}
        onChange={handleChange}
        id="message"
        rows="4"
        className=" block h-[450px] w-full overflow-y-scroll rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
        placeholder="Enter testcases as per format"
      ></textarea>
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
export default SubmitTestCases;
