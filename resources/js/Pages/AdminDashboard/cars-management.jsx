import React, { useState } from 'react';
import { usePage, router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function UserManagement() {
    const { cars, auth } = usePage().props;
    const [selectedCar, setSelectedCar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        data,
        setData,
        put,
    } = useForm({
        id: '',
        car_id: '',
        status: '',
    });

    const updateStatus = async (car, newStatus) => {
        setData({ id: car.appointment.id, car_id: car.id, status: newStatus });
        await new Promise((resolve) => setTimeout(resolve, 0));
    };

    const handleStatusSubmit = () => {
        put(route('appointment.updateStatus'), {
            ...data,
            preserveScroll: false,
            onSuccess: () => {
                alert("User Status Updated Successfully");
            },
            onError: (error) => {
                console.error("Error updating status:", error);
            },
        });
    }

    React.useEffect(() => {
        if (data.id && data.status) {
            handleStatusSubmit();
        }
    }, [data]);


    const openModal = (car) => {
        setSelectedCar(car);
        setIsModalOpen(true);
    };

    return (
        <AuthenticatedLayout header={
            <h2 className="text-xl font-bold leading-tight text-gray-800">
                Cars Management Dashboard
            </h2>
        }>
            <div className="container mx-auto p-4">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border border-gray-300 rounded-lg shadow-lg">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="p-3 border">ID</th>
                                <th className="p-3 border">Model</th>
                                <th className="p-3 border">Owner</th>
                                <th className="p-3 border">Price ($)</th>
                                <th className="p-3 border">Status</th>
                                <th className="p-3 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.data.length > 0 ? (
                                cars.data.map((car) => (
                                    <tr key={car.id} className="bg-white even:bg-gray-100 hover:bg-gray-200 transition">
                                        <td className="p-3 borde text-center min-w-[50px]">{car.id}</td>
                                        <td className="p-3 border">{car.model}</td>
                                        <td className="p-3 border">{car.user.name}</td>
                                        <td className="p-3 border text-center">{car.price}</td>
                                        <td className="p-3 border text-center">
                                            <select
                                                value={car.appointment.status || 'inactive'}
                                                onChange={(e) => updateStatus(car, e.target.value)}
                                                className="p-2 border rounded bg-white w-full min-w-[100px]"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="approved">Approved</option>
                                                <option value="denied">Denied</option>
                                            </select>
                                        </td>
                                        <td className="p-3 border text-center">
                                            <button onClick={() => openModal(car)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 min-w-[150px]">View Details</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center p-3">No cars available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex justify-center">
                    {cars.links && (
                        <div className="flex space-x-2">
                            {cars.links.map((link) => (
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


                {isModalOpen && selectedCar && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                            <h2 className="text-xl font-bold mb-2">Car Details</h2>
                            <p><strong>Model:</strong> {selectedCar.model}</p>
                            <p><strong>Price:</strong> {selectedCar.price}</p>
                            <p><strong>Status:</strong> {selectedCar.appointment.status}</p>
                            <p><strong>Phone:</strong> {selectedCar?.user.phone}</p>
                            <p><strong>Location:</strong> {selectedCar?.user.address}</p>
                            <div className="w-full flex justify-center items-center my-3">
                                {selectedCar.picture && (
                                    <img src={selectedCar.picture} alt="User profile" className="mt-2 rounded-md w-auto h-32" />
                                )}
                            </div>
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
