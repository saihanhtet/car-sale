import { useState } from 'react';
import { usePage, router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BookingManagement() {
    const { biddings, auth } = usePage().props;
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedCar, setSelectedCar] = useState(null);
    const [selectedBid, setSelectedBid] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formattedTransactionDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    console.log(biddings)
    const { data, setData, post, processing } =
        useForm({
            buyer_id: '',
            buyer_id: '',
            car_id: '',
            final_price: '',
            transaction_date: formattedTransactionDate,
        });

    const openModal = (bidding) => {
        setSelectedUser(bidding.user);
        setSelectedCar(bidding.car);
        setSelectedBid(bidding);
        setData({
            ...data,
            buyer_id: bidding.user_id,
            seller_id: bidding.car.user_id,
            car_id: bidding.car.id,
            final_price: bidding.amount,
        });
        setIsModalOpen(true);
    };

    const handleTransaction = () => {
        post('/transactions', {
            onSuccess: () => {
                setIsModalOpen(false);
                alert('Transaction Successful!');
            },
            onError: (error) => {
                console.error('Error creating transaction:', error);
                alert('Transaction Error!');
            },
        });
    }

    return (
        <AuthenticatedLayout header={
            <h2 className="text-xl font-bold leading-tight text-gray-800">
                All Biddings
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
                                <th className="p-3 border">Bid Amount</th>
                                <th className="p-3 border">Profit</th>
                                <th className="p-3 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {biddings.data.length > 0 ? (
                                biddings.data.map((bidding) => {
                                    const highestBidForCar = Math.max(...biddings.data.filter(b => b.car_id === bidding.car_id).map(b => b.amount));
                                    const bidPercentage = highestBidForCar > bidding.car.price
                                        ? Math.round((((bidding.amount - bidding.car.price) / (highestBidForCar - bidding.car.price)) * 99 + 1))
                                        : 1;
                                    return (
                                        <tr key={bidding.id} className="bg-white even:bg-gray-100 hover:bg-gray-200 transition">
                                            <td className="p-3 borde text-center min-w-[50px]">{bidding.id}</td>
                                            <td className="p-3 border">{bidding.car.model}</td>
                                            <td className="p-3 border">{bidding.car.price}</td>
                                            <td className="p-3 border text-center">{bidding.amount}</td>
                                            <td className="p-3 border text-center">{bidPercentage}{" "}%</td>
                                            <td className="p-3 border text-center">
                                                {bidding.car.bid_status === 'close' ? (
                                                    <p className="text-red-600 font-bold">Made Transaction</p>
                                                ) : (
                                                    <button onClick={() => openModal(bidding)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 min-w-[150px]">Make Transaction</button>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center p-3">No biddings available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex justify-center">
                    {biddings.links && (
                        <div className="flex space-x-2">
                            {biddings.links.map((link) => (
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
                            <h2 className="text-xl font-bold mb-2">Make Transaction with {selectedUser.name}</h2>
                            <div className="border-b-2 my-2"></div>
                            <p><strong>Buyer Name:</strong> {selectedUser.name}</p>
                            <p><strong>Buyer Email:</strong> {selectedUser.email}</p>
                            <p><strong>Buyer Status:</strong> {selectedUser.status}</p>
                            <p><strong>Buyer Phone:</strong> {selectedUser.phone}</p>
                            <p><strong>Buyer Address:</strong> {selectedUser.address}</p>
                            <div className="border-b-2 my-2"></div>
                            <p><strong>Car Name:</strong> {selectedCar.model}</p>
                            <p><strong>Final Price:</strong> {selectedBid.amount}</p>
                            <div className="border-b-2 my-2"></div>
                            <button
                                className="mt-4 w-full bg-green-500 hover:bg-green-500 text-black p-2 rounded"
                                onClick={() => handleTransaction()}
                            >
                                Proceed
                            </button>
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
