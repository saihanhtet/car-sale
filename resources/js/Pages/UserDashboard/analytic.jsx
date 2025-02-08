import CardWithChart from '@/Components/CardWithChart';
import StatusCard from '@/Components/StatusCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {

    const { car_transactions, cars, month_label, monthly_bids, average_bidding, total_profit } = usePage().props;
    console.log(car_transactions)
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-gray-800">
                    User Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-3">
                    <div className="flex flex-wrap justify-center items-center gap-3">
                        <StatusCard title={"Cars Count"} content={cars.length} />
                        <StatusCard title={"Average Bidding"} content={average_bidding} />
                        <StatusCard title={"Total Profit"} content={`${total_profit}%`} />
                        <CardWithChart dataPoints={monthly_bids} overview={month_label} />

                        <div className="container mx-auto p-4 relative max-w-full shadow-md">
                            <div className="overflow-x-auto  shadow-md rounded-lg">
                                <table className="min-w-full text-sm text-left text-gray-500">
                                    <thead className="bg-blue-200">
                                        <tr>
                                            <th className="px-6 py-3 font-semibold text-gray-700 text-center">Car ID</th>
                                            <th className="px-6 py-3 font-semibold text-gray-700 text-center">Model</th>
                                            <th className="px-6 py-3 font-semibold text-gray-700 text-center">Transaction ID</th>
                                            <th className="px-6 py-3 font-semibold text-gray-700 text-center">Transaction Date</th>
                                            <th className="px-6 py-3 font-semibold text-gray-700 text-center">Final Price</th>
                                            <th className="px-6 py-3 font-semibold text-gray-700 text-center">Fuel Type</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700">
                                        {car_transactions.length > 0 ? (
                                            car_transactions.map((row, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    <td className="px-6 py-4 text-center">{row.car_id}</td>
                                                    <td className="px-6 py-4 text-center">{row.model}</td>
                                                    <td className="px-6 py-4 text-center">{row.transaction_id}</td>
                                                    <td className="px-6 py-4 text-center">{row.transaction_date}</td>
                                                    <td className="px-6 py-4 text-center">${parseFloat(row.final_price).toLocaleString()}</td>
                                                    <td className="px-6 py-4 text-center">{row.fuel_name}</td>
                                                </tr>
                                            ))) : (
                                            <tr>
                                                <td colSpan={car_transactions.length} className="text-center py-4 text-gray-500 dark:text-gray-400">
                                                    No Data Available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
