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
    saatIni: 0,
    masuk: [],
    keluar: [],
    labels: [],
  });

  const visitorId = "EbZa6NvY9kK7z1HHqlSE";

  // Helper function to get the formatted date and day
  const getLastSevenDays = () => {
    const dates = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date);
    }

    return dates;
  };

  // Helper function to format a date as "Day, Date Month Year"
  const formatDate = (date) => {
    const daysOfWeek = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const day = daysOfWeek[date.getDay()]; // Get the name of the day
    const dayOfMonth = date.getDate(); // Get the day of the month
    const month = date.toLocaleString("default", { month: "short" }); // Get short month name (e.g., 'Des')
    const year = date.getFullYear(); // Get the year

    // Format the string as "Day, Date Month Year" (e.g., "Rabu, 12 Des 2024")
    return `${day}, ${dayOfMonth} ${month} ${year}`;
  };

  // Fetch data from Firestore when component mounts
  const fetchData = async () => {
    try {
      // Correct usage of doc() to fetch a document reference
      const docRef = doc(db, "visitorData", visitorId);
      const docSnap = await getDoc(docRef);

      // Check if the document exists
      if (docSnap.exists()) {
        const data = docSnap.data();

        const visitorIn = data.visitorIn || [];
        const visitorOut = data.visitorOut || [];
        const currentVisitor = data.currentVisitor || 0;

        // Get last 7 days and format them for the labels
        const lastSevenDays = getLastSevenDays();
        const formattedLabels = lastSevenDays.map((date) => formatDate(date));

        // Initialize counters for each day
        const masukCount = new Array(7).fill(0);
        const keluarCount = new Array(7).fill(0);

        // Count visitors for each day in the last 7 days
        visitorIn.forEach((timestamp) => {
          const date = timestamp.toDate();
          const dayIndex = lastSevenDays.findIndex(
            (d) => d.toDateString() === date.toDateString()
          );
          if (dayIndex !== -1) {
            masukCount[dayIndex]++;
          }
        });

        visitorOut.forEach((timestamp) => {
          const date = timestamp.toDate();
          const dayIndex = lastSevenDays.findIndex(
            (d) => d.toDateString() === date.toDateString()
          );
          if (dayIndex !== -1) {
            keluarCount[dayIndex]++;
          }
        });

        setVisitorData({
          saatIni: currentVisitor,
          masuk: masukCount,
          keluar: keluarCount,
          labels: formattedLabels,
        });
      } else {
        console.log("Dokumen tidak ditemukan!");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data: ", error);
    }
  };

  useEffect(() => {
    // Fetch initial data
    fetchData();

    // Set interval to fetch data every 2 seconds
    const intervalId = setInterval(fetchData, 2000);

    // Clear the interval on component unmount to prevent memory leaks
    return () => clearInterval(intervalId);
  }, [visitorId]);

  // Data for the chart
  const chartData = {
    labels: visitorData.labels, // Use the formatted labels (days and dates)
    datasets: [
      {
        label: "Pengunjung Masuk",
        data: visitorData.masuk, // Use processed data from Firestore
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: "Pengunjung Keluar",
        data: visitorData.keluar, // Use processed data from Firestore
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
        text: "Grafik Jumlah Pengunjung Masuk dan Keluar (7 Hari Terakhir)",
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
      <div className="flex flex-col h-fit w-full max-w-6xl gap-5 md:flex-row">
        {/* Chart */}
        <div className="w-full p-5 bg-white rounded-lg shadow-md md:w-2/3">
          <Line data={chartData} options={chartOptions} />
        </div>
        {/* Cards */}
        <div className="flex flex-col min-h-full w-full justify-between gap-4 md:w-1/3">
          <div className="text-center text-white bg-blue-600 rounded-lg shadow-md p-7">
            <h2 className="text-sm font-semibold">Jumlah Orang Saat Ini</h2>
            <p className="mt-2 text-2xl font-bold">{visitorData.saatIni}</p>
          </div>
          <div className="text-center text-white bg-green-500 rounded-lg shadow-md p-7">
            <h2 className="text-sm font-semibold">Jumlah Orang Masuk</h2>
            <p className="mt-2 text-2xl font-bold">
              {visitorData.masuk.reduce((a, b) => a + b, 0)}
            </p>
          </div>
          <div className="text-center text-white bg-red-500 rounded-lg shadow-md p-7">
            <h2 className="text-sm font-semibold">Jumlah Orang Keluar</h2>
            <p className="mt-2 text-2xl font-bold">
              {visitorData.keluar.reduce((a, b) => a + b, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
