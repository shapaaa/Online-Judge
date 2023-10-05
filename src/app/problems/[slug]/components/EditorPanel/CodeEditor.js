import { useContext, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another
import { EditorContext } from "@/ContextProviders/EditorProvider";
const intitalCodes = {
  "C++": `#include <iostream>
    using namespace std;
  
  int main() 
  {
      cout << "Hello, World!";
      return 0;
  }`,
  Java: `import java.util.*;

  public class Main {
      public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
  }`,
  Python: `print("Hello, World!")`,
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
    <div className="h-[500px] w-[800px] overflow-y-scroll rounded-md border">
      <Editor
        value={code}
        onValueChange={handleChange}
        highlight={(code) => highlight(code, languages.js)}
        padding={10}
        className="min-h-[500px] "
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 16,
        }}
      />
    </div>
  );
};

export default CodeEditor;
