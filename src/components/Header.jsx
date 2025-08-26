export default function Contact() {
  return (
    <section
      className="relative bg-gray-900 text-white min-h-screen flex items-center justify-center px-4 py-12"
      id="contact"
    >
      {/* Content */}
      <div className="relative z-10 max-w-3xl w-full bg-black bg-opacity-60 rounded-lg p-8 shadow-lg">
        <h2 className="text-4xl font-bold mb-6 text-center">
          Get in Touch
        </h2>
        <p className="text-center mb-8 text-gray-300">
          Have a question or want to work together? Fill out the form below.
        </p>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="name" className="block mb-2 font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 font-semibold">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Write your message here..."
              className="w-full px-4 py-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-gray-900 font-bold py-3 rounded hover:bg-yellow-400 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
