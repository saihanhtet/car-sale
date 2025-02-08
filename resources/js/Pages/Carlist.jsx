import { Button } from "@/Components/Button";
import GuestLayout from "@/Layouts/GuestLayout";
import { router, usePage } from "@inertiajs/react";
import { MoveRight } from "lucide-react";
import React, { useEffect, useState } from "react";

const CarListingsPage = ({ canLogin, canRegister, isLoggedIn }) => {
  const { cars, makes, fuels, engines, status, isFilterActive, preSelectedFilters } = usePage().props;

  const [selectedFilters, setSelectedFilters] = useState({
    make: preSelectedFilters.make || '',
    fuel: preSelectedFilters.fuel || '',
    priceMin: preSelectedFilters.priceMin || '',
    priceMax: preSelectedFilters.priceMax || '',
    year: preSelectedFilters.year || '',
    bid_status: preSelectedFilters.bid_status || 'open',
  });

  // Handle Search Button Click
  const handleSearch = () => {
    const filterQuery = {
      make: selectedFilters.make,
      fuel: selectedFilters.fuel,
      priceMin: selectedFilters.priceMin,
      priceMax: selectedFilters.priceMax,
      year: selectedFilters.year,
      bid_status: selectedFilters.bid_status
    };
    router.visit(route('carlist-page'), {
      method: 'get',
      data: filterQuery,
      preserveState: false
    });
  };

  useEffect(() => {
    setSelectedFilters({
      make: preSelectedFilters.make || '',
      fuel: preSelectedFilters.fuel || '',
      priceMin: preSelectedFilters.priceMin || '',
      priceMax: preSelectedFilters.priceMax || '',
      year: preSelectedFilters.year || '',
      bid_status: preSelectedFilters.bid_status || 'open',
    });
  }, [preSelectedFilters]);


  return (
    <GuestLayout canLogin={canLogin} canRegister={canRegister} isLoggedIn={isLoggedIn}>
      <div className="bg-gray-100 min-h-screen p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Car Listings</h1>

        {/* Filters Section */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Brand Filter */}
            <div>
              <label className="block text-sm font-bold w-[200px]" htmlFor="make">
                Select Make:
              </label>
              <select
                id="make"
                value={selectedFilters.make}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, make: e.target.value }))}
                className="w-full border rounded p-2"
              >
                <option value="">All</option>
                {makes.map((make, index) => (
                  <option value={make.name} key={index}>{make.name}</option>
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
                value={selectedFilters.bid_status}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, bid_status: e.target.value }))}
                className="w-full border rounded p-2"
              >
                <option value="open">Open</option>
                <option value="close">Close</option>
              </select>
            </div>
            {/* Min Price */}
            <div>
              <label className="block text-sm font-bold" htmlFor="priceMin">
                Min Price
              </label>
              <input
                type="number"
                id="priceMin"
                value={selectedFilters.priceMin}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, priceMin: e.target.value }))}
                className="w-full border rounded p-2"
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="block text-sm font-bold" htmlFor="priceMax">
                Max Price
              </label>
              <input
                type="number"
                id="priceMax"
                value={selectedFilters.priceMax}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, priceMax: e.target.value }))}
                className="w-full border rounded p-2"
              />
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-sm font-bold" htmlFor="year">
                Year
              </label>
              <input
                type="number"
                id="year"
                value={selectedFilters.year}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, year: e.target.value }))}
                className="w-full border rounded p-2"
              />
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
        {isFilterActive && status && (
          <div className="w-full p-3 m-0 bg-green-200 rounded-md shadow-sm border mb-3 border-black">{status}</div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.data.map((car, index) => (
            <div key={index} className="bg-white rounded-md shadow-md p-4 border">
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
              <div className="flex justify-end items-center gap-3 mt-3">
                <Button variant='default'
                  onClick={() => router.visit(route('car-details-page', car.id))} className='px-5 flex justify-center items-center'><span>View Details</span><MoveRight /></Button>
              </div>
            </div>
          ))}
        </div>
      </div >
    </GuestLayout>

  );
};

export default CarListingsPage;
