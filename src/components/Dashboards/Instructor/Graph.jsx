import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { LoginContext } from "../../../context/Context";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

function Graph() {
    const { loginData, setLoginData } = useContext(LoginContext);
    const [teacherId, setTeacherId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [revenue, setRevenue] = useState(null);
    const [enrolls, setEnrolls] = useState(true);

    const [monthlyData, setMonthlyData] = useState([]);

    useEffect(() => {
        // if (!loginData?._id) return;
        setTeacherId(loginData?._id);
        const fetchDonations = async () => {
            try {
                const token = localStorage.getItem("token");
                const resp = await axios.get(`http://localhost:5000/monthly-payments/${loginData?._id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (resp.data.success) {
                    setMonthlyData(resp.data.data);  // Update state with the data from the response
                    setRevenue(resp?.data?.totalEarnings)
                    setEnrolls(resp?.data?.totalEnrollments)
                }
                console.log(resp);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDonations();

    }, []);
    console.log(monthlyData);

    return (
        <>
            <div className="dashboard container ">
                <div className="dashboard-main gap-[2rem] container mx-auto flex flex-col items-center justify-evenly">
                    <h3>Dashboard</h3>
                    <div className="graph-top">
                        <div className="flex items-center gap-[2rem]">
                            <div className="flex flex-col items-center h-[7rem] w-[11rem] rounded-lg justify-center gap-[0.7rem] bg-white">
                                <p className="font-medium">Total Revenue</p>
                                <p className="">{`$${revenue}`}</p>
                            </div>
                            <div className="flex flex-col items-center h-[7rem] w-[11rem] rounded-lg justify-center gap-[0.7rem] bg-[#bcbfff]">
                                <p className="font-medium">Total Enrollments</p>
                                <p>{`${enrolls.toLocaleString('en-IN')}`}</p>

                            </div>
                            <div className="flex flex-col items-center h-[7rem] w-[11rem] rounded-lg justify-center gap-[0.7rem] bg-[#98e6ff]">
                                <p className="font-medium">Total Cources</p>
                                <p>{loginData?.courses?.length}</p>

                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <p>Loading data...</p>
                    ) : (
                        <>
                            <div className="chartMain bg-white p-[25px]  rounded-lg">

                                <Line style={{ height: '383px', width: '70rem' }}
                                    data={{
                                        labels: monthlyData.map((data) => data.month), // Mapping months to labels
                                        datasets: [
                                            {
                                                label: "Monthly Earned",
                                                data: monthlyData.map((data) => data.totalAmount), // Data for each month
                                                backgroundColor: "#5459c3",
                                                borderColor: "#5459c3",
                                                borderWidth: 2,
                                                fill: false,
                                            },
                                        ],
                                    }}
                                    options={{
                                        elements: {
                                            line: {
                                                tension: 0.5,
                                            },
                                        },
                                        plugins: {
                                            title: {
                                                text: "Payments Over Time",
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Graph;
