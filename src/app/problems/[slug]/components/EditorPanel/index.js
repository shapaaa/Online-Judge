"use client";
import CodeEditor from "./CodeEditor";
import IOPanel from "./IOPanel";
import DropDown from "./DropDown";
import EditorProvider from "@/ContextProviders/EditorProvider";

const EditorPanel = ({ questionId }) => {
  return (
    <EditorProvider>
      <div className="flex flex-col gap-y-5">
        <DropDown />
        <CodeEditor questionId={questionId} />
        <IOPanel questionId={questionId} />
      </div>
    </EditorProvider>
  );
};

export default EditorPanel;
