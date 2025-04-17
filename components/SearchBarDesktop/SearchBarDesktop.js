"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBarDesktop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className=" w-64 lg:w-80 relative flex items-center m-5"
    >
      <input
        type="text"
        placeholder="Search for clothing..."
        className="bg-neutral text-dark font-poppins rounded-full py-2.5 pl-5 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-primary"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-neutral rounded-full p-2 hover:bg-secondary transition duration-300"
      >
        <svg
          className="w-5 h-5"
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
    </form>
  );
};

export default SearchBarDesktop;
