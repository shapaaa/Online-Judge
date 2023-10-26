"use client";
import axios from "axios";
import { useState } from "react";
import DropDown from "../../components/DropDown";

const SubmitTestCases = ({ params }) => {
  const { questionid } = params;
  const [testCasesInput, setTestCasesInput] = useState("");
  const [time, setTime] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleChange = (e) => {
    setTestCasesInput(e.target.value);
  };
  const handleSubmit = async () => {
    const testCases = testCasesInput.split("\n\n");
    const testcases = testCases.map((testCase) => {
      const testcase = testCase.replace("Input\n", "").split("Output\n");
      return { input: testcase[0], expectedOutput: testcase[1] };
    });
    const payload = {
      questionId: questionid,
      testcases,
      time,
    };
    try {
      setLoading(true);
      const result = await axios.post("/api/testcases", payload);
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
  const handleTime = (e) => {
    setTime(e.target.value);
  };
  return (
    <div className="mx-auto my-[20px] flex  w-9/12  flex-col items-center gap-y-[20px]">
      <label
        htmlFor="message"
        className="mb-2 block self-start text-lg font-extrabold text-gray-900 "
      >
        Add TestCases
      </label>
      <DropDown
        id="time"
        value={time}
        handleChange={handleTime}
        label="Select time limit"
        options={[1, 2, 3, 4, 5, 6]}
      />
      <textarea
        value={testCasesInput}
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
