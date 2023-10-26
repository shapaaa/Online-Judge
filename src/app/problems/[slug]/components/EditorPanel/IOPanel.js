import { useContext, useState } from "react";
import CustomInput from "./CustomInput";
import { EditorContext } from "@/ContextProviders/EditorProvider";
import Result from "./Result";
import axios from "axios";
import { useRouter } from "next/navigation";

const IOPanel = ({ disable, questionId }) => {
  const [activeId, setActiveId] = useState(0);
  const [output, setOutput] = useState("");
  const [verdict, setVerdict] = useState("");
  const [loading, setLoading] = useState(false);
  const { code, input, language } = useContext(EditorContext);
  const router = useRouter();

  const handleClick = (e) => {
    setActiveId(e.target.id);
  };

  const handleRun = async () => {
    setActiveId(1);
    setLoading(true);
    try {
      const response = await axios.post("/api/run", {
        program: code,
        inputs: [input],
        language,
      });
      const {
        data: { result },
      } = response;
      setOutput(result[0]);
    } catch (error) {
      setOutput(error.response.data);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    setActiveId(2);
    setLoading(true);
    try {
      const {
        data: { verdict },
      } = await axios.post("/api/submit", {
        program: code,
        language,
        questionId,
      });
      setVerdict(verdict);
    } catch (error) {
      setVerdict(error.message);
    }
    router.refresh();
    setLoading(false);
  };

  const tabs = ["Input", "Output", "Verdict"];
  const active = `active text-blue-600`;

  return (
    <div className="flex flex-col gap-y-[10px]">
      <div className=" flex flex-wrap gap-x-[5px] border-b border-gray-200 text-center text-sm font-medium text-gray-500">
        {tabs.map((tab, index) => (
          <button
            key={index}
            id={index}
            className={` inline-block rounded-t-lg bg-gray-100 p-4 ${
              activeId == index ? active : ""
            }`}
            onClick={handleClick}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeId == 0 && <CustomInput />}
      {activeId == 1 && <Result loading={loading} output={output} />}
      {activeId == 2 && <Result loading={loading} verdict={verdict} />}
      <div>
        <button
          disabled={disable}
          onClick={handleRun}
          type="button"
          className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-25 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Run
        </button>
        <button
          disabled={disable}
          onClick={handleSubmit}
          type="button"
          className="mb-2 mr-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:opacity-25 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default IOPanel;
