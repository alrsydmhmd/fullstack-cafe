import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null); // null, "sending", "success", "error"

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email.");
      return;
    }

    setStatus("sending");

    // Simulate sending data
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  }

  return (
    <section>

        <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label htmlFor="name" className="block font-medium mb-1">
                Name
            </label>
            <input
                type="text"
                name="name"
                id="name"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                />
            </div>

            <div>
            <label htmlFor="email" className="block font-medium mb-1">
                Email
            </label>
            <input
                type="email"
                name="email"
                id="email"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                />
            </div>

            <div>
            <label htmlFor="message" className="block font-medium mb-1">
                Message
            </label>
            <textarea
                name="message"
                id="message"
                rows="4"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                />
            </div>

            <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
            >
            {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
                <p className="mt-3 text-green-600">Thank you! Your message has been sent.</p>
            )}
        </form>
        </div>
    </section>
  );
}
