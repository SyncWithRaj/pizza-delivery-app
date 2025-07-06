import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">🍕 Welcome to Pizza Delivery</h1>
      {user ? (
        <p className="mt-4 text-xl">Hello, {user.fullName || user.username}!</p>
      ) : (
        <p className="mt-4 text-lg text-gray-500">Please login to continue.</p>
      )}
    </div>
  );
};

export default Home;
