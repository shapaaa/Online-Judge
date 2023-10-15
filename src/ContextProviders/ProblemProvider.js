import { createContext, useState } from "react";

export const ProblemContext = createContext();
const ProblemProvider = ({ children }) => {
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [title, setTitle] = useState("");

  const intitalValue = {
    description,
    setDescription,
    difficulty,
    setDifficulty,
    title,
    setTitle,
  };

  return (
    <ProblemContext.Provider value={intitalValue}>
      {children}
    </ProblemContext.Provider>
  );
};
export default ProblemProvider;
