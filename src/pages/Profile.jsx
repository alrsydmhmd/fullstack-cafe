import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";

export default function Profile() {
  const [employees, setProfile] = useState([]);
  const [newEmployee, setNewProfile] = useState({
    name: "",
    role: "Kasir",
    jamMasuk: "",
    jamKeluar: "",
    lembur: "",
    cuti: "",
  });
  const [editingId, setEditingId] = useState(null);

  const roles = ["Kasir", "Barista", "Manajer", "Waiter", "Cleaner"];

  // Fetch data dari backend
  const fetchUsers = async () => { 
    try {
      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();
      setProfile(data);
      localStorage.setItem("users", JSON.stringify(data));
    } catch (err) {
      console.error("Gagal fetch users:", err);
      const stored = JSON.parse(localStorage.getItem("users")) || [];
      setProfile(stored);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Tambah / Update pegawai
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newEmployee.name || !newEmployee.jamMasuk || !newEmployee.jamKeluar) {
      alert("Nama, Jam Masuk, dan Jam Keluar wajib diisi!");
      return;
    }

    if (editingId) {
      // Update pegawai
      try {
        const res = await fetch(`http://localhost:5000/api/users/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEmployee),
        });
        const data = await res.json();
        if (!data.success) {
          alert(data.message);
          return;
        }
        const updated = employees.map((emp) =>
          emp.id === editingId ? data.user : emp
        );
        setProfile(updated);
        localStorage.setItem("users", JSON.stringify(updated));
        setNewProfile({
          name: "",
          role: "Kasir",
          jamMasuk: "",
          jamKeluar: "",
          lembur: "",
          cuti: "",
        });
        setEditingId(null);
      } catch (err) {
        console.error(err);
        alert("Gagal mengupdate pegawai");
      }
    } else {
      // Tambah pegawai baru
      try {
        const res = await fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEmployee),
        });
        const added = await res.json();
        const updated = [...employees, added];
        setProfile(updated);
        localStorage.setItem("users", JSON.stringify(updated));
        setNewProfile({
          name: "",
          role: "Kasir",
          jamMasuk: "",
          jamKeluar: "",
          lembur: "",
          cuti: "",
        });
      } catch (err) {
        console.error(err);
        alert("Gagal menambahkan pegawai");
      }
    }
  };

  // Hapus pegawai
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus pegawai ini?")) return;
    try {
      await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
      const updated = employees.filter((emp) => emp.id !== id);
      setProfile(updated);
      localStorage.setItem("users", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus pegawai");
    }
  };

  // Edit pegawai
  const handleEdit = (emp) => {
    setEditingId(emp.id);
    setNewProfile({
      name: emp.name,
      role: emp.role,
      jamMasuk: emp.jamMasuk,
      jamKeluar: emp.jamKeluar,
      lembur: emp.lembur,
      cuti: emp.cuti,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewProfile({
      name: "",
      role: "Kasir",
      jamMasuk: "",
      jamKeluar: "",
      lembur: "",
      cuti: "",
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 p-6">
        <DashboardHeader />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Data Pegawai Fullstack Café</h1>
          <Link
            to="/dashboard"
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
          >
            ← Kembali
          </Link>
        </div>

        {/* Form Tambah/Edit Pegawai */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingId ? "Edit Pegawai" : "Tambah Pegawai"}
          </h2>
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-6">
            <input
              type="text"
              placeholder="Nama"
              value={newEmployee.name}
              onChange={(e) => setNewProfile({ ...newEmployee, name: e.target.value })}
              className="p-2 rounded bg-gray-700 text-white"
            />
            <select
              value={newEmployee.role}
              onChange={(e) => setNewProfile({ ...newEmployee, role: e.target.value })}
              className="p-2 rounded bg-gray-700 text-white"
            >
              {roles.map((r) => (<option key={r} value={r}>{r}</option>))}
            </select>
            <input
              type="time"
              value={newEmployee.jamMasuk}
              onChange={(e) => setNewProfile({ ...newEmployee, jamMasuk: e.target.value })}
              className="p-2 rounded bg-gray-700 text-white"
            />
            <input
              type="time"
              value={newEmployee.jamKeluar}
              onChange={(e) => setNewProfile({ ...newEmployee, jamKeluar: e.target.value })}
              className="p-2 rounded bg-gray-700 text-white"
            />
            <input
              type="text"
              placeholder="Lembur"
              value={newEmployee.lembur}
              onChange={(e) => setNewProfile({ ...newEmployee, lembur: e.target.value })}
              className="p-2 rounded bg-gray-700 text-white"
            />
            <input
              type="text"
              placeholder="Cuti"
              value={newEmployee.cuti}
              onChange={(e) => setNewProfile({ ...newEmployee, cuti: e.target.value })}
              className="p-2 rounded bg-gray-700 text-white"
            />
            <div className="flex gap-2 md:col-span-6">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded"
              >
                {editingId ? "Update Pegawai" : "Tambah Pegawai"}
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

        {/* Tabel Pegawai */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full text-left text-gray-300">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2">Nama</th>
                <th>Staff</th>
                <th>Jam Masuk</th>
                <th>Jam Keluar</th>
                <th>Lembur</th>
                <th>Cuti</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? employees.map(emp => (
                <tr key={emp.id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="py-2">{emp.name}</td>
                  <td>{emp.role}</td>
                  <td>{emp.jamMasuk || "-"}</td>
                  <td>{emp.jamKeluar || "-"}</td>
                  <td>{emp.lembur || "-"}</td>
                  <td>{emp.cuti || "-"}</td>
                  <td className="flex gap-2 py-2">
                    <button
                      onClick={() => handleEdit(emp)}
                      className="bg-yellow-600 hover:bg-yellow-500 px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="7" className="text-center py-4">Tidak ada data pegawai.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
