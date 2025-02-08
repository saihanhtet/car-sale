import { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BookingManagement() {
    const { bookings, auth } = usePage().props;
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const updateStatus = (booking, newStatus) => {
        router.put(route('booking.updateStatus', booking.id), {
            id: booking.id,
            status: newStatus
        });
    };

    const openModal = (booking) => {
        setSelectedUser(booking.user);
        setIsModalOpen(true);
    };

    return (
        <AuthenticatedLayout header={
            <h2 className="text-xl font-bold leading-tight text-gray-800">
                Test Drive Management
            </h2>
        }>
            <div className="container mx-auto p-4">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border border-gray-300 rounded-lg shadow-lg">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="p-3 border">ID</th>
                                <th className="p-3 border">Model</th>
                                <th className="p-3 border">Request User</th>
                                <th className="p-3 border">Schedule Date</th>
                                <th className="p-3 border">Status</th>
                                <th className="p-3 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.data.length > 0 ? (
                                bookings.data.map((booking) => (
                                    <tr key={booking.id} className="bg-white even:bg-gray-100 hover:bg-gray-200 transition">
                                        <td className="p-3 borde text-center min-w-[50px]">{booking.id}</td>
                                        <td className="p-3 border">{booking.car.model}</td>
                                        <td className="p-3 border">{booking.user.name}</td>
                                        <td className="p-3 border text-center">{booking.date}</td>
                                        <td className="p-3 border text-center">
                                            <select
                                                value={booking.status || 'inactive'}
                                                onChange={(e) => updateStatus(booking, e.target.value)}
                                                className="p-2 border rounded bg-white w-full min-w-[100px]"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="approved">Approved</option>
                                                <option value="denied">Denied</option>
                                            </select>
                                        </td>
                                        <td className="p-3 border text-center">
                                            <button onClick={() => openModal(booking)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 min-w-[150px]">View Details</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center p-3">No bookings available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex justify-center">
                    {bookings.links && (
                        <div className="flex space-x-2">
                            {bookings.links.map((link) => (
                                <button
                                    key={link.label}
                                    onClick={() => router.get(link.url)}
                                    className={`px-4 py-2 rounded ${link.active ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
                                >
                                    {/* Render Font Awesome icons for "previous" and "next" */}
                                    {link.label === '&laquo; Previous' ? (
                                        <ChevronLeft />
                                    ) : link.label === 'Next &raquo;' ? (
                                        <ChevronRight />
                                    ) : (
                                        link.label
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>


                {isModalOpen && selectedUser && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                            <h2 className="text-xl font-bold mb-2">User Details</h2>
                            <p><strong>Name:</strong> {selectedUser.name}</p>
                            <p><strong>Email:</strong> {selectedUser.email}</p>
                            <p><strong>Status:</strong> {selectedUser.status}</p>
                            <p><strong>Role:</strong> {selectedUser.is_admin ? 'Admin' : 'User'}</p>
                            <p><strong>Phone:</strong> {selectedUser.phone}</p>
                            <p><strong>Address:</strong> {selectedUser.address}</p>
                            <p><strong>Bio:</strong> {selectedUser.bio}</p>
                            {selectedUser.picture && (
                                <img src={selectedUser.picture} alt="User profile" className="mt-2 rounded-md w-32 h-32" />
                            )}
                            <button
                                className="mt-4 w-full bg-gray-400 hover:bg-gray-500 text-white p-2 rounded"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
