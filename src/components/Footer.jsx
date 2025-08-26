// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold">Contact Us</h2>
            <p className="text-gray-300">Email: info@fullstackcafe.com</p>
            <p className="text-gray-300">Phone: (+62) 82186193484</p>
          </div>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              Twitter
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              Instagram
            </a>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} FullStack Café. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
