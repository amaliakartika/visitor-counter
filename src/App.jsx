import React, { useEffect, useState } from "react";
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
import { app, db } from "./firebase"; // Ensure this is the Firestore instance
import { doc, getDoc } from "firebase/firestore"; // Import doc and getDoc functions

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
  // State to store visitor data from Firestore
  const [visitorData, setVisitorData] = useState({
    saatIni: [],
    masuk: [],
    keluar: [],
  });

  const visitorId = "EbZa6NvY9kK7z1HHqlSE";

  // Fetch data from Firestore when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Correct usage of doc() to fetch a document reference
        const docRef = doc(db, "visitorData", visitorId); // Correct: use doc() to get a document reference
        const docSnap = await getDoc(docRef);

        // Check if the document exists
        if (docSnap.exists()) {
          const data = docSnap.data();

          const saatIni = data.currentVisitor || [];
          const masuk = data.visitorIn || [];
          const keluar = data.visitorOut || [];

          setVisitorData({
            saatIni,
            masuk,
            keluar,
          });
        } else {
          console.log("Dokumen tidak ditemukan!");
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data: ", error);
      }
    };

    fetchData();
  }, [visitorId]);
  console.log("visitorData", visitorData);

  // Data for the chart
  const chartData = {
    labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
    datasets: [
      {
        label: "Pengunjung Masuk",
        data: visitorData.masuk, // Use data from Firestore
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: "Pengunjung Keluar",
        data: visitorData.keluar, // Use data from Firestore
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Chart options
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
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-100">
      <h1 className="max-w-2xl mx-auto mb-6 text-base font-bold text-center text-gray-700 md:text-lg lg:text-xl">
        Sistem Penghitung Jumlah Orang Otomatis Pada Pintu Masuk Menggunakan{" "}
        <span className="text-blue-500">Sensor Ultrasonik HC-SR04</span> dan{" "}
        <span className="text-blue-500">Mikrokontroler ESP32</span>
      </h1>
      <div className="flex flex-col w-full max-w-6xl gap-5 md:flex-row">
        {/* Chart */}
        <div className="w-full p-5 bg-white rounded-lg shadow-md md:w-2/3">
          <Line data={chartData} options={chartOptions} />
        </div>
        {/* Cards */}
        <div className="flex flex-col w-full gap-4 md:w-1/3">
          <div className="text-center text-white bg-blue-600 rounded-lg shadow-md p-7">
            <h2 className="text-sm font-semibold">Jumlah Orang Saat Ini</h2>
            <p className="mt-2 text-2xl font-bold">{visitorData.saatIni}</p>
          </div>
          <div className="text-center text-white bg-green-500 rounded-lg shadow-md p-7">
            <h2 className="text-sm font-semibold">Jumlah Orang Masuk</h2>
            <p className="mt-2 text-2xl font-bold">{visitorData.masuk}</p>
          </div>
          <div className="text-center text-white bg-red-500 rounded-lg shadow-md p-7">
            <h2 className="text-sm font-semibold">Jumlah Orang Keluar</h2>
            <p className="mt-2 text-2xl font-bold">{visitorData.keluar}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
