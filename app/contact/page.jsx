"use client";
import React from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const ContactUs = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-poppins text-dark">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary text-center">
        Contact Us
      </h2>

      <p className="text-center text-gray-700 mb-8">
        Have a question about your order or our products? Get in touch with us!
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <FiMail className="text-xl text-primary" />
            <span>
              Email:{" "}
              <a
                href="mailto:support@yourdomain.in"
                className="text-primary underline"
              >
                support@navaa.in
              </a>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FiPhone className="text-xl text-primary" />
            <span>
              Phone:{" "}
              <a href="tel:+917270854122" className="text-primary underline">
                +91 72708 54122
              </a>
            </span>
          </div>

          <div className="flex items-start gap-3">
            <FiMapPin className="text-xl text-primary mt-1" />
            <span>
              Address: <br />
              NAvaa.store
              <br />
              <br />
              Plot No. 57 Biluo Near Laal bagh Jaipur, Rajasthan, India
            </span>
          </div>
        </div>

        {/* Optional Contact Form */}
        <form className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-sm">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-primary"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-md focus:outline-primary"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              rows={4}
              placeholder="Type your message..."
              className="w-full px-4 py-2 border rounded-md focus:outline-primary"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
