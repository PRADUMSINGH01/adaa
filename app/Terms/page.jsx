"use client";
import React from "react";

const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-dark font-poppins">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        Terms and Conditions
      </h1>

      <p className="mb-4">
        Welcome to our website. These terms and conditions outline the rules and
        regulations for the use of our platform, which is operated for selling
        Kurtis across India.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        1. Acceptance of Terms
      </h2>
      <p className="mb-4">
        By accessing or using our website, you agree to be bound by these terms
        and conditions. If you do not agree with any part of these terms, please
        do not use our website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Products</h2>
      <p className="mb-4">
        We offer a range of Kurtis for sale. All product descriptions and images
        are provided for informational purposes only. We try to ensure accuracy,
        but we do not guarantee complete correctness of details.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Orders & Payments</h2>
      <p className="mb-4">
        Once you place an order, you will receive an email confirmation. All
        payments must be completed online through our trusted payment gateways.
        We reserve the right to cancel any order due to unforeseen issues or
        availability.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        4. Shipping & Delivery
      </h2>
      <p className="mb-4">
        We ship Kurtis across India. Delivery timelines may vary depending on
        your location. We are not responsible for delays caused by courier
        companies or natural circumstances.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Returns & Refunds</h2>
      <p className="mb-4">
        Please refer to our{" "}
        <a href="/return-policy" className="text-primary underline">
          Return Policy
        </a>{" "}
        for details on returns and refunds. We only accept returns for damaged
        or incorrect items delivered.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. User Conduct</h2>
      <p className="mb-4">
        Users are prohibited from using this site for any unlawful purpose or
        violating any local, national, or international law. We reserve the
        right to terminate user accounts for misconduct.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        7. Intellectual Property
      </h2>
      <p className="mb-4">
        All content on this website, including images, text, logos, and designs,
        is the property of our business and is protected by copyright laws.
        Unauthorized use is strictly prohibited.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Changes to Terms</h2>
      <p className="mb-4">
        We may update these terms from time to time. It is your responsibility
        to review this page periodically for any changes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Contact Us</h2>
      <p>
        If you have any questions about our Terms and Conditions, please contact
        us at{" "}
        <a href="mailto:support@navaa.in" className="text-primary underline">
          support@yourdomain.in
        </a>
        .
      </p>
    </div>
  );
};

export default TermsPage;
