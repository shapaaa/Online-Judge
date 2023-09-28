"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const Logout = () => {
  const router = useRouter();
  const handleClick = async () => {
    await axios.delete("/api/logout");
    router.refresh();
  };
  return <button onClick={handleClick}>Sign Out</button>;
};

export default Logout;
