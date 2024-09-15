"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


const base_url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/auth";

const Login: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${base_url}/login`, { username, password });
      if (response.status === 200) {
        // Store user session (e.g., token or user info)
        localStorage.setItem("user", JSON.stringify(response.data.user));
       
        //Savve username
        const loggedInUser = response.data.user.username;
        localStorage.setItem("username", loggedInUser);

        // Redirect to home or profile page
        router.push("/");
      } else {
        setError(response.data.message || "Failed to login");
      }
    } catch (err: any) {
      console.error(err);
      setError("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f3eaea] bg-[url('/assets1.png')] bg-no-repeat bg-bottom bg-[length:70%]">
      <div className="absolute top-5 left-5 flex items-center space-x-2">
        <img src="/edunook.png" alt="EduNook Logo" className="w-10 h-10" />
        <h1 className="text-2xl font-bold text-black">EduNook</h1>
      </div>
      <div className="bg-white p-10 rounded-xl shadow-md w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-4 text-black">Log in</h2>
        <p className="text-center text-gray-500 mb-6">Log in to your account</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          /> 
          <button type="submit" className="w-full bg-[#89a3c6] text-white py-2 rounded-lg hover:bg-[#6f85a1] transition-colors">
            Log in
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <p className="text-center mt-6 text-gray-500">
          Don't have an account yet?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up now
          </a>
        </p>
      </div>
    </div>
  );
};


export default Login;