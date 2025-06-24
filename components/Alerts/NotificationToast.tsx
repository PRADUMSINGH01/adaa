"use client";
import React, { useEffect, useState } from "react";
import { FiCheckCircle, FiX, FiInfo, FiAlertTriangle } from "react-icons/fi";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose?: () => void;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "bottom-center";
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  duration = 3000,
  onClose,
  position = "top-right",
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          onClose?.();
        }, 300);
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  // Apply your custom theme colors
  let bg = "bg-[#F5F0E6]";
  let text = "text-[#4A4A48]";
  let iconColor = "text-[#E07A5F]";
  let Icon = FiCheckCircle;

  if (type === "error") {
    bg = "bg-[#D57A7A]";
    text = "text-white";
    iconColor = "text-white";
    Icon = FiAlertTriangle;
  } else if (type === "info") {
    bg = "bg-[#8A9B6E]";
    text = "text-white";
    iconColor = "text-white";
    Icon = FiInfo;
  }

  let positionClass = "top-5 right-5";
  if (position === "top-left") positionClass = "top-5 left-5";
  else if (position === "bottom-right") positionClass = "bottom-5 right-5";
  else if (position === "bottom-left") positionClass = "bottom-5 left-5";
  else if (position === "bottom-center")
    positionClass = "bottom-5 left-1/2 transform -translate-x-1/2";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`
        fixed z-50 ${positionClass}
        ${bg} ${text}
        px-5 py-3 rounded-2xl shadow-lg
        flex items-center space-x-3 max-w-sm w-fit
        font-poppins
        transition-all duration-300 ease-out
        transform ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }
      `}
    >
      <Icon className={`w-6 h-6 ${iconColor}`} />
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(() => {
            onClose?.();
          }, 300);
        }}
        className="ml-2 focus:outline-none"
        aria-label="Close toast"
      >
        <FiX className={`w-5 h-5 ${iconColor}`} />
      </button>
    </div>
  );
};

export default Toast;
