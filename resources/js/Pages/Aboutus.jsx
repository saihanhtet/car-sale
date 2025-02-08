import GuestLayout from "@/Layouts/GuestLayout";
import React from "react";

const AboutUs = ({ canLogin, canRegister, isLoggedIn }) => {
  return (
    <GuestLayout canLogin={canLogin} canRegister={canRegister} isLoggedIn={isLoggedIn}>
      {/* Hero Section */}
      <section className="w-full bg-black px-auto m-0 flex justify-between items-center py-12 md:py-32 relative">
        <div className="absolute inset-0">
          <img
            src="image/Aboutus.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto relative text-center">
          <h1 className="text-4xl text-white font-bold mb-4">About Us</h1>
          <p className="text-white text-lg mb-6">
            Learn about our mission, vision, and why we are the best platform for buying
            and selling used cars.
          </p>
          <a
            href="#details"
            className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-500"
          >
            Explore More
          </a>
        </div>
      </section>

      {/* About Details Section */}
      <section id="details" className="bg-gray-900 py-16">
        <div className="container mx-auto">
          {/* Why Choose Us Section */}
          <div className="bg-gray-800 rounded-lg p-8 text-center mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Why Choose Us?</h2>
            <p className="text-gray-300">
              Our platform leverages cutting-edge technology and best practices to
              ensure a smooth experience. From robust search options to secure
              transactions, we have everything you need to make informed decisions while
              trading vehicles.
            </p>
          </div>

          {/* Our Mission Section */}
          <div className="flex flex-col md:flex-row items-center mb-12">
            <div className="w-full md:w-1/2 px-6 text-center">
              <img
                src="image/MissionCar.jpg"
                alt="Our Mission"
                className="w-full h-auto max-w-sm mx-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2 px-6 text-center md:text-left">
              <h2 className="text-3xl font-semibold text-white mb-4">Our Mission</h2>
              <p className="text-gray-300">
                Our mission is to connect car buyers and sellers through a trustworthy and
                easy-to-use platform. By incorporating advanced features and prioritizing user
                satisfaction, we aim to simplify the car trading process while ensuring
                security and transparency.
              </p>
            </div>
          </div>

          {/* Our Vision Section */}
          <div className="flex flex-col md:flex-row items-center mb-12">
            <div className="w-full md:w-1/2 px-6 text-center md:text-right">
              <h2 className="text-3xl font-semibold text-white mb-4">Our Vision</h2>
              <p className="text-gray-300">
                We envision a world where buying and selling used cars is as simple as
                a few clicks. Our goal is to become the go-to online marketplace for car
                trading by offering a secure, transparent, and user-centric platform.
              </p>
            </div>
            <div className="w-full md:w-1/2 px-6 text-center">
              <img
                src="image/VisionCar.jpg"
                alt="Our Vision"
                className="w-full h-auto max-w-sm mx-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 py-8 text-center">
        <p className="text-gray-300">
          Thank you for choosing our platform. Together, let’s redefine the car trading
          experience.
        </p>
      </footer>
    </GuestLayout>
  );
};

export default AboutUs;
