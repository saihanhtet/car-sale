import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import NavLink from "./NavLink";

const Navbar = ({ canLogin, canRegister, isLoggedIn = false }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const isHomePage = route().current("home-page");

    const menuItems = [
        { name: "Home", href: new URL(route("home-page")).pathname, link: "home-page" },
        { name: "Car Listings", href: new URL(route("carlist-page")).pathname, link: "car-listing-page" },
        { name: "About Us", href: new URL(route("about-us-page")).pathname, link: "about-us-page" },
        { name: "Contact Us", href: new URL(route("contact-us-page")).pathname, link: "contact-us-page" },
    ];

    const authItems = [
        { name: "Log In", href: new URL(route("login")).pathname, link: "login" },
        { name: "Register", href: new URL(route("register")).pathname, link: "register" },
    ];

    useEffect(() => {
        if (isHomePage) {
            const handleScroll = () => {
                setIsScrolled(window.scrollY > 50);
            };

            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        } else {
            setIsScrolled(true);
        }
    }, [isHomePage]);

    return (
        <nav
            className={`fixed top-0 left-0 w-full shadow-md z-50 transition-all duration-500 bg-red-600 text-white`}
        >
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-medium rubik flex justify-center items-center gap-2">
                    <img
                        src="image/CarLogo.webp"
                        alt="Logo"
                        className="h-12 w-12 mr-4"
                    />
                    <h1 className="text-xl font-bold">Car Sale Portal</h1>
                </Link>

                {/* Hamburger Menu Button (Mobile) */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                    </svg>
                </button>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6 rubik">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <NavLink href={item.href} active={route().current(item.link)} className="relative group text-white hover:text-gray-300 transition-colors">
                                {item.name}
                                <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <ul className="hidden md:flex space-x-8 rubik">
                    {/* Auth Links */}
                    {!isLoggedIn &&
                        canLogin &&
                        canRegister &&
                        authItems.map((authItem) => (
                            <li key={authItem.name} className="flex space-x-4">
                                <NavLink href={authItem.href} active={route().current(authItem.link)} className="relative group text-white hover:text-gray-300 transition-colors">
                                    {authItem.name}
                                    <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
                                </NavLink>
                            </li>
                        ))}
                    {isLoggedIn && (
                        <li>
                            <Link href={route("dashboard")} className={`relative group text-white hover:text-gray-300 transition-colors`}>
                                Dashboard
                                <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>

            {/* Mobile Menu with Blur Effect */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-red-900/60 backdrop-blur-xl">
                    <div className="p-4 absolute top-0 right-0">
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="text-2xl focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-8 h-8"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <ul className="flex flex-col items-center justify-center h-full space-y-6 rubik">
                        {/* Regular menu items */}
                        {menuItems.map((item) => (
                            <li key={item.name} className="text-center">
                                <NavLink href={item.href} active={route().current(item.link)}>
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}

                        {/* Show Login/Register only if user is NOT logged in, else show Dashboard */}
                        {isLoggedIn ? (
                            <li className="text-center">
                                <NavLink href={route("dashboard")} active={route().current("dashboard")}>
                                    Dashboard
                                </NavLink>
                            </li>
                        ) : (
                            canLogin &&
                            canRegister &&
                            authItems.map((authItem) => (
                                <li key={authItem.name} className="text-center">
                                    <NavLink href={authItem.href} active={route().current(authItem.link)}>
                                        {authItem.name}
                                    </NavLink>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
