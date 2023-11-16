import { useContext, useState } from "react";
import { AuthContext } from "./auth/AuthContext";
import { Navigate } from "react-router-dom";
const BASE_URL = "http://localhost:8080";

export default function Game() {
  const [guess, setGuess] = useState<number>();
  const [count, setCount] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean>();
  const { isAuthenticated, logout } = useContext(AuthContext);
  if (isAuthenticated === undefined) return <div>Loading...</div>;
  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }
  const handleGuess = async () => {
    setCount(count + 1);
    try {
      const response = await fetch(`${BASE_URL}/guess`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ number: guess }),
      });
      if (response.status === 201) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <p className="text-2xl font-bold mb-4">Guess the number(1-10)</p>
      <p className="text-xl font-bold mb-4"># of guesses: {count}</p>
      {isCorrect === true && (
        <p className="text-xl font-bold mb-4 text-green-500">Correct!</p>
      )}
      {isCorrect === false && (
        <p className="text-xl font-bold mb-4 text-red-500">Incorrect!</p>
      )}
      <input
        className="p-2 m-2 border-2 border-gray-400 rounded-md "
        type="number"
        placeholder=""
        value={guess}
        onChange={(e) => setGuess(parseInt(e.target.value))}
      />
      <button
        className="px-4 py-2 m-2 bg-blue-500 text-white rounded-md "
        onClick={handleGuess}
      >
        Guess
      </button>
      <button
        className="p-2 mt-16 bg-slate-500 text-white rounded-md "
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
