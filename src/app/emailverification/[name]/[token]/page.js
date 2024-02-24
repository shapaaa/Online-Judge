"use client";
import axios from "axios";
import { useEffect } from "react";
export default function EmailVerificationPage({ params: userInfo }) {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const verifyEmailToken = async () => {
      try {
        const res = await axios.post("/api/verifyEmailToken", userInfo);
        setMessage("Verified");
      } catch (error) {
        setMessage(error.message);
      }
    };
    verifyEmailToken();
  }, []);
  return <div>{message}</div>;
}
