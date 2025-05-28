// components/Navbar.tsx
"use client";
import { FiMenu, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const links = [
    "Kurties/Suit-Sets",
    "Kurties/Kurtas-Tops",
    "Kurties/Dresses",
    "Kurties/Dress-Material",
    "Bottom/Bottom-wear",
  ];
  const navigation = [
    {
      name: "Clothing",
      items: [
        "Suit Sets",
        "Kurtas & Tops",
        "Dresses",
        "Dress Material",
        "Bottoms",
      ],
      links: [
        "Kurties/Suit-Sets",
        "Kurties/Kurtas-Tops",
        "Kurties/Dresses",
        "Kurties/Dress-Material",
        "Bottom/Bottom-wear",
      ],
      url: "Clothing",
    },
    {
      name: "Accessories",
      items: ["Jewellery", "Bags", "Footer wear"],
      links: [
        "Accessories/Jewellery",
        "Accessories/Bags",
        "Accessories/Footer-wear",
      ],
      url: "Accessories",
    },
    {
      name: "Collections",
      items: ["New Arrivals", "Co-ord Sets"],
      links: ["Collections/New-Arrivals", "Collections/Co-ord-Sets"],
      url: "Collection",
    },
    { name: "Girls", url: "Girls-Collection/Girl" },
  ];

  return (
    <nav className="hidden md:flex bg-neutral text-dark shadow-sm sticky top-20 z-50">
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-playfair text-2xl font-bold text-primary"
          ></Link>

          <div className="flex items-center gap-6 ">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="font-poppins font-medium hover:text-secondary transition-colors flex items-center gap-1">
                  <Link href={`${item.url}`}>{item.name} </Link>
                  {item.items && <span className="text-xs">⌄</span>}
                </button>

                {item.items && openDropdown === item.name && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg p-4 min-w-[200px]">
                    {item.items.map((subItem, index) => (
                      <Link
                        key={index}
                        href={`${item.links[index]}`}
                        className="block py-2 px-4 hover:bg-light rounded-md"
                      >
                        {subItem}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button className="hover:text-secondary"></button>
            <button className="hover:text-secondary"></button>
            <button className="hover:text-secondary"></button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between h-16">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            <FiMenu className="w-6 h-6" />
          </button>

          <Link
            href="/"
            className="font-playfair text-2xl font-bold text-primary"
          ></Link>

          <div className="flex items-center gap-4">
            <FiShoppingCart className="w-5 h-5" />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white p-4 border-t">
            {navigation.map((item) => (
              <div key={item.name} className="mb-4">
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === item.name ? null : item.name
                    )
                  }
                  className="w-full flex justify-between items-center py-2 font-poppins font-medium"
                >
                  {item.name}
                  {item.items && <span>⌄</span>}
                </button>

                {item.items && openDropdown === item.name && (
                  <div className="ml-4">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem}
                        href="#"
                        className="block py-2 text-secondary"
                      >
                        {subItem}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="border-t mt-4 pt-4 flex justify-between">
              <button className="flex items-center gap-2">
                <FiUser className="w-5 h-5" />
                Account
              </button>
              <button className="flex items-center gap-2">
                <FiHeart className="w-5 h-5" />
                Wishlist
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
