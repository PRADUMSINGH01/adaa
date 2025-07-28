"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoClose, IoHeart } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import addToWishlist from "@/server/AddWishlist";
import { wishlist } from "@/server/types";

interface AlertProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export const WishlistAlert = ({
  message,
  type = "success",
  onClose,
}: AlertProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const accentColor = type === "success" ? "accent" : "secondary";
  const titleText = type === "success" ? "Added to Wishlist" : "Error Occurred";
  const IconElement = type === "success" ? IoHeart : IoClose;

  return (
    <div
      className={`fixed top-6 right-6 w-80 bg-light backdrop-blur-xs shadow-2xl border-l-4 border-${accentColor} rounded-2xl overflow-hidden transform transition duration-300 ease-out hover:-translate-y-1 hover:shadow-xl z-50`}
    >
      <div className={`flex items-center px-4 py-3 bg-${accentColor}/10`}>
        <IconElement
          className={`w-6 h-6 text-${accentColor} animate-pulse mr-3`}
        />
        <div className="flex-1">
          <p className="font-playfair text-base text-dark font-semibold">
            {titleText}
          </p>
          <p className="text-sm text-dark/75 mt-1">{message}</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close alert"
          className="ml-2 p-1 rounded-full hover:bg-dark/10 transition"
        >
          <IoClose className="w-5 h-5 text-dark" />
        </button>
      </div>
    </div>
  );
};

interface WishListButtonProps {
  product: wishlist;
}

const WishListButton = ({ product }: WishListButtonProps) => {
  const [alertMsg, setAlertMsg] = useState<string>("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [liked, setLiked] = useState<boolean>(false);
  const IconButton = liked ? IoHeart : FiHeart;

  const handleClick = async () => {
    setLiked(true);
    try {
      const res = await addToWishlist(product);
      if (res?.success) {
        setAlertType("success");
        setAlertMsg(res.msg);
      } else {
        setAlertType("error");
      }
    } catch (err: unknown) {
      setLiked(false);
      setAlertType("error");

      if (err instanceof Error) {
        setAlertMsg(err.message);
      } else {
        setAlertMsg("Something went wrong. Please try again.");
      }
    }
  };

  const clearAlert = () => setAlertMsg("");

  return (
    <div className="z-60">
      <button
        onClick={handleClick}
        aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        className="bg-white/50 rounded-full cursor-pointer p-2 hover:bg-primary z-50"
      >
        <IconButton className="h-5 w-5  " />
      </button>

      {alertMsg &&
        createPortal(
          <WishlistAlert
            message={alertMsg}
            type={alertType}
            onClose={clearAlert}
          />,
          document.body
        )}
    </div>
  );
};

export default WishListButton;
