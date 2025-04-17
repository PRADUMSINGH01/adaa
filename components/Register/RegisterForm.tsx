// app/auth/register/page.tsx
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-neutral p-4">
      <div className="max-w-md mx-auto mt-12">
        <h1 className="font-playfair text-3xl font-bold text-dark text-center mb-8">
          Create Account
        </h1>

        <form className="space-y-6">
          <div>
            <label className="block font-poppins text-dark mb-2">
              Full Name
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block font-poppins text-dark mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block font-poppins text-dark mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label className="block font-poppins text-dark mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Confirm your password"
            />
          </div>

          <button className="w-full bg-primary text-neutral py-3 rounded-lg font-poppins font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            Register <FiArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/auth/login"
            className="text-secondary font-poppins hover:text-secondary/80"
          >
            Already have an account? Login
          </Link>
        </div>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-neutral text-dark font-poppins">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="w-full p-3 bg-white border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <FcGoogle className="w-6 h-6" />
              <span className="font-poppins text-dark">Google</span>
            </button>

            <button className="w-full p-3 bg-white border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <FaGithub className="w-6 h-6" />
              <span className="font-poppins text-dark">GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
