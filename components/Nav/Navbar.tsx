"use client";
import {
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiSettings,
  FiMapPin,
} from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/(Images)/logo.png";
import SearchBarDesktop from "@/components/SearchBarDesktop/SearchBarDesktop";
import { useCart } from "@/app/CartContext"; // Adjust path as needed

export default function Navbar() {
  const { data: session } = useSession();
  // const session = { user: { name: "pradum", email: "hs", image: "/" } };
  const { itemCount } = useCart();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMenuOpen = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsUserMenuOpen(true);
  };

  const handleMenuClose = () => {
    timeoutRef.current = setTimeout(() => {
      setIsUserMenuOpen(false);
    }, 300); // 300ms delay for better UX
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  return (
    <nav className="bg-accent text-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Mobile Navigation */}
        <div className="md:hidden w-full  flex items-center justify-between h-16">
          {/* Mobile Menu Button */}

          {/* Centered Logo */}
          {/* <Link
            href="/"
            className="font-playfair text-2xl font-bold text-primary"
          >
            <Image src={logo} alt=" " width={100} height={20} priority />
          </Link> */}

          {/* Right Icons */}
          <Link
            href={"/Wishlist"}
            className="p-2 hover:text-secondary text-center flex flex-col justify-center items-center"
          >
            <FiHeart className="w-5 h-5" />
            <span className="text-sm">Wishlist</span>
          </Link>

          <Link
            href="/"
            className="font-playfair text-2xl font-bold text-primary"
          >
            <Image src={logo} alt=" " width={100} height={20} priority />
          </Link>

          <Link
            href="/Cart"
            className="hover:text-secondary transition-colors relative flex flex-col items-center"
          >
            {/* Cart Icon */}
            <FiShoppingCart className="w-6 h-6" />

            {/* Label */}
            <span className="text-sm">Cart</span>

            {/* Count Badge */}
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-accent text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-semibold shadow-sm">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between h-20">
          {/* Left Navigation Links */}
          <div className="flex-1 flex items-center gap-8">
            <SearchBarDesktop />
          </div>

          {/* Centered Logo */}
          <div className=" flex justify-center items-center  h-20 overflow-hidden ">
            <Link
              href="/"
              className="font-playfair text-xl font-bold text-primary  "
            >
              <Image src={logo} alt=" " width={120} height={10} priority />
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex-1 flex items-center justify-end gap-6">
            <Link
              href={"/Wishlist"}
              className="hover:text-secondary transition-colors relative flex flex-col items-center"
            >
              <FiHeart className="w-6 h-6" />
              <span className=""> Wishlist</span>
              {/* <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-4 h-4 rounded-full flex items-center justify-center"></span> */}
            </Link>

            <Link
              href="/Cart"
              className="hover:text-secondary transition-colors relative flex flex-col items-center"
            >
              {/* Cart Icon */}
              <FiShoppingCart className="w-6 h-6" />

              {/* Label */}
              <span className="text-sm">Cart</span>

              {/* Count Badge */}
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-accent text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-semibold shadow-sm">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Wishlist and Cart icons unchanged */}
            {session ? (
              <div
                ref={menuRef}
                className="relative"
                onMouseEnter={handleMenuOpen}
                onMouseLeave={handleMenuClose}
                onFocus={handleMenuOpen}
                onBlur={handleMenuClose}
              >
                <button
                  className="flex items-center gap-2 transition-colors hover:text-secondary focus:outline-none"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                >
                  {/* Avatar Button */}
                  <div className="relative h-8 w-8 overflow-visible">
                    <Image
                      src={session.user?.image || "/images/default-avatar.svg"}
                      alt="User avatar"
                      fill
                      className="rounded-full object-cover border border-primary/10"
                      sizes="32px"
                      priority
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {session.user?.name}
                  </span>
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute right-0 top-full z-[1000] mt-6 w-64 origin-top-right rounded-xl bg-white shadow-xl transition-[opacity,transform] duration-200 ${
                    isUserMenuOpen
                      ? "opacity-100 visible scale-100"
                      : "opacity-0 invisible scale-95"
                  }`}
                  role="menu"
                >
                  {/* Menu Content */}
                  <div className="p-4 space-y-4">
                    {/* User Info Section */}
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0">
                        <Image
                          src={session.user?.image || "Avatar"}
                          alt="User avatar"
                          fill
                          className="rounded-full object-cover border border-primary/10"
                          sizes="40px"
                          priority
                        />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-medium text-dark truncate">
                          {session.user?.name}
                        </p>
                        <p className="text-xs text-dark/75 truncate">
                          {session.user?.email}
                        </p>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <nav className="space-y-2 border-t border-primary/10 pt-4">
                      <Link
                        href="/User"
                        className="flex items-center gap-3 rounded-lg p-2 text-sm transition-colors hover:bg-primary/5"
                        role="menuitem"
                      >
                        <FiSettings className="h-4 w-4 text-primary shrink-0" />
                        <span>Account Settings</span>
                      </Link>
                      <Link
                        href="/User"
                        className="flex items-center gap-3 rounded-lg p-2 text-sm transition-colors hover:bg-primary/5"
                        role="menuitem"
                      >
                        <FiMapPin className="h-4 w-4 text-primary shrink-0" />
                        <span>Address Book</span>
                      </Link>
                    </nav>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/Login"
                className="
      group
      inline-flex items-center
      gap-3
      px-5 py-2.5
      rounded-lg
      border-2 border-primary
      bg-transparent
    
      transition-colors duration-200
      hover:bg-primary hover:text-white
      focus:outline-none focus:ring-2 focus:ring-primary/50
    "
              >
                {/* Icon */}
                <FiUser className="h-5 w-5 transition-colors duration-200 group-hover:text-white" />

                {/* Text */}
                <span className="font-poppins font-semibold text-sm transition-colors duration-200 group-hover:text-white">
                  Sign In
                </span>

                {/* Badge */}
                <span
                  className="
        ml-2
        inline-flex items-center justify-center
        h-4 w-4
        rounded-full
        bg-accent
        text-[10px] font-bold text-white
        ring-1 ring-white/50
      "
                >
                  !
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
