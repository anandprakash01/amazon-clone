import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-amazon_blue mb-8">Privacy Policy</h1>
        
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-amazon_blue mb-4">Information We Collect</h2>
            <div className="space-y-4 text-gray-600">
              <p>We collect information to provide better services to our users:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Personal information (name, email address, phone number)</li>
                <li>Shipping and billing addresses</li>
                <li>Payment information</li>
                <li>Purchase history and preferences</li>
                <li>Device information and logs</li>
              </ul>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-amazon_blue mb-4">How We Use Your Information</h2>
            <div className="space-y-4 text-gray-600">
              <p>Your information helps us to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Process your orders and payments</li>
                <li>Communicate about your orders and products</li>
                <li>Update you about new features and products</li>
                <li>Improve our services and prevent fraud</li>
                <li>Provide customer support</li>
              </ul>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-amazon_blue mb-4">Information Security</h2>
            <div className="space-y-4 text-gray-600">
              <p>We implement various security measures to maintain the safety of your personal information:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Secure SSL encryption for all transactions</li>
                <li>Regular security assessments</li>
                <li>Limited access to personal information</li>
                <li>Industry-standard data protection protocols</li>
              </ul>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-amazon_blue mb-4">Your Choices</h2>
            <div className="space-y-4 text-gray-600">
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Access your personal information</li>
                <li>Update or correct your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Delete your account</li>
              </ul>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-amazon_blue mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 space-y-2 text-gray-600">
              <p>Email: privacy@amazonclone.com</p>
              <p>Phone: 1-800-PRIVACY</p>
              <p>Address: 123 Privacy Street, Security City, 12345</p>
            </div>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 rounded-md font-semibold"
          >
            Return to Home
          </Link>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;