"use client";
import axios from "axios";
export default function Home() {
  const handleClick = async () => {
    const question = {
      title: "another question",
      description: "Another Desc",
      difficulty: "Hard",
    };
    const response = await axios.get("/api/questions");
    console.log(response);
  };
  return (
    <div>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}
