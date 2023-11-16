// Login.js
import { useState, useContext } from "react";
import { AuthContext } from "./auth/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }
    await login(username, password);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          className="p-2 m-2 border-2 border-gray-400 rounded-md w-full"
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          className="p-2 m-2 border-2 border-gray-400 rounded-md w-full"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button
          type="submit"
          className="p-2 m-2 bg-blue-500 text-white rounded-md w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
