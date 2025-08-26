import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    // Ambil data pengguna dari localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));

    // Validasi input
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    // Cek apakah email dan password cocok
    if (userData && userData.email === email && userData.password === password) {
      localStorage.setItem("isAuthenticated", "true");
      alert(`Welcome back, ${userData.username}!`);
      window.location.href = "/admin/dashboard"; // Redirect to dashboard
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6">Admin Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-900 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-900 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-400"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
