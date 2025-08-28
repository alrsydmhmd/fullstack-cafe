// src/pages/Account.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";

export default function Account() {
  const [accounts, setAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [editingId, setEditingId] = useState(null); // id akun yang sedang diedit

  // Ambil data akun dari backend
  const fetchAccounts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth");
      const data = await res.json();
      setAccounts(data);
      localStorage.setItem("accounts", JSON.stringify(data));
    } catch (err) {
      console.error("Gagal fetch akun:", err);
      const stored = JSON.parse(localStorage.getItem("accounts")) || [];
      setAccounts(stored);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // Tambah akun baru atau update akun
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newAccount.username || !newAccount.email || !newAccount.password) {
      alert("Username, Email, dan Password wajib diisi!");
      return;
    }

    if (editingId) {
      // Update akun
      try {
        const res = await fetch(`http://localhost:5000/api/auth/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAccount),
        });
        const data = await res.json();
        if (!data.success) {
          alert(data.message);
          return;
        }
        const updated = accounts.map((acc) =>
          acc.id === editingId ? data.user : acc
        );
        setAccounts(updated);
        localStorage.setItem("accounts", JSON.stringify(updated));
        setNewAccount({ username: "", email: "", password: "" });
        setEditingId(null);
      } catch (err) {
        console.error(err);
        alert("Gagal mengupdate akun");
      }
    } else {
      // Tambah akun baru
      try {
        const res = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAccount),
        });
        const data = await res.json();
        if (!data.success) {
          alert(data.message);
          return;
        }
        const updated = [...accounts, data.user];
        setAccounts(updated);
        localStorage.setItem("accounts", JSON.stringify(updated));
        setNewAccount({ username: "", email: "", password: "" });
      } catch (err) {
        console.error(err);
        alert("Gagal menambahkan akun");
      }
    }
  };

  // Hapus akun
const handleDelete = async (id) => {
  if (!window.confirm("Yakin ingin menghapus akun ini?")) return;

  try {
    const res = await fetch(`http://localhost:5000/api/auth/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (!data.success) {
      alert(data.message || "Gagal menghapus akun");
      return;
    }

    // Update state setelah berhasil hapus
    const updated = accounts.filter((acc) => acc.id !== id);
    setAccounts(updated);
    localStorage.setItem("accounts", JSON.stringify(updated));
  } catch (err) {
    console.error(err);
    alert("Terjadi kesalahan saat menghapus akun");
  }
};

  // Edit akun — isi form
  const handleEdit = (acc) => {
    setEditingId(acc.id);
    setNewAccount({
      username: acc.username,
      email: acc.email,
      password: acc.password,
    });
  };

  // Batalkan edit
  const cancelEdit = () => {
    setEditingId(null);
    setNewAccount({ username: "", email: "", password: "" });
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 p-6">
        <DashboardHeader />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Data Akun Admin & Staff</h1>
          <Link
            to="/dashboard"
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
          >
            ← Kembali
          </Link>
        </div>

        {/* Form Tambah/Edit Akun */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingId ? "Edit Akun" : "Tambah Akun"}
          </h2>
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-4">
            <input
              type="text"
              placeholder="Username"
              value={newAccount.username}
              onChange={(e) => setNewAccount({ ...newAccount, username: e.target.value })}
              className="p-2 rounded bg-gray-700 text-white"
            />
            <input
              type="email"
              placeholder="Email"
              value={newAccount.email}
              onChange={(e) => setNewAccount({ ...newAccount, email: e.target.value })}
              className="p-2 rounded bg-gray-700 text-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={newAccount.password}
              onChange={(e) => setNewAccount({ ...newAccount, password: e.target.value })}
              className="p-2 rounded bg-gray-700 text-white"
            />
            <div className="flex gap-2 md:col-span-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded"
              >
                {editingId ? "Update Akun" : "Tambah Akun"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tabel Akun */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full text-left text-gray-300">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2">Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {accounts.length > 0 ? (
                accounts.map((acc) => (
                  <tr key={acc.id} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="py-2">{acc.username}</td>
                    <td>{acc.email}</td>
                    <td>{acc.password}</td>
                    <td className="flex gap-2 py-2">
                      <button
                        onClick={() => handleEdit(acc)}
                        className="bg-yellow-600 hover:bg-yellow-500 px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(acc.id)}
                        className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    Tidak ada data akun.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
