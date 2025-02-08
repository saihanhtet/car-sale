import { Button } from '@/Components/Button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router, usePage } from '@inertiajs/react';
import { MoveLeft } from 'lucide-react';

const CarDetailsPage = () => {
    const { car, highestBid, lastBid } = usePage().props;


    return (
        <AuthenticatedLayout header={
            <h2 className="text-xl font-bold leading-tight text-gray-800">
                My Car Details
            </h2>
        }>
            <div className="container mx-auto p-4">
                <button
                    className="mb-5 flex items-center text-blue-600 hover:underline"
                    onClick={() => router.visit(route('carlist-page'))}
                >
                    <MoveLeft className="mr-2" /> Go Back
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 flex justify-center items-center rounded-md shadow-md">
                        <img src={car.picture} alt={car.model} className="max-w-full h-auto object-cover rounded-md" />
                    </div>
                    <div className="bg-white p-6 rounded-md shadow-md font-normal">
                        <h1 className="text-2xl font-black">{car.model || ''}</h1>
                        <h2 className="text-xl font-semibold text-gray-700">${car.price || '0'}</h2>
                        <div className='border-b-2 border-black my-4'></div>
                        <p className="text-gray-600 font-black">Highest Bid: ${highestBid || car.price}</p>
                        <p className="text-gray-700 capitalize">Registration Year: <strong>{car.registration_year}</strong></p>
                        <p className="text-gray-700 capitalize">Mileage: <strong>{car.mileage} km</strong></p>
                        <p className="text-gray-700 capitalize">Transmission: <strong>{car.transmission || 'N/A'}</strong></p>
                        <p className="text-gray-700 capitalize">Fuel Type: <strong>{car.fuel?.name || 'N/A'}</strong></p>
                        <p className="text-gray-700 capitalize">Engine: <strong>{car.engine?.name || 'N/A'}</strong></p>
                        <p className="text-gray-700 capitalize">Status: <strong className={car.car_status === 'available' ? 'text-green-600' : 'text-red-600'}>{car.car_status}</strong></p>
                        <p className="text-gray-700 capitalize">Bidding Status: <strong className={car.bid_status === 'open' ? 'text-green-600' : 'text-red-600'}>{car.bid_status}</strong></p>
                        <p className="text-gray-600 capitalize">Last Bid User: <strong className={car.bid_status === 'open' ? 'text-green-600' : 'text-red-600'}>{lastBid?.user.name || 'No Last bid user.'}</strong></p>

                        <div className='border-b-2 border-black my-4'></div>

                        <p className="text-gray-700 mt-4"><strong>Description:</strong></p>
                        <p className="text-gray-600">{car.description || 'No description available.'}</p>

                        <div className="mt-6 flex gap-2">
                            <Button
                                className="md:max-w-[250px] w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase p-2 rounded"
                                onClick={() => router.visit(route(''))}
                            >
                                Make Transaction
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CarDetailsPage;
