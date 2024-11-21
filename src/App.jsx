import React from "react";
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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function App() {
  // Data untuk grafik
  const chartData = {
    labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
    datasets: [
      {
        label: "Pengunjung Masuk",
        data: [20, 25, 18, 30, 35, 40, 50],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: "Pengunjung Keluar",
        data: [15, 18, 12, 25, 28, 30, 45],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Opsi untuk grafik
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Grafik Jumlah Pengunjung Masuk dan Keluar (Mingguan)",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5">
      <h1 className="text-base md:text-lg lg:text-xl font-bold text-gray-700 text-center mb-6 max-w-2xl mx-auto">
        Sistem Penghitung Jumlah Orang Otomatis Pada Pintu Masuk Menggunakan{" "}
        <span className="text-blue-500">Sensor Ultrasonik HC-SR04</span> dan{" "}
        <span className="text-blue-500">Mikrokontroler ESP32</span>
      </h1>
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-5">
        {/* Grafik */}
        <div className="w-full md:w-2/3 bg-white rounded-lg shadow-md p-5">
          <Line data={chartData} options={chartOptions} />
        </div>
        {/* Cards */}
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <div className="bg-blue-600 text-white rounded-lg p-7 text-center shadow-md">
            <h2 className="text-sm font-semibold">Jumlah Orang Saat Ini</h2>
            <p className="text-2xl font-bold mt-2">12</p>
          </div>
          <div className="bg-green-500 text-white rounded-lg p-7 text-center shadow-md">
            <h2 className="text-sm font-semibold">Jumlah Orang Masuk</h2>
            <p className="text-2xl font-bold mt-2">15</p>
          </div>
          <div className="bg-red-500 text-white rounded-lg p-7 text-center shadow-md">
            <h2 className="text-sm font-semibold">Jumlah Orang Keluar</h2>
            <p className="text-2xl font-bold mt-2">3</p>
          </div>
        </div>
      </div>
    </div>
  );
}
