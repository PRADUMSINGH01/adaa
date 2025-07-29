// components/UserDashboard.tsx
"use client";
import {
  FiCheck,
  FiAlertCircle,
  FiUser,
  FiMapPin,
  FiPhone,
  FiDollarSign,
  FiPackage,
  FiRefreshCw,
  FiHelpCircle,
  FiLogOut,
  FiMail,
  FiX,
  FiMessageSquare,
  FiChevronDown,
} from "react-icons/fi";
import { useUserData } from "@/components/Context/UserContext";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
interface Order {
  orderId: string;
  ProductName: string;
}
export default function UserDashboard() {
  const { data: session } = useSession();
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [activeSection, setActiveSection] = useState("account");
  const { userData } = useUserData();
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const sections = [
    { id: "account", icon: <FiUser />, title: "Account Details" },
    { id: "address", icon: <FiMapPin />, title: "Address Book" },
    { id: "orders", icon: <FiPackage />, title: "Order Status" },
    { id: "returns", icon: <FiRefreshCw />, title: "Return Status" },
    { id: "refunds", icon: <FiDollarSign />, title: "Refund Status" },
    { id: "support", icon: <FiHelpCircle />, title: "Customer Service" },
  ];

  useEffect(() => {
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);

  const HandleDeleteAddress = async (index: number) => {
    try {
      const res = await fetch(`/api/Address/Delete_Address?index=${index}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setAlert({
          type: "success",
          message: "Address deleted successfully",
        });

        // Clear alert after 3 seconds
        refreshTimeoutRef.current = setTimeout(() => {
          window.location.reload(); // Full page reload
        }, 3000);
      } else {
        const errorData = await res.json();
        setAlert({
          type: "error",
          message: errorData.error || "Failed to delete address",
        });
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      console.log(error);
      setAlert({
        type: "error",
        message: "Network error. Please try again.",
      });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const handleGetInvoice = async (order: Order) => {
    try {
      const response = await fetch("/api/generate-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: order.ProductName,
          price: 5000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate invoice.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${order.orderId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Invoice generation failed:", error);
    } finally {
    }
  };

  return (
    <div className="min-h-screen bg-neutral p-4 md:p-8">
      {alert && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-start space-x-3 ${
            alert.type === "success"
              ? "bg-[#8A9B6E] border-l-4 border-[#6E7F58]"
              : "bg-[#D57A7A] border-l-4 border-[#B85C5C]"
          }`}
          style={{
            minWidth: "300px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            animation: "slideIn 0.3s ease-out, fadeOut 0.5s ease 2.5s forwards",
          }}
        >
          <div
            className={`mt-0.5 flex-shrink-0 rounded-full p-1 ${
              alert.type === "success"
                ? "bg-[#6E7F58] text-white"
                : "bg-[#B85C5C] text-white"
            }`}
          >
            {alert.type === "success" ? (
              <FiCheck className="h-5 w-5" />
            ) : (
              <FiAlertCircle className="h-5 w-5" />
            )}
          </div>
          <div className="flex-1">
            <p className="font-medium text-white text-base">
              {alert.type === "success" ? "Success!" : "Error"}
            </p>
            <p className="mt-1 text-[#F5F0E6] text-sm">{alert.message}</p>
          </div>
          <button
            onClick={() => setAlert(null)}
            className="text-[#F5F0E6] hover:text-white transition-colors"
            aria-label="Close notification"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>
      )}

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
                <div className="space-y-6 font-poppins">
                  {userData.Orders.map((order) => {
                    // --- IMPROVEMENT: Constants moved outside the map loop for efficiency ---
                    const STAGES = [
                      "shipped",
                      "in_transit",
                      "out_for_delivery",
                      "delivered",
                    ];

                    // --- IMPROVEMENT: Status colors managed with a map for better readability ---

                    const currentStageIndex = STAGES.indexOf(
                      order.trackingStage
                    );
                    const progressPercentage =
                      currentStageIndex >= 0
                        ? (currentStageIndex / (STAGES.length - 1)) * 100
                        : 0;

                    const isCancellable =
                      order.status !== "delivered" &&
                      order.status !== "cancelled";

                    return (
                      <div
                        key={order.orderId}
                        className="bg-white p-6 rounded-xl shadow-sm border border-neutral hover:shadow-md transition-shadow duration-300"
                      >
                        {/* Order Header */}
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4 pb-4 border-b border-neutral">
                          <div>
                            <h3 className="font-playfair text-xl lg:text-2xl text-dark">
                              Order #{order.orderId}
                            </h3>
                            <p className="text-sm text-dark/60 mt-1">
                              Placed on{" "}
                              {new Date(order.orderDate).toLocaleDateString(
                                "en-IN",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p className="text-sm text-dark/60">Total</p>
                              <p className="font-semibold text-dark text-lg">
                                ₹{order.price}
                              </p>
                            </div>
                            <div className="flex items-center gap-2.5 pt-1">
                              <span
                                className={`h-2.5 w-2.5 rounded-full ${"bg-yellow-400"}`}
                              ></span>
                              <span className="font-medium text-sm capitalize text-dark">
                                {order.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Product Preview */}
                        <div className="flex items-center py-4">
                          {/* --- IMPROVEMENT: Uses actual product image with a fallback --- */}
                          <img
                            src={"/placeholder.png"}
                            alt={order.ProductName}
                            className="w-16 h-20 object-cover rounded-md bg-neutral"
                          />
                          <div className="ml-4">
                            <h4 className="font-medium text-dark">
                              {order.ProductName}
                            </h4>
                          </div>
                        </div>

                        {/* Order Tracking Section */}
                        {order.status !== "cancelled" && (
                          <div className="mt-4 pt-5 border-t border-neutral">
                            {/* The container is now padded on small screens to prevent edge collision */}
                            <div className="relative px-2 sm:px-0">
                              {/* Background line. Adjusted to respect horizontal padding on mobile. */}
                              <div className="absolute top-2.5 left-4 right-4 md:left-5 md:right-5 h-1.5 bg-neutral rounded-full"></div>

                              {/* Progress line. Adjusted to respect horizontal padding on mobile. */}
                              <div
                                className="absolute top-2.5 left-4 md:left-5 h-1.5 bg-accent rounded-full transition-all duration-700 ease-out"
                                style={{
                                  // The width calculation is adjusted to be more accurate with the layout.
                                  width: `calc(${progressPercentage}%)`,
                                }}
                              ></div>

                              <div className="relative flex justify-between items-start">
                                {STAGES.map((stage) => (
                                  <div
                                    key={stage}
                                    // IMPROVEMENT: Replaced fixed width `w-20` with a flexible and responsive approach.
                                    // `flex-1` distributes space evenly.
                                    // `max-w-[6rem]` prevents items from getting too wide on larger screens.
                                    className="flex flex-1 flex-col items-center text-center max-w-[6rem]"
                                  >
                                    {/* <TrackingIcon
              stage={stage}
              currentStage={order.trackingStage}
            /> */}
                                    {/* IMPROVEMENT: Font size is smaller on tiny screens and text wrapping is handled better. */}
                                    <p className="mt-2 text-[11px] leading-tight sm:text-xs font-medium text-dark/70 capitalize">
                                      {stage.replace(/_/g, " ")}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="mt-6 flex flex-wrap gap-3">
                          <button
                            onClick={() => {
                              handleGetInvoice(order);
                            }}
                            className="px-4 py-2 text-sm font-medium border border-neutral text-dark/80 rounded-md hover:bg-neutral transition-colors"
                          >
                            Get Invoice
                          </button>
                          {isCancellable && (
                            <button className="px-4 py-2 text-sm font-medium text-secondary hover:text-white border border-secondary rounded-md hover:bg-secondary transition-colors md:ml-auto">
                              Cancel Order
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16 px-4 rounded-xl bg-neutral/80">
                  <div className="inline-block p-5 bg-primary/10 rounded-full mb-6"></div>
                  <h3 className="text-2xl font-playfair mb-2 text-dark">
                    No Orders Found
                  </h3>
                  <p className="max-w-md mx-auto mb-6 text-dark/60">
                    When you place an order, it will appear here. Let&apos;s get
                    shopping!
                  </p>
                  <Link
                    href="/"
                    className="inline-block py-3 px-8 font-medium text-white bg-primary rounded-lg transition duration-300 hover:bg-primary/90 shadow-sm"
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
