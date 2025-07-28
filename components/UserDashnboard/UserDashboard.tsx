// components/UserDashboard.tsx
"use client";
import {
  FiUser,
  FiMapPin,
  FiPhone,
  FiDollarSign,
  FiPackage,
  FiRefreshCw,
  FiHelpCircle,
  FiLogOut,
  FiMail,
  FiMessageSquare,
  FiChevronDown,
} from "react-icons/fi";
import { useUserData } from "@/components/Context/UserContext";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function UserDashboard() {
  const { data: session } = useSession();
  const [activeSection, setActiveSection] = useState("account");
  const { userData } = useUserData();

  const sections = [
    { id: "account", icon: <FiUser />, title: "Account Details" },
    { id: "address", icon: <FiMapPin />, title: "Address Book" },
    { id: "orders", icon: <FiPackage />, title: "Order Status" },
    { id: "returns", icon: <FiRefreshCw />, title: "Return Status" },
    { id: "refunds", icon: <FiDollarSign />, title: "Refund Status" },
    { id: "support", icon: <FiHelpCircle />, title: "Customer Service" },
  ];

  const HandleDeleteAddress = async (index: number) => {
    await fetch(`/api/Address/Delete_Address?index=${index}`, {
      method: "DELETE",
    });
  };

  return (
    <div className="min-h-screen bg-neutral p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-light rounded-xl shadow-lg overflow-hidden">
        {/* Mobile Navigation */}
        <div className="md:hidden p-4 border-b">
          <select
            value={activeSection}
            onChange={(e) => setActiveSection(e.target.value)}
            className="w-full p-3 rounded-lg bg-white font-poppins focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Desktop Navigation */}
          <div className="md:w-64 bg-white md:border-r">
            <nav className="p-4 space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg font-poppins transition-colors ${
                    activeSection === section.id
                      ? "bg-primary text-neutral"
                      : "hover:bg-light"
                  }`}
                >
                  <span className="text-xl">{section.icon}</span>
                  {section.title}
                </button>
              ))}
              <button
                onClick={() => signOut()}
                className="w-full flex items-center gap-3 rounded-lg p-2 text-sm transition-colors hover:bg-primary/5"
                role="menuitem"
              >
                <FiLogOut className="h-4 w-4 text-accent shrink-0" />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 md:p-8">
            {activeSection === "account" && (
              <div className="space-y-6">
                <h2 className="font-playfair text-3xl font-bold text-dark mb-6">
                  Account Details
                </h2>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-poppins text-secondary mb-2">
                        Full Name
                      </label>
                      <p className="font-poppins text-dark">
                        {" "}
                        {session?.user.name}
                      </p>
                    </div>
                    <div>
                      <label className="block font-poppins text-secondary mb-2">
                        Email
                      </label>
                      <p className="font-poppins text-dark">
                        {session?.user.email}
                      </p>
                    </div>
                    <div>
                      <label className="block font-poppins text-secondary mb-2">
                        Phone Number
                      </label>
                      <p className="font-poppins text-dark">Hidden</p>
                    </div>
                    <div>
                      <label className="block font-poppins text-secondary mb-2">
                        Joined Date
                      </label>
                      <p className="font-poppins text-dark">15 January 2023</p>
                    </div>
                  </div>
                  <button className="mt-6 bg-accent text-white px-6 py-2 rounded-lg font-poppins hover:bg-accent/90">
                    Edit Profile
                  </button>
                </div>
              </div>
            )}

            {activeSection === "address" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="font-playfair text-lg md:text-3xl font-bold text-dark ">
                    Saved Addresses
                  </h2>

                  <Link
                    href="/User/Add-Address"
                    className="flex py-4 px-2 text-sm md:w-3xl  justify-center font-poppins font-medium rounded-lg transition duration-300"
                    style={{
                      backgroundColor: "#E07A5F",
                      color: "#F8F5F2",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#D57A7A")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#E07A5F")
                    }
                  >
                    Add New Address
                  </Link>
                </div>

                {userData &&
                userData?.Address &&
                userData.Address.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {userData.Address.map((item, index) => (
                      <div
                        key={index}
                        className="relative bg-white rounded-xl shadow-sm border border-[#F5F0E6] overflow-hidden transition-all duration-300 hover:shadow-md"
                      >
                        <div className="p-6">
                          {/* Address Type Badge */}

                          <h3
                            className="font-playfair text-xl font-bold mb-4"
                            style={{ color: "#4A4A48" }}
                          >
                            {item.name}
                          </h3>

                          <div
                            className="space-y-2 font-poppins"
                            style={{ color: "#4A4A48" }}
                          >
                            <p className="flex items-start">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="#8A9B6E"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              <span>{item.Address}</span>
                            </p>

                            <p className="flex items-start">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="#8A9B6E"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                              </svg>
                              <span>{item.phone || "Phone not provided"}</span>
                            </p>

                            <p className="flex">
                              <span className="font-medium min-w-[80px]">
                                City:
                              </span>
                              <span>{item.city}</span>
                            </p>

                            <p className="flex">
                              <span className="font-medium min-w-[80px]">
                                Pincode:
                              </span>
                              <span>{item.pincode}</span>
                            </p>

                            {item.landmark && (
                              <p className="flex">
                                <span className="font-medium min-w-[90px]">
                                  Landmark:
                                </span>
                                <span>{item.landmark}</span>
                              </p>
                            )}
                          </div>

                          <div className="mt-6 flex gap-3 border-t border-[#F5F0E6] pt-4">
                            <button
                              className="font-poppins text-sm px-4 py-2 rounded-lg transition-colors"
                              style={{
                                backgroundColor: "#F8F5F2",
                                color: "#4A4A48",
                                border: "1px solid #D57A7A",
                              }}
                              onMouseOver={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "#F5F0E6")
                              }
                              onMouseOut={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "#F8F5F2")
                              }
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => HandleDeleteAddress(index)}
                              className="font-poppins text-sm px-4 py-2 rounded-lg transition-colors flex items-center"
                              style={{
                                backgroundColor: "#F8F5F2",
                                color: "#D57A7A",
                                border: "1px solid #D57A7A",
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  "#F5F0E6";
                                e.currentTarget.style.color = "#C06A6A";
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  "#F8F5F2";
                                e.currentTarget.style.color = "#D57A7A";
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className="text-center py-12 rounded-xl"
                    style={{ backgroundColor: "#F5F0E6" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 mx-auto mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#4A4A48"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>

                    <h3
                      className="text-xl font-semibold mb-2"
                      style={{
                        fontFamily: '"Playfair Display", serif',
                        color: "#4A4A48",
                      }}
                    >
                      No Saved Addresses
                    </h3>

                    <p
                      className="max-w-md mx-auto mb-6"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        color: "#4A4A48",
                      }}
                    >
                      You haven&apos;t saved any addresses yet. Add your first
                      address to get started.
                    </p>

                    <Link
                      href="/User/Add-Address"
                      className="inline-block py-3 px-8 font-poppins font-medium rounded-lg transition duration-300"
                      style={{
                        backgroundColor: "#E07A5F",
                        color: "#F8F5F2",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#D57A7A")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "#E07A5F")
                      }
                    >
                      Add New Address
                    </Link>
                  </div>
                )}
              </div>
            )}
            {activeSection === "orders" &&
              (userData.Orders && userData.Orders.length > 0 ? (
                <div className="space-y-6">
                  {userData.Orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                    >
                      {/* Order Header */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                        <div>
                          <h3 className="font-poppins font-semibold text-gray-900 text-lg">
                            Order #{order.orderNumber}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Placed on{" "}
                            {new Date(order.orderDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-700">
                              Total:
                            </span>
                            <span className="font-semibold text-gray-900">
                              ${order.price}
                            </span>
                          </div>

                          <span
                            className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium capitalize ${
                              order.status === "delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "processing"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>

                      {/* Order Tracking Section */}
                      {order.status !== "cancelled" && (
                        <div className="mt-6 pt-5 border-t border-gray-100">
                          <h4 className="text-base font-poppins font-medium text-gray-900 mb-5">
                            Order Tracking
                          </h4>

                          <div className="relative">
                            {/* Progress Line */}
                            <div className="absolute top-3 left-0 right-0 h-1 bg-gray-200 z-0"></div>

                            <div className="relative z-10 grid grid-cols-4">
                              {[
                                {
                                  stage: "shipped",
                                  label: "Shipped from Jaipur",
                                },
                                { stage: "in_transit", label: "Reached Delhi" },
                                {
                                  stage: "out_for_delivery",
                                  label: "Out for Delivery",
                                },
                                { stage: "delivered", label: "Delivered" },
                              ].map((step, index) => {
                                const isCurrent =
                                  order.trackingStage === step.stage;
                                const isCompleted =
                                  order.trackingStage === "delivered" ||
                                  index <
                                    [
                                      "shipped",
                                      "in_transit",
                                      "out_for_delivery",
                                      "delivered",
                                    ].indexOf(order.trackingStage);

                                return (
                                  <div
                                    key={step.stage}
                                    className="flex flex-col items-center"
                                  >
                                    <div
                                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        isCompleted
                                          ? "bg-green-500 shadow-sm"
                                          : isCurrent
                                          ? "border-2 border-green-500 bg-white shadow-sm"
                                          : "bg-gray-200"
                                      }`}
                                    >
                                      {isCompleted ? (
                                        <svg
                                          className="h-3.5 w-3.5 text-white"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                          />
                                        </svg>
                                      ) : null}
                                    </div>
                                    <div className="mt-3 text-center max-w-[90px]">
                                      <p
                                        className={`text-xs font-poppins font-medium ${
                                          isCompleted || isCurrent
                                            ? "text-gray-900"
                                            : "text-gray-400"
                                        }`}
                                      >
                                        {step.label}
                                      </p>
                                      {isCurrent && (
                                        <div className="mt-1.5 flex justify-center">
                                          <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-ping"></div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Status Message */}
                          <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-100">
                            <div className="flex items-start">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <div>
                                <p className="text-sm font-poppins text-blue-800">
                                  {order.trackingStage === "shipped" &&
                                    "Your order has shipped from Jaipur warehouse. Estimated delivery: 3-5 business days"}

                                  {order.trackingStage === "in_transit" &&
                                    "Package arrived at Delhi distribution center. Next stop: your local facility"}

                                  {order.trackingStage === "out_for_delivery" &&
                                    "Driver is on the way with your package. Expected delivery today before 8 PM"}

                                  {order.trackingStage === "delivered" &&
                                    `Package was delivered successfully on ${new Date().toLocaleDateString()}`}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 px-4 rounded-xl bg-gray-50">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mx-auto flex items-center justify-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 font-playfair text-gray-800">
                    No Orders Found
                  </h3>
                  <p className="max-w-md mx-auto mb-6 font-poppins text-gray-600">
                    You haven&apos;t placed any orders yet. Explore our
                    collections and make your first purchase!
                  </p>
                  <Link
                    href="/"
                    className="inline-block py-3 px-8 font-poppins font-medium rounded-lg transition duration-300"
                    style={{
                      backgroundColor: "#E07A5F",
                      color: "#F8F5F2",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#D57A7A")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#E07A5F")
                    }
                  >
                    Start Shopping
                  </Link>
                </div>
              ))}

            {activeSection === "returns" && (
              <div className="space-y-6">
                <h2
                  className="font-playfair text-3xl font-bold text-dark mb-6"
                  id="returns"
                >
                  Return & Refund Status
                </h2>
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-poppins font-medium text-dark">
                          Floral Print Kurta
                        </h3>
                        <p className="text-secondary text-sm">
                          Return ID: #RTN12345
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : status === "Processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-secondary">
                      <div>
                        <p className="text-xs">Request Date</p>
                        <p className="font-medium">2024-03-18</p>
                      </div>
                      <div>
                        <p className="text-xs">Pickup Date</p>
                        <p className="font-medium">2024-03-20</p>
                      </div>
                      <div>
                        <p className="text-xs">Refund Amount</p>
                        <p className="font-medium text-accent">₹2,499</p>
                      </div>
                      <div>
                        <p className="text-xs">Expected By</p>
                        <p className="font-medium">2024-04-05</p>
                      </div>
                    </div>
                    <button className="mt-4 text-primary font-poppins hover:text-primary/80">
                      View Detailed Timeline
                    </button>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-poppins font-medium text-dark">
                          Silk Embroidered Kurta
                        </h3>
                        <p className="text-secondary text-sm">
                          Return ID: #RTN12346
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                        In Transit
                      </span>
                    </div>
                    <div className="text-secondary">
                      <p className="mb-2">
                        Your return is currently being transported to our
                        warehouse
                      </p>
                      <div className="w-full bg-light rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full w-1/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "support" && (
              <div className="space-y-6">
                <h2 className="font-playfair text-3xl font-bold text-dark mb-6">
                  Customer Support
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Contact Form */}
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="font-poppins font-medium text-dark mb-4">
                      Contact Us
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block font-poppins text-dark mb-2">
                          Issue Type
                        </label>
                        <select className="w-full p-3 border rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary">
                          <option>Order Issues</option>
                          <option>Returns & Refunds</option>
                          <option>Product Questions</option>
                          <option>Account Help</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-poppins text-dark mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 border rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter subject"
                        />
                      </div>

                      <div>
                        <label className="block font-poppins text-dark mb-2">
                          Description
                        </label>
                        <textarea
                          rows={4}
                          className="w-full p-3 border rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Describe your issue in detail"
                        ></textarea>
                      </div>

                      <div>
                        <label className="block font-poppins text-dark mb-2">
                          Attachments
                        </label>
                        <div className="border-2 border-dashed border-primary rounded-lg p-4 text-center">
                          <p className="text-secondary">
                            Drag files here or click to upload
                          </p>
                          <p className="text-xs text-secondary mt-1">
                            Max file size: 5MB
                          </p>
                        </div>
                      </div>

                      <button className="w-full bg-primary text-neutral py-3 rounded-lg font-poppins hover:bg-primary/90 transition-colors">
                        Submit Request
                      </button>
                    </form>
                  </div>

                  {/* Support Options */}
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <h3 className="font-poppins font-medium text-dark mb-4">
                        Quick Help
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 hover:bg-light rounded-lg">
                          <FiPhone className="text-primary" />
                          <div>
                            <p className="font-poppins text-dark">
                              24/7 Support Line
                            </p>
                            <p className="text-secondary">+91 12345 67890</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 hover:bg-light rounded-lg">
                          <FiMail className="text-primary" />
                          <div>
                            <p className="font-poppins text-dark">
                              Email Support
                            </p>
                            <p className="text-secondary">
                              support@kurtikraft.com
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 hover:bg-light rounded-lg">
                          <FiMessageSquare className="text-primary" />
                          <div>
                            <p className="font-poppins text-dark">Live Chat</p>
                            <p className="text-secondary">
                              Available 9AM - 9PM IST
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <h3 className="font-poppins font-medium text-dark mb-4">
                        Common Questions
                      </h3>
                      <div className="space-y-3">
                        <div className="border-b pb-3">
                          <button className="flex items-center justify-between w-full">
                            <span className="font-poppins text-dark">
                              How long do returns take?
                            </span>
                            <FiChevronDown className="text-primary" />
                          </button>
                          <p className="text-secondary pt-2 hidden">
                            Returns are typically processed within 5-7 business
                            days after we receive your package.
                          </p>
                        </div>
                        <div className="border-b pb-3">
                          <button className="flex items-center justify-between w-full">
                            <span className="font-poppins text-dark">
                              What&apos;s your exchange policy?
                            </span>
                            <FiChevronDown className="text-primary" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
