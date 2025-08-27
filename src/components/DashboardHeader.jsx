import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function DashboardHeader() {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center bg-gray-800 p-4 rounded-lg mb-6 shadow-lg gap-4">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-700 px-3 py-2 rounded-lg w-full sm:w-auto sm:flex-1">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none text-gray-200 px-2 w-full"
        />
      </div>
    </header>
  );
}
