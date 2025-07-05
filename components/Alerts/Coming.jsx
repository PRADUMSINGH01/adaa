import React, { useState } from "react";

const ComingSoon = () => {
  const [interestCount, setInterestCount] = useState(0);
  const [clicked, setClicked] = useState(false);

  const handleInterest = () => {
    if (!clicked) {
      setInterestCount((prev) => prev + 1);
      setClicked(true);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#F8F5F2" }}
    >
      <div
        className="max-w-2xl w-full text-center p-8 rounded-2xl shadow-xl"
        style={{ backgroundColor: "#F5F0E6" }}
      >
        {/* Heading */}
        <h1
          className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          style={{ color: "#4A4A48", fontFamily: '"Playfair Display", serif' }}
        >
          We're Launching Soon!
        </h1>

        {/* Description */}
        <p
          className="text-lg md:text-xl mb-10 max-w-lg mx-auto leading-relaxed"
          style={{ color: "#4A4A48", fontFamily: "Poppins, sans-serif" }}
        >
          Something amazing is in the works. Subscribe to be the first to know
          when we launch!
        </p>

        {/* Counter & Button */}
        <div className="flex flex-col items-center">
          <div
            className="text-5xl font-bold mb-6"
            style={{
              color: "#E07A5F",
              fontFamily: '"Playfair Display", serif',
            }}
          >
            {interestCount}
          </div>

          <button
            onClick={handleInterest}
            disabled={clicked}
            className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
              clicked ? "opacity-70 cursor-default" : "hover:shadow-lg"
            }`}
            style={{
              backgroundColor: clicked ? "#8A9B6E" : "#D57A7A",
              color: "#F8F5F2",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {clicked ? "Thank You!" : "Notify Me"}
          </button>

          <p
            className="mt-4 text-sm opacity-80"
            style={{ color: "#4A4A48", fontFamily: "Poppins, sans-serif" }}
          >
            {clicked
              ? "You'll be the first to know!"
              : "Click to show interest"}
          </p>
        </div>

        {/* Decorative elements */}
        <div className="mt-16 flex justify-center space-x-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="w-3 h-3 rounded-full opacity-60"
              style={{ backgroundColor: "#E07A5F" }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
