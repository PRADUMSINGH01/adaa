import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBarMobile = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchTerm(""); // Clear search term when closing
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      toggleSearch(); // Close search bar after submitting
    }
  };

  return (
    <div className="relative">
      <button onClick={toggleSearch} className="text-dark focus:outline-none">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </button>

      {isSearchOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-neutral z-50 flex items-center justify-center">
          <form onSubmit={handleSearch} className="relative w-4/5 max-w-md">
            <input
              type="text"
              placeholder="Search for clothing..."
              className="bg-light text-dark font-poppins rounded-full py-3 pl-6 pr-12 w-full focus:outline-none focus:ring-2 focus:ring-primary text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-neutral rounded-full p-3 hover:bg-secondary transition duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
            <button
              onClick={toggleSearch}
              className="absolute left-3 top-3 text-dark focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SearchBarMobile;
