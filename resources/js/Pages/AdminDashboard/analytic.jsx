import CardWithChart from '@/Components/CardWithChart';
import StatusCard from '@/Components/StatusCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {

    const { cars_count, users_count, transactions_count, monthly_bids, month_label } = usePage().props;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-gray-800">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-3">
                    <div className="flex flex-wrap justify-center items-center gap-3">
                        <StatusCard title={"Cars Count"} content={cars_count} />
                        <StatusCard title={"Users Count"} content={users_count} />
                        <StatusCard title={"Transactions Count"} content={transactions_count} />
                        <CardWithChart dataPoints={monthly_bids} overview={month_label} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
