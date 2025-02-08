import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { Button } from './Button';

const Header = ({ isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-red-600 shadow-md text-white py-6 fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link href={route("home-page")} className="flex items-center ml-4">
          <img
            src="image/CarLogo.webp"
            alt="Logo"
            className="h-12 w-12 mr-4"
          />
          <h1 className="text-xl font-bold">Car Sale Portal</h1>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:block flex-grow">
          <ul className="flex justify-center space-x-6 pr-4">
            <li>
              <Link
                href={route("home-page")}
                className="relative group text-white hover:text-gray-300 transition-colors"
              >
                Home
                <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                href={route('carlist-page')}
                className="relative group text-white hover:text-gray-300 transition-colors"
              >
                Car List
                <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                href={route('about-us-page')}
                className="relative group text-white hover:text-gray-300 transition-colors"
              >
                About Us
                <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                href={route('contact-us-page')}
                className="relative group text-white hover:text-gray-300 transition-colors"
              >
                Contact Us
                <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="hidden md:flex space-x-6 pr-8">
          {/* Action Links */}
          {!isLoggedIn ? (
            <>
              <Link
                href={route('login')}
                className="relative group text-white hover:text-gray-300 transition-colors"
              >
                Log In
                <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href={route('register')}
                className="relative group text-white hover:text-gray-300 transition-colors"
              >
                Register
                <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </>

          ) : (
            <Link
              href={route('dashboard')}
              className="relative group text-white hover:text-gray-300 transition-colors"
            >
              Dashboard
              <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          )}

        </div>
        {/* Mobile Menu Button */}
        <Button
          className="block md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute mt-4 bg-red-500">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <a
                href="/"
                className="block text-white hover:bg-red-400 p-2 rounded"
              >
                Home
              </a>
            </li>
            <li>
              <Link
                href={route('carlist-page')}
                className="block text-white hover:bg-red-400 p-2 rounded"
              >
                Car List
              </Link>
            </li>
            <li>
              <Link
                href={route('about-us-page')}
                className="block text-white hover:bg-red-400 p-2 rounded"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href={route('contact-us-page')}
                className="block text-white hover:bg-red-400 p-2 rounded"
              >
                Contact us
              </Link>
            </li>
            {!isLoggedIn ? (
              <>
                <li className="mt-4">
                  <Link
                    href={route('login')}
                    className="block text-white hover:bg-red-400 p-2 rounded"
                  >
                    Log In
                  </Link>
                </li>
                <li>
                  <Link
                    href={route('register')}
                    className="block text-white hover:bg-red-400 p-2 rounded"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href={route('dashboard')}
                    className="block text-white hover:bg-red-400 p-2 rounded"
                  >
                    Dashboard
                  </Link>
                </li>
              </>
            )}

          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
