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
import { useState } from "react";

export default function UserDashboard() {
  const [activeSection, setActiveSection] = useState("account");
  const [orders] = useState([
    {
      id: 1,
      product: "Floral Print Kurta",
      status: "Delivered",
      date: "2024-03-15",
    },
    {
      id: 2,
      product: "Embroidered Silk Kurta",
      status: "Processing",
      date: "2024-03-20",
    },
  ]);

  const sections = [
    { id: "account", icon: <FiUser />, title: "Account Details" },
    { id: "address", icon: <FiMapPin />, title: "Address Book" },
    { id: "orders", icon: <FiPackage />, title: "Order Status" },
    { id: "returns", icon: <FiRefreshCw />, title: "Return Status" },
    { id: "refunds", icon: <FiDollarSign />, title: "Refund Status" },
    { id: "support", icon: <FiHelpCircle />, title: "Customer Service" },
  ];

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
              <button className="w-full flex items-center gap-3 p-3 rounded-lg font-poppins text-red-500 hover:bg-red-50 mt-4">
                <FiLogOut className="text-xl" />
                Logout
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
                      <p className="font-poppins text-dark">Priya Sharma</p>
                    </div>
                    <div>
                      <label className="block font-poppins text-secondary mb-2">
                        Email
                      </label>
                      <p className="font-poppins text-dark">
                        priya@example.com
                      </p>
                    </div>
                    <div>
                      <label className="block font-poppins text-secondary mb-2">
                        Phone Number
                      </label>
                      <p className="font-poppins text-dark">+91 98765 43210</p>
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
                <h2 className="font-playfair text-3xl font-bold text-dark mb-6">
                  Saved Addresses
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="font-poppins font-medium text-dark mb-4">
                      Home Address
                    </h3>
                    <p className="text-secondary">123 Kurta Lane</p>
                    <p className="text-secondary">Fashion District, Mumbai</p>
                    <p className="text-secondary">Maharashtra - 400001</p>
                    <div className="mt-4 flex gap-3">
                      <button className="text-primary font-poppins hover:text-primary/80">
                        Edit
                      </button>
                      <button className="text-red-500 font-poppins hover:text-red-600">
                        Remove
                      </button>
                    </div>
                  </div>
                  <button className="border-2 border-dashed border-primary text-primary p-6 rounded-xl hover:bg-light transition-colors">
                    Add New Address
                  </button>
                </div>
              </div>
            )}
            {activeSection === "orders" && (
              <div className="space-y-6">
                <h2 className="font-playfair text-3xl font-bold text-dark mb-6">
                  Order History
                </h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white p-6 rounded-xl shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-poppins font-medium text-dark">
                          {order.product}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-secondary">
                        <p>Order #{order.id}</p>
                        <p>{order.date}</p>
                      </div>
                      <button className="mt-4 text-primary font-poppins hover:text-primary/80">
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeSection === "returns" && (
              <div className="space-y-6">
                <h2 className="font-playfair text-3xl font-bold text-dark mb-6">
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
