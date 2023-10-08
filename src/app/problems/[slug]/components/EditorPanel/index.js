"use client";
import CodeEditor from "./CodeEditor";
import IOPanel from "./IOPanel";
import DropDown from "./DropDown";
import EditorProvider from "@/ContextProviders/EditorProvider";
import Link from "next/link";

const EditorPanel = ({ questionId, result }) => {
  return (
    <EditorProvider>
      <div className="flex w-full flex-col gap-y-[10px] rounded bg-white p-[20px]">
        <DropDown />
        <CodeEditor questionId={questionId} />
        <>
          {result.ok ? (
            result.user.verified ? (
              ""
            ) : (
              <div
                className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 "
                role="alert"
              >
                You need to verify your account to Run/Submit
              </div>
            )
          ) : (
            <div
              className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 "
              role="alert"
            >
              You need to{" "}
              <Link className="underline" href="/login">
                Login
              </Link>
              /
              <Link className="underline" href="/register">
                SignUp
              </Link>{" "}
              to Run/Submit
            </div>
          )}
        </>
        <IOPanel
          disable={result.ok ? !result.user.verified : !result.ok}
          questionId={questionId}
        />
      </div>
    </EditorProvider>
  );
};

export default EditorPanel;
