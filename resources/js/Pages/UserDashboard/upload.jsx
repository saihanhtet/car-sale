import { Button } from '@/Components/Button';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, usePage } from '@inertiajs/react'
import React from 'react'

const UploadDashboard = ({ car }) => {
    const { makes, fuels, engines, cars, user } = usePage().props;
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        make_id: car?.make_id || '',
        fuel_id: car?.fuel_id || '',
        engine_id: car?.engine_id || '',
        model: car?.model || '',
        registration_year: car?.registration_year || '',
        price: car?.price || '',
        mileage: car?.mileage || '',
        picture: car?.picture || '',
        transmission: car?.transmission || '',
        description: car?.description || '',
    });

    const handleSubmit = () => {
        post(route('car.store'), {
            onSuccess: () => {
                alert('Car Uploaded Successfully!');
            },
            onError: (error) => {
                console.error('Error creating transaction:', error);
            },
        });
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-black leading-tight text-gray-800">
                    {car ? (
                        <div className='flex gap-5 items-center'>
                            <Button variant="link" className="text-primary" onClick={() => router.visit(route('car-list-dashboard'))}>
                                <MoveLeft /> Go Back
                            </Button>
                            <div>Edit Car</div>
                        </div>
                    ) : 'Upload New Car'}
                </h2>
            }
        >
            <Head title="Dashboard" />



            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4" role="form">
                    <div>
                        <InputLabel htmlFor="model" value="Car Model" />
                        <TextInput
                            id="model"
                            type="text"
                            value={data.model}
                            onChange={(e) => setData('model', e.target.value)}
                            placeholder="Enter car model"
                            className='focus:ring-0 bg-white w-full'
                        />
                        <InputError message={errors.model} />
                    </div>

                    <div>
                        <InputLabel htmlFor="registration_year" value="Registration Year" />
                        <TextInput
                            id="registration_year"
                            type="number"
                            value={data.registration_year}
                            onChange={(e) =>
                                setData('registration_year', e.target.value)
                            }
                            placeholder="Enter registration year"
                            className='focus:ring-0 bg-white w-full'
                        />
                        <InputError message={errors.registration_year} />
                    </div>

                    <div>
                        <InputLabel htmlFor="price" value="Price ($)" />
                        <TextInput
                            id="price"
                            type="number"
                            value={data.price}
                            onChange={(e) => setData('price', parseFloat(e.target.value))}
                            placeholder="Enter price"
                            className='focus:ring-0 bg-white w-full'
                        />
                        <InputError message={errors.price} />
                    </div>

                    <div>
                        <InputLabel htmlFor="mileage" value="Mileage" />
                        <TextInput
                            id="mileage"
                            type="number"
                            value={data.mileage}
                            onChange={(e) => setData('mileage', e.target.value)}
                            placeholder="Enter mileage"
                            className='focus:ring-0 bg-white w-full'
                        />
                        <InputError message={errors.mileage} />
                    </div>

                    <div>
                        <InputLabel htmlFor="transmission" value="Transmission" />
                        <select
                            id="transmission"
                            value={data.transmission}
                            onChange={(e) => setData('transmission', e.target.value)}
                            className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="" disabled>Select Transmission Type</option>
                            <option value="Automatic">Automatic</option>
                            <option value="Manual">Manual</option>
                        </select>
                        <InputError message={errors.transmission} />
                    </div>


                    <div>
                        <InputLabel htmlFor="brand_id" value="Brand" />
                        <select
                            id="make_id"
                            value={data.make_id}
                            onChange={(e) => setData('make_id', e.target.value)}
                            className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="" disabled>Select a Make</option>
                            {makes.map((make) => (
                                <option key={make.id} value={make.id}>
                                    {make.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.make_id} />
                    </div>


                    <div>
                        <InputLabel htmlFor="fuel_id" value="Fuel Type" />
                        <select
                            id="fuel_id"
                            value={data.fuel_id}
                            onChange={(e) => setData('fuel_id', e.target.value)}
                            className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="" disabled>Select a Fuel Type</option>
                            {fuels.map((fuel) => (
                                <option key={fuel.id} value={fuel.id}>
                                    {fuel.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.fuel_id} />
                    </div>


                    <div>
                        <InputLabel htmlFor="engine_id" value="Engine Type" />
                        <select
                            id="engine_id"
                            value={data.engine_id}
                            onChange={(e) => setData('engine_id', e.target.value)}
                            className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="" disabled>Select an Engine Type</option>
                            {engines.map((engine) => (
                                <option key={engine.id} value={engine.id}>
                                    {engine.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.engine_id} />
                    </div>

                    <div>
                        <InputLabel htmlFor="image" value="Car Image Upload" />
                        <TextInput
                            id="picture"
                            name="picture"
                            type="file"
                            onChange={(e) => setData('picture', e.target.files[0])}
                            className="focus:ring-0 bg-white w-full p-1 border"
                        />
                        <InputError message={errors.picture} />
                    </div>

                    <div>
                        <InputLabel htmlFor="description" value="Car Description" />
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Write the information of car"
                            className="focus:ring-0 h-48 w-full border-gray-300 rounded-md shadow-sm"
                        />
                        <InputError message={errors.description} />
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                    <Button variant="secondary" onClick={() => reset()}>
                        Reset
                    </Button>
                    <Button
                        variant="default"
                        onClick={handleSubmit}
                        disabled={processing}
                    >
                        {car ? 'Update Car' : 'Add Car'}
                    </Button>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default UploadDashboard
