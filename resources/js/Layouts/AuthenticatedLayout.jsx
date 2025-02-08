import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // Define navigation links conditionally
    const navLinks = [
        { name: 'Home', route: 'home-page' },
        { name: 'Dashboard', route: 'dashboard' },
    ];

    // Admin-specific dropdown menu`
    const adminLinks = [
        { name: 'Users Management', route: 'users-management-dashboard' },
        { name: 'Cars Management', route: 'cars-management-dashboard' },

    ];

    // User-specific dropdown menu
    const userLinks = [
        { name: 'Upload Cars', route: 'upload-car-dashboard' },
        { name: 'My Cars', route: 'my-cars-dashboard' },
        { name: 'Test Drive Management', route: 'test-drive-dashboard' },
        { name: 'Make Transaction', route: 'bidding-dashboard' },
        { name: 'All Transactions', route: 'transaction-dashboard' }
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        {/* Left Navigation */}
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                {navLinks.map((link) => (
                                    <NavLink key={link.route} href={route(link.route)} active={route().current(link.route)} className='border-0 flex items-center justify-center text-sm text-gray-500 hover:text-gray-700 font-medium'>
                                        {link.name}
                                    </NavLink>
                                ))}

                                {/* Dropdown for Admin Links */}
                                {user.is_admin ? (
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                                                Management
                                            </button>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            {adminLinks.map((link) => (
                                                <Dropdown.Link key={link.route} href={route(link.route)} active={route().current(link.route)}>
                                                    {link.name}
                                                </Dropdown.Link>
                                            ))}
                                        </Dropdown.Content>
                                    </Dropdown>
                                ) : (
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                                                Management
                                            </button>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            {userLinks.map((link) => (
                                                <Dropdown.Link key={link.route} href={route(link.route)} active={route().current(link.route)}>
                                                    {link.name}
                                                </Dropdown.Link>
                                            ))}
                                        </Dropdown.Content>
                                    </Dropdown>
                                )}
                            </div>
                        </div>

                        {/* Right Side User Profile Dropdown */}
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none"
                                    >
                                        {user.name}
                                        <ChevronDown />
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')} active={route().current('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                                className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
                            >
                                <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Dropdown */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="space-y-1 pb-3 pt-2">
                        {navLinks.map((link) => (
                            <ResponsiveNavLink key={link.route} href={route(link.route)} active={route().current(link.route)}>
                                {link.name}
                            </ResponsiveNavLink>
                        ))}

                        {/* Mobile Admin Links */}
                        {user.is_admin && (
                            <div className="border-t border-gray-200 pt-2">
                                <p className="px-4 text-sm font-medium text-gray-500">Admin</p>
                                {adminLinks.map((link) => (
                                    <ResponsiveNavLink key={link.route} href={route(link.route)} active={route().current(link.route)}>
                                        {link.name}
                                    </ResponsiveNavLink>
                                ))}
                            </div>
                        )}

                        {/* Mobile User Links */}
                        {!user.is_admin && (
                            <div className="border-t border-gray-200 pt-2">
                                <p className="px-4 text-sm font-medium text-gray-500">My Cars</p>
                                {userLinks.map((link) => (
                                    <ResponsiveNavLink key={link.route} href={route(link.route)} active={route().current(link.route)}>
                                        {link.name}
                                    </ResponsiveNavLink>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Mobile Profile & Logout */}
                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">{user.name}</div>
                            <div className="text-sm font-medium text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')} active={route().current('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Header */}
            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6">{header}</div>
                </header>
            )}

            {/* Main Content */}
            <main className="px-4">{children}</main>
        </div>
    );
}
