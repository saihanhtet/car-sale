import { Button } from '@/Components/Button';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { MoveLeft } from 'lucide-react';
import { useState } from 'react';

const CarDetailsPage = ({ canLogin, canRegister, isLoggedIn }) => {
    const { car, highestBid, user, bidable, isOwner, lastBid } = usePage().props;
    const [testDriveDialog, setTestDriveDialog] = useState(false);
    const [biddingDialog, setBiddingDialog] = useState(false);

    const { data, setData, post, errors } = useForm({
        car_id: car?.id || '',
        user_id: user?.id || '',
        date: '',
        amount: '',
    });

    const handleScheduleSubmit = () => {
        post(route('booking.store'), {
            data,
            onSuccess: () => {
                setTestDriveDialog(false);
            },
        });
    };

    const handleBiddingSubmit = () => {
        post(route('bid.store'), {
            data,
            onSuccess: () => {
                setBiddingDialog(false);
            },
        });
    };

    return (
        <GuestLayout canLogin={canLogin} canRegister={canRegister} isLoggedIn={isLoggedIn}>
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
                        <p className="text-gray-600 capitalize">Bidding Status: <strong className={car.bid_status === 'open' ? 'text-green-600' : 'text-red-600'}>{lastBid?.user.name || 'No Last bid.'}</strong></p>

                        <div className='border-b-2 border-black my-4'></div>

                        <p className="text-gray-700 mt-4"><strong>Description:</strong></p>
                        <p className="text-gray-600">{car.description || 'No description available.'}</p>

                        {!user && (
                            <Link href={route('login')}>
                                <Button>Please Log in first!</Button>
                            </Link>
                        )}

                        {!isOwner && bidable ? (
                            <div className="mt-6 flex gap-2">
                                <Button
                                    className="md:max-w-[250px] w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase p-2 rounded"
                                    onClick={() => setTestDriveDialog(true)}
                                >
                                    Test Drive
                                </Button>
                                {testDriveDialog && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                        <div className="bg-white p-6 rounded-md shadow-md w-[500px]">
                                            <h2 className="text-lg font-bold">Test Drive for {car.model}</h2>
                                            <label className="block mt-4 font-semibold">Schedule Drive Date</label>
                                            <input
                                                type="date"
                                                value={data.date}
                                                onChange={(e) => setData('date', e.target.value)}
                                                className="w-full p-2 border rounded mt-1"
                                            />
                                            {errors.drive_date && <p className="text-red-500 text-sm">{errors.drive_date}</p>}
                                            <button
                                                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded"
                                                onClick={handleScheduleSubmit}
                                            >
                                                Test Drive
                                            </button>
                                            <button
                                                className="mt-2 w-full bg-gray-400 hover:bg-gray-500 text-white p-2 rounded"
                                                onClick={() => setTestDriveDialog(false)}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <Button
                                    className="md:max-w-[250px] w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase p-2 rounded"
                                    onClick={() => setBiddingDialog(true)}
                                >
                                    Place Bid
                                </Button>
                                {biddingDialog && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                        <div className="bg-white p-6 rounded-md shadow-md w-[500px]">
                                            <h2 className="text-lg font-bold">Place Bid for {car.model}</h2>
                                            <label className="block mt-4 font-semibold">Enter the Bidding amount:</label>
                                            <input
                                                type="number"
                                                value={data.amount}
                                                onChange={(e) => setData('amount', e.target.value)}
                                                className="w-full p-2 border rounded mt-1"
                                            />
                                            {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
                                            <button
                                                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded"
                                                onClick={handleBiddingSubmit}
                                            >
                                                Place Booking
                                            </button>
                                            <button
                                                className="mt-2 w-full bg-gray-400 hover:bg-gray-500 text-white p-2 rounded"
                                                onClick={() => setBiddingDialog(false)}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="text-red-500">You cannot bid this car anymore.</p>
                        )}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default CarDetailsPage;
