import { useContext, useState } from "react";
import CustomInput from "./CustomInput";
import { EditorContext } from "@/ContextProviders/EditorProvider";
import Result from "./Result";
import axios from "axios";

const IOPanel = ({ questionId }) => {
  const [activeId, setActiveId] = useState(0);
  const [output, setOutput] = useState("");
  const [verdict, setVerdict] = useState("");
  const { code, input, language } = useContext(EditorContext);

  const handleClick = (e) => {
    setActiveId(e.target.id);
  };

  const handleRun = async () => {
    setActiveId(1);
    try {
      const {
        data: { result },
      } = await axios.post("/api/run", {
        program: code,
        inputs: [input],
        language,
      });
      setOutput(result[0]);
    } catch (error) {
      setOutput(error.message);
    }
  };

  const handleSubmit = async () => {
    setActiveId(2);
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
  };

  const tabs = ["Input", "Output", "Verdict"];
  const panels = [
    <CustomInput />,
    <Result output={output} />,
    <Result verdict={verdict} />,
  ];
  const active = `active text-blue-600`;

  return (
    <div>
      <div className="flex flex-wrap border-b border-gray-200 text-center text-sm font-medium text-gray-500">
        {tabs.map((tab, index) => (
          <button
            key={index}
            id={index}
            className={` inline-block rounded-t-lg bg-gray-100 p-4${
              activeId == index ? active : ""
            }`}
            onClick={handleClick}
          >
            {tab}
          </button>
        ))}
      </div>
      {panels[activeId]}
      <div>
        <button onClick={handleRun}>Run</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default IOPanel;
