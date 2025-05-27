"use client";
import { FiMenu, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/(Images)/logo.png";
import SearchBarDesktop from "@/components/SearchBarDesktop/SearchBarDesktop";

export default function Navbar() {
  const { data: session } = useSession();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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
            <Image src={logo} alt=" " width={100} height={10} priority />
          </Link>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            <Link href={"/Wishlist"} className="p-2 hover:text-secondary">
              <FiHeart className="w-5 h-5" />
            </Link>
            <Link href={"/Cart"} className="p-2 hover:text-secondary">
              <FiShoppingCart className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between h-20">
          {/* Left Navigation Links */}
          <div className="flex-1 flex items-center gap-8">
            <SearchBarDesktop />
          </div>

          {/* Centered Logo */}
          <div className="flex-1 flex justify-center">
            <Link
              href="/"
              className="font-playfair text-3xl font-bold text-primary hover:opacity-90 transition-opacity"
            >
              <Image src={logo} alt=" " width={200} height={20} priority />
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex-1 flex items-center justify-end gap-6">
            <Link
              href={"/Wishlist"}
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

            {session ? (
              <div
                className="relative"
                onMouseEnter={() => setIsUserMenuOpen(true)}
                onMouseLeave={() => setIsUserMenuOpen(false)}
              >
                <button className="hover:text-secondary transition-colors">
                  <FiUser className="w-6 h-6" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-neutral text-dark shadow-lg rounded-lg p-4">
                    {/* User Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={session.user?.image || "/default-avatar.png"}
                        alt="User Avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{session.user?.name}</p>
                        <p className="text-sm text-gray-500">
                          {session.user?.email}
                        </p>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <Link
                      href="/account"
                      className="block py-2 px-2 hover:bg-primary hover:text-white rounded transition-colors"
                    >
                      Account
                    </Link>
                    <Link
                      href="/address"
                      className="block py-2 px-2 hover:bg-primary hover:text-white rounded transition-colors mt-2"
                    >
                      Address
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left py-2 px-2 hover:bg-primary hover:text-white rounded transition-colors mt-2"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/User"
                className="hover:text-secondary transition-colors"
              >
                <FiUser className="w-6 h-6" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
