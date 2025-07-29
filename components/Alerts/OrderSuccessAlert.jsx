import React from "react";
import Link from "next/link";

// A more complex, animatable checkmark icon component.
const AnimatedCheckIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 52 52"
  >
    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
    <path
      className="checkmark__check"
      fill="none"
      d="M14.1 27.2l7.1 7.2 16.7-16.8"
    />
  </svg>
);

/**
 * A reusable alert component to confirm successful order placement.
 * @param {object} props - The component props.
 * @param {string} props.onViewOrders - The URL for the "View Orders" link.
 * @param {string} props.onContinueShopping - The URL for the "Continue Shopping" link.
 */
const OrderSuccessAlert = ({ onViewOrders, onContinueShopping }) => {
  return (
    // Main container with a subtle background and entrance animation
    <div className="fixed inset-0 bg-dark/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-light w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-neutral p-8 text-center transform animate-scale-in">
        {/* Animated Success Icon */}
        <div className="mx-auto mb-6">
          <AnimatedCheckIcon className="checkmark" />
        </div>

        {/* Content with staggered animations */}
        <h1
          className="font-playfair text-3xl font-bold text-dark mb-2 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          Order Placed!
        </h1>
        <p
          className="font-poppins text-dark/70 max-w-sm mx-auto mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          Thank you! Your order has been confirmed. You will receive an email
          with the details shortly.
        </p>

        {/* Action Buttons with animation */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <Link
            href={onViewOrders}
            className="w-full sm:w-auto font-poppins font-medium text-white bg-dark px-8 py-3 rounded-lg hover:bg-dark/80 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View My Orders
          </Link>
          <Link
            href={onContinueShopping}
            className="w-full sm:w-auto font-poppins font-medium text-primary border-2 border-primary/50 px-8 py-[10px] rounded-lg hover:bg-primary/10 hover:border-primary transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* CSS for all animations */}
      <style jsx global>{`
        .checkmark {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          display: block;
          stroke-width: 3;
          stroke: #fff;
          stroke-miterlimit: 10;
          margin: auto;
          box-shadow: inset 0px 0px 0px #8a9b6e;
          animation: fill 0.4s ease-in-out 0.4s forwards,
            scale 0.3s ease-in-out 0.9s both;
        }
        .checkmark__circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-width: 3;
          stroke-miterlimit: 10;
          stroke: #8a9b6e;
          fill: none;
          animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        .checkmark__check {
          transform-origin: 50% 50%;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }
        @keyframes stroke {
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes scale {
          0%,
          100% {
            transform: none;
          }
          50% {
            transform: scale3d(1.1, 1.1, 1);
          }
        }
        @keyframes fill {
          100% {
            box-shadow: inset 0px 0px 0px 60px #8a9b6e;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scale-in {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.4s ease-out 0.1s forwards;
        }
        .animate-fade-in-up {
          opacity: 0; /* Start hidden */
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default OrderSuccessAlert;
