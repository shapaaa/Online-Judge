import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

export default function TextEditor({ handleEditorChange }) {
  return (
    <MdEditor
      onChange={handleEditorChange}
      style={{ height: "500px" }}
      renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
    />
  );
}
