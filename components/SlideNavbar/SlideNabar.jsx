// components/Navbar.tsx
"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const navigation = [
    {
      name: "Clothing",
      items: [
        { name: "Suit Sets", url: "Kurties/Suit-Sets" },
        { name: "Kurtas & Tops", url: "Kurties/Kurtas-Tops" },
        { name: "Dresses", url: "Kurties/Dresses" },
        { name: "Dress Material", url: "Kurties/Dress-Material" },
        { name: "Bottoms", url: "Bottom/Bottom-wear" },
      ],
    },
    {
      name: "Accessories",
      items: [
        { name: "Jewellery", url: "Accessories/Jewellery" },
        { name: "Bags", url: "Accessories/Bags" },
        { name: "Footer wear", url: "Accessories/Footer-wear" },
      ],
    },
    {
      name: "Collections",
      items: [
        { name: "New Arrivals", url: "Collections/New-Arrivals" },
        { name: "Co-ord Sets", url: "Collections/Co-ord-Sets" },
      ],
    },
    {
      name: "Girls",
      url: "Girls-Collection/Girl",
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-neutral text-dark shadow-sm w-full z-50">
      <div className="hidden md:flex items-center justify-center h-16">
        <div
          className="flex items-center justify-center gap-8"
          ref={dropdownRef}
        >
          {navigation.map((item) => (
            <div
              key={item.name}
              className="relative h-full flex items-center"
              onMouseEnter={() => item.items && setOpenDropdown(item.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {item.url ? (
                <Link
                  href={item.url}
                  className="font-poppins font-medium hover:text-secondary transition-colors py-2 px-3"
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  className="font-poppins font-medium hover:text-secondary transition-colors flex items-center gap-1 py-2 px-3"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === item.name ? null : item.name
                    )
                  }
                >
                  {item.name}
                  <span className="text-xs ml-1">⌄</span>
                </button>
              )}

              {item.items && openDropdown === item.name && (
                <div className="absolute top-full z-50 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 min-w-[200px] mt-1">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.url}
                      className="block py-2 px-4 hover:bg-accent/40 rounded-md transition-colors"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
