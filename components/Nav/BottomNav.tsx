import {
  FiUser,
  FiStar,
  FiHeadphones,
  FiRefreshCw,
  FiDollarSign,
} from "react-icons/fi";
import Link from "next/link";
const BottomNan = () => {
  return (
    // Add this inside your Navbar component or create a separate component
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-neutral border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-3">
        {/* Profile */}
        <Link
          href="/User"
          className="flex flex-col items-center text-dark hover:text-primary transition-colors"
        >
          <FiUser className="w-6 h-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>

        {/* New Arrivals */}
        <Link
          href="/New"
          className="flex flex-col items-center text-dark hover:text-primary transition-colors"
        >
          <FiStar className="w-6 h-6" />
          <span className="text-xs mt-1">New</span>
        </Link>

        {/* Customer Care */}
        <Link
          href="User/#Customer-support"
          className="flex flex-col items-center text-dark hover:text-primary transition-colors"
        >
          <FiHeadphones className="w-6 h-6" />
          <span className="text-xs mt-1">Support</span>
        </Link>

        {/* Refund & Return */}
        <Link
          href="/User/#Returns"
          className="flex flex-col items-center text-dark hover:text-primary transition-colors"
        >
          <div className="relative">
            <FiRefreshCw className="w-6 h-6" />
            <FiDollarSign className="w-3 h-3 absolute -top-1 -right-1 bg-accent text-white rounded-full p-0.5" />
          </div>
          <span className="text-xs mt-1">Returns</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNan;
