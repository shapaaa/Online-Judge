"use client";
import CodeEditor from "./CodeEditor";
import IOPanel from "./IOPanel";
import DropDown from "./DropDown";
import EditorProvider from "@/ContextProviders/EditorProvider";

const EditorPanel = ({ questionId }) => {
  return (
    <EditorProvider>
      <DropDown />
      <CodeEditor />
      <IOPanel questionId={questionId} />
    </EditorProvider>
  );
};

export default EditorPanel;
