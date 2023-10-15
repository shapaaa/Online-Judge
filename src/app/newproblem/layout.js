"use client";
import ProblemProvider from "@/ContextProviders/ProblemProvider";

const NewProblemLayout = ({ children }) => {
  return <ProblemProvider>{children}</ProblemProvider>;
};

export default NewProblemLayout;
