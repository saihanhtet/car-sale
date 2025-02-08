import { useState } from 'react';
import { usePage, router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BookingManagement() {
    const { transactions, auth } = usePage().props;
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedCar, setSelectedCar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const openModal = (transaction) => {
        setSelectedUser(transaction.transaction.buyer);
        setSelectedCar(transaction);
        setIsModalOpen(true);
    };


    return (
        <AuthenticatedLayout header={
            <h2 className="text-xl font-bold leading-tight text-gray-800">
                All Transaction You made
            </h2>
        }>
            <div className="container mx-auto p-4">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border border-gray-300 rounded-lg shadow-lg">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="p-3 border">ID</th>
                                <th className="p-3 border">Model</th>
                                <th className="p-3 border">Original Price</th>
                                <th className="p-3 border">Final Price</th>
                                <th className="p-3 border">Buyer</th>
                                <th className="p-3 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.data.length > 0 ? (
                                transactions.data.map((transaction) => {
                                    return (
                                        <tr key={transaction.id} className="bg-white even:bg-gray-100 hover:bg-gray-200 transition">
                                            <td className="p-3 borde text-center min-w-[50px]">{transaction.id}</td>
                                            <td className="p-3 border">{transaction.model}</td>
                                            <td className="p-3 border">{transaction.price}</td>
                                            <td className="p-3 border text-center">{transaction.transaction.final_price}</td>
                                            <td className="p-3 border text-center">{transaction.transaction.buyer.name}</td>
                                            <td className="p-3 border text-center">
                                                <button onClick={() => openModal(transaction)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 min-w-[150px]">View</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center p-3">No transactions available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex justify-center">
                    {transactions.links && (
                        <div className="flex space-x-2">
                            {transactions.links.map((link) => (
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
                            <h2 className="text-xl font-bold mb-2">Transaction Record with {selectedUser.name}</h2>
                            <div className="border-b-2 my-2"></div>
                            <p><strong>Buyer Name:</strong> {selectedUser.name}</p>
                            <p><strong>Buyer Email:</strong> {selectedUser.email}</p>
                            <p><strong>Buyer Status:</strong> {selectedUser.status}</p>
                            <p><strong>Buyer Phone:</strong> {selectedUser.phone}</p>
                            <p><strong>Buyer Address:</strong> {selectedUser.address}</p>
                            <div className="border-b-2 my-2"></div>
                            <p><strong>Car Name:</strong> {selectedCar.model}</p>
                            <p><strong>Final Price:</strong> {selectedCar.transaction.final_price}</p>
                            <div className="border-b-2 my-2"></div>
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
