import { EditorContext } from "@/ContextProviders/EditorProvider";
import { useContext } from "react";

const CustomInput = () => {
  const { setInput, input } = useContext(EditorContext);
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <textarea
      value={input}
      onChange={handleChange}
      id="message"
      rows="4"
      class="block h-[80px] w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      placeholder="Custom Input"
    ></textarea>
  );
};

export default CustomInput;
