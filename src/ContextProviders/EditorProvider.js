import { createContext, useState } from "react";

export const EditorContext = createContext();
const EditorProvider = ({ children }) => {
  const [language, setLanguage] = useState("C++");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");

  const intitalValue = {
    language,
    setLanguage,
    code,
    setCode,
    input,
    setInput,
  };
  return (
    <EditorContext.Provider value={intitalValue}>
      {children}
    </EditorContext.Provider>
  );
};
export default EditorProvider;
