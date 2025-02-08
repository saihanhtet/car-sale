import GuestLayout from "@/Layouts/GuestLayout";
import React from "react";

const ContactUs = ({ canLogin, canRegister, isLoggedIn }) => {
  return (
    <GuestLayout canLogin={canLogin} canRegister={canRegister} isLoggedIn={isLoggedIn}>
      {/* Hero Section */}
      <section className="w-full bg-black px-4 py-12 md:py-32 relative">
        <div className="absolute inset-0">
          <img
            src="image/ContactusCar.jpg"
            alt="Contact Us Background"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto relative text-center">
          <h1 className="text-3xl md:text-4xl text-white font-bold mb-4">Contact Us</h1>
          <p className="text-white text-base md:text-lg mb-6">
            We're here to help! Reach out to us with any questions or inquiries.
          </p>
          <a
            href="#contact-details"
            className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-500"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Contact Details Section */}
      <section id="contact-details" className="bg-gray-900 py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Contact Information */}
          <div className="flex flex-col md:flex-row items-center mb-16">
            <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0 text-center">
              <img
                src="image/Car2.jpg"
                alt="Contact Information"
                className="w-full h-auto max-w-xs mx-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                How to Reach Us
              </h2>
              <p className="text-gray-300">
                You can contact us through the following methods:
              </p>
              <ul className="text-gray-300 mt-4 space-y-2">
                <li>Email: support@usedcarsportal.com</li>
                <li>Phone: +1 (800) 123-4567</li>
                <li>Address: 123 Car Lane, Auto City, AC 98765</li>
              </ul>
            </div>
          </div>

          {/* Inquiry Form Section */}
          <div className="bg-gray-800 rounded-lg p-6 md:p-8 text-center max-w-md md:max-w-lg mx-auto mb-20">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              Send Us a Message
            </h2>
            <form className="text-gray-300">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full md:w-4/5 p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full md:w-4/5 p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Your Message"
                  className="w-full md:w-4/5 p-3 rounded-lg bg-gray-700 text-white focus:outline-none h-32"
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-500"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 py-8 text-center">
        <p className="text-gray-300 text-sm md:text-base">
          We look forward to hearing from you. Your feedback helps us improve our platform!
        </p>
      </footer>
    </GuestLayout>
  );
};

export default ContactUs;
