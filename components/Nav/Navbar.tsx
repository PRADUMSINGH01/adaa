import { FiMenu, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-neutral text-dark shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <button className="p-2 hover:text-primary transition-colors">
            <FiMenu className="w-6 h-6" />
          </button>

          {/* Centered Logo */}
          <Link
            href="/"
            className="font-playfair text-2xl font-bold text-primary"
          >
            KurtiKraft
          </Link>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:text-secondary">
              <FiHeart className="w-5 h-5" />
            </button>
            <button className="p-2 hover:text-secondary">
              <FiShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between h-20">
          {/* Left Navigation Links */}
          <div className="flex-1 flex items-center gap-8">
            <Link
              href="/New-Arrivals"
              className="font-poppins font-medium hover:text-secondary transition-colors"
            >
              New Arrivals
            </Link>
            <Link
              href="/collections"
              className="font-poppins font-medium hover:text-secondary transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/sale"
              className="font-poppins font-medium hover:text-secondary transition-colors"
            >
              Sale
            </Link>
          </div>

          {/* Centered Logo */}
          <div className="flex-1 flex justify-center">
            <Link
              href="/"
              className="font-playfair text-3xl font-bold text-primary hover:opacity-90 transition-opacity"
            >
              KurtiKraft
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex-1 flex items-center justify-end gap-6">
            <Link
              href={"/wishlist"}
              className="hover:text-secondary transition-colors relative"
            >
              <FiHeart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
            </Link>

            <Link
              href={"/Cart"}
              className="hover:text-secondary transition-colors relative"
            >
              <FiShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </Link>

            <Link
              href={"/User"}
              className="hover:text-secondary transition-colors"
            >
              <FiUser className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
