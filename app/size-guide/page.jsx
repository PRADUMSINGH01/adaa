"use client";
import React from "react";

const SizeGuide = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 font-poppins text-dark">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary text-center">
        Women's Kurti Size Guide (in Inches)
      </h2>

      <p className="mb-6 text-center text-base text-gray-700">
        Use this size guide to find your perfect fit. Always measure your body
        and compare it with the chart below.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-primary text-white">
            <tr>
              <th className="py-3 px-4 text-left">Size</th>
              <th className="py-3 px-4 text-left">Bust</th>
              <th className="py-3 px-4 text-left">Waist</th>
              <th className="py-3 px-4 text-left">Hip</th>
              <th className="py-3 px-4 text-left">Shoulder</th>
              <th className="py-3 px-4 text-left">Kurti Length</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {[
              {
                size: "XS",
                bust: "32",
                waist: "26",
                hip: "34",
                shoulder: "13.5",
                length: "42",
              },
              {
                size: "S",
                bust: "34",
                waist: "28",
                hip: "36",
                shoulder: "14",
                length: "43",
              },
              {
                size: "M",
                bust: "36",
                waist: "30",
                hip: "38",
                shoulder: "14.5",
                length: "44",
              },
              {
                size: "L",
                bust: "38",
                waist: "32",
                hip: "40",
                shoulder: "15",
                length: "44.5",
              },
              {
                size: "XL",
                bust: "40",
                waist: "34",
                hip: "42",
                shoulder: "15.5",
                length: "45",
              },
              {
                size: "XXL",
                bust: "42",
                waist: "36",
                hip: "44",
                shoulder: "16",
                length: "45.5",
              },
            ].map((item, idx) => (
              <tr key={idx} className="border-t border-gray-200">
                <td className="py-3 px-4">{item.size}</td>
                <td className="py-3 px-4">{item.bust}"</td>
                <td className="py-3 px-4">{item.waist}"</td>
                <td className="py-3 px-4">{item.hip}"</td>
                <td className="py-3 px-4">{item.shoulder}"</td>
                <td className="py-3 px-4">{item.length}"</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 text-sm text-gray-600">
        <h3 className="font-semibold mb-2">📏 How to Measure:</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Bust:</strong> Measure around the fullest part of your
            chest.
          </li>
          <li>
            <strong>Waist:</strong> Measure around your natural waistline.
          </li>
          <li>
            <strong>Hip:</strong> Measure around the fullest part of your hips.
          </li>
          <li>
            <strong>Shoulder:</strong> Measure from one shoulder bone to the
            other across the back.
          </li>
          <li>
            <strong>Kurti Length:</strong> From shoulder to desired hemline.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SizeGuide;
