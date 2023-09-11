"use client";
import axios from "axios";
export default function Home() {
  const handleClick = async () => {
    const user = { email: "sspathak200@gmail.com", password: "ssp@1234" };
    const response = await axios.post("/api/login", user);
    console.log(response);
  };
  return (
    <div>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}
