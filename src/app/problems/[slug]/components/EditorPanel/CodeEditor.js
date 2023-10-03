import { useContext, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another
import { EditorContext } from "@/ContextProviders/EditorProvider";
const intitalCodes = {
  "C++": "",
  Java: "",
  Python: "",
};
const CodeEditor = ({ questionId }) => {
  const { language, code, setCode } = useContext(EditorContext);

  useEffect(() => {
    if (!localStorage.getItem(questionId)) setCode(intitalCodes[language]);
  }, [language]);

  useEffect(() => {
    const storedCode = localStorage.getItem(questionId);
    if (!!storedCode) setCode(storedCode);
  }, []);

  const handleChange = (code) => {
    setCode(code);
    localStorage.setItem(questionId, code);
  };

  return (
    <Editor
      value={code}
      onValueChange={handleChange}
      highlight={(code) => highlight(code, languages.js)}
      padding={20}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 16,
      }}
    />
  );
};

export default CodeEditor;
