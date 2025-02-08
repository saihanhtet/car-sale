import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CardWithChart = ({ dataPoints, overview }) => {
    const labels = dataPoints.map((point) => point.month.slice(0, 3));
    const totalAmounts = dataPoints.map((point) => point.total_amount);
    const averageBidding = dataPoints.map((point) => point.average_bidding);

    const data = {
        labels,
        datasets: [
            {
                label: "Total Amount",
                data: totalAmounts,
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: "#3b82f6",
            },
            {
                label: "Average Bidding",
                data: averageBidding,
                borderColor: "#ef4444",
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: "#ef4444",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true },
        },
        scales: {
            x: { grid: { display: false }, ticks: { color: "#6b7280" } },
            y: { grid: { color: "#e5e7eb" }, ticks: { color: "#6b7280" } },
        },
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-full md:max-w-none">
            <h2 className="text-xl font-black text-gray-900 mb-4">Bidding Overview ({overview})</h2>
            <div className="h-64">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default CardWithChart;
