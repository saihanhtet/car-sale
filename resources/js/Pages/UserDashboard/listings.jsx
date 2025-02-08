import { Button } from "@/Components/Button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router, useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";

const CarListingsPage = () => {
    const { cars, makes } = usePage().props;

    const [brandFilter, setBrandFilter] = useState("");
    const [bidStatusFilter, setBidStatusFilter] = useState("");
    const [filteredCars, setFilteredCars] = useState(cars.data || []);

    // Handle Search Button Click
    const handleSearch = () => {
        const results = cars.data.filter((car) => {
            return (
                (brandFilter === "" || car.brand === brandFilter) &&
                (bidStatusFilter === "" || car.bid_status === bidStatusFilter)
            );
        });
        setFilteredCars(results);
    };

    const { delete: destroy } = useForm();

    const handleDelete = (car) => {
        destroy(route('car.destroy', { ['car']: car.id }), {
            preserveScroll: false,
            onSuccess: () => alert("Successfully deleted car."),
            onError: () => alert("Please try again."),
        });
        router.visit(route('my-cars-dashboard'));
    };

    const handleEdit = (car) => {
        router.visit(route('car-edit-dashboard', car.id));
    }

    return (
        <AuthenticatedLayout>
            <div className="bg-gray-100 min-h-screen p-6">
                <h1 className="text-xl font-bold text-center mb-6">My Car Listings</h1>

                {/* Filters Section */}
                <div className="bg-white p-4 rounded-md shadow mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Brand Filter */}
                        <div>
                            <label className="block text-sm font-bold w-[200px]" htmlFor="brand">
                                Select Make:
                            </label>
                            <select
                                id="brand"
                                value={brandFilter}
                                onChange={(e) => setBrandFilter(e.target.value)}
                                className="w-full border rounded p-2"
                            >
                                <option value="">All</option>
                                {makes.map((make, index) => (
                                    <option value={make.id} key={index}>{make.name}</option>
                                ))}
                            </select>
                        </div>
                        {/* Status */}
                        <div>
                            <label className="block text-sm font-bold w-[200px]" htmlFor="bid_status">
                                Select Status:
                            </label>
                            <select
                                id="bid_status"
                                value={bidStatusFilter}
                                onChange={(e) => setBidStatusFilter(e.target.value)}
                                className="w-full border rounded p-2"
                            >
                                <option value="open">Open</option>
                                <option value="close">Close</option>
                            </select>
                        </div>

                        {/* Search Button */}
                        <div className="flex items-end">
                            <button
                                onClick={handleSearch}
                                className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                {/* Car Listings */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCars.length > 0 ? (
                        filteredCars.map((car) => (
                            <div key={car.id} className="bg-white rounded-md shadow-md p-4 border">
                                <h2 className="text-xl font-semibold capitalize">{car.model}</h2>
                                <img
                                    src={car.picture}
                                    alt={car.model}
                                    className="h-48 w-full object-cover rounded my-3 bg-slate-100"
                                />
                                <p className="capitalize"><strong>Brand:</strong> {car.make.name}</p>
                                <p className="capitalize"><strong>Price:</strong> ${car.price}</p>
                                <p className="capitalize"><strong>Mileage:</strong> {car.mileage} km</p>
                                <p className="capitalize"><strong>Transmission:</strong> {car.transmission}</p>
                                <p className="capitalize"><strong>Bid Status:</strong> {car.bid_status}</p>
                                <div className="border-b-2 my-2"></div>
                                <div className="flex justify-start items-center gap-3 mt-3">
                                    <Button variant='default' className='w-full' onClick={() => router.visit(route('car-details-dashboard', car.id))} >Details</Button>
                                    <Button variant='default' className='w-full' onClick={() => handleEdit(car)}>Edit</Button>
                                    <Button variant='destructive' className='w-full' onClick={() => handleDelete(car)}>Delete</Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-600 mt-6">
                            <p>No cars match your filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>

    );
};

export default CarListingsPage;
