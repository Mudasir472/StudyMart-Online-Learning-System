import React, { useContext, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { LoginContext } from "../../../context/Context";

// Register required components
Chart.register(ArcElement, Tooltip, Legend);

const Pie = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:5000/courses`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const courses = response?.data;
                console.log(response?.data);

                // Group courses by category to avoid duplicates
                const categoryMap = courses.reduce((acc, course) => {
                    if (acc[course.name]) {
                        acc[course.name] += course.enrollCount; // Sum enrollments for the same category
                    } else {
                        acc[course.name] = course.enrollCount;
                    }
                    return acc;
                }, {});

                // Extract unique course categories and their total enrollments
                const labels = Object.keys(categoryMap);
                const enrollments = Object.values(categoryMap);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            data: enrollments,
                            backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff", "#ff9f40", "#4caf50", "#e91e63", "#2196f3",],
                            hoverOffset: 4,
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, []);
    const options = {
        responsive: true,
        cutout: "50%",
        plugins: {
            title: {
                display: true,
                text: 'Course Enrollment Distribution',
                font: {
                    size: 20,
                },
            },
            legend: {
                position: "top",
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    if (!chartData) return <p className="flex items-center justify-center"><span className="loading loading-dots loading-lg"></span></p>; // Prevent rendering if data isn't loaded yet
    return <Doughnut
        className="h-[610px] w-[1222px]"
        data={chartData}
        options={options}
    />

};


export default Pie;
