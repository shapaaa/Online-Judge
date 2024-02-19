import { EditorContext } from "@/ContextProviders/EditorProvider";
import { useContext } from "react";

const DropDown = () => {
  const { language, setLanguage } = useContext(EditorContext);
  const handleLanguage = (e) => {
    setLanguage(e.target.value);
  };
  return (
    <div className="w-3/12">
      <label
        htmlFor="language"
        className="mb-2 block text-sm font-medium text-gray-900 "
      >
        Language
      </label>
      <select
        id="language"
        value={language}
        onChange={handleLanguage}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="cpp">C++</option>
        <option value="java">Java</option>
        <option value="py">Python</option>
      </select>
    </div>
  );
};

export default DropDown;
