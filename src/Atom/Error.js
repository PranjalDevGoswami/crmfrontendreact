import React from "react";
import { useRedirectUser } from "../../utils/hooks/useRedirectUser";
import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();
  
  const handleRedirect = () =>{
    useRedirectUser(navigate)
  }
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800"
      style={{
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
      }}
    >
      <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
      <h2 className="text-2xl mb-2">Oops! Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button onClick={handleRedirect} className="text-blue-600 underline">Back to Home</button>
    </div>
  );
};

export default Error;
