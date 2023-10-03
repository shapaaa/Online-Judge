import { EditorContext } from "@/ContextProviders/EditorProvider";
import { useContext } from "react";

const CustomInput = () => {
  const { setInput, input } = useContext(EditorContext);
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  return <textarea value={input} onChange={handleChange} />;
};

export default CustomInput;
