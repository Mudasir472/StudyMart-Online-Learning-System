import "./home.css";
import group1 from "../../assets/Group79.svg";
import group2 from "../../assets/Group80.svg";
import group3 from "../../assets/Group81.svg";

import AllOneImggs from "./AllOneImggs";
import facebook from "../../assets/facebook.png";
import airbnb from "../../assets/airbnb.png";
import google from "../../assets/google.png";
import grab from "../../assets/grab.png";
import amazon from "../../assets/amazon.png";
import netflix from "../../assets/netflix.png";
import AllOneBtm from "./AllOneBtm";

const bottomData = [
    {
        head: "Online Billing, Invoicing, & Contracts",
        desc: "Simple and secure control of your organization’s financial and legal transactions. Send customized invoices and contracts",
        imgg: group1,
    },
    {
        head: "Easy Scheduling & Attendance Tracking",
        desc: "Schedule and reserve classrooms at one campus or multiple campuses. Keep detailed records of student attendance",
        imgg: group2,
    },
    {
        head: "Customer Tracking",
        desc: "Automate and track emails to individuals or groups. Skilline’s built-in system helps organize your organization",
        imgg: group3,
    },
];

const AllInOne = () => {
    return (
        <div className="allinone">
            <div className="oneMain container flex flex-col justify-evenly mx-auto">
                {/* Top Section */}
                <div className="flex items-center flex-col">
                    <h3
                        className="text-2xl font-medium mb-4 text-gray-500"
                    >
                        Trusted by 5,000+ Companies Worldwide
                    </h3>
                    <div className="AllImages flex items-center justify-between w-full flex-wrap gap-4">
                        <AllOneImggs img={google} alt="Google logo" />
                        <AllOneImggs img={facebook} alt="Facebook logo" />
                        <AllOneImggs img={netflix} alt="Netflix logo" />
                        <AllOneImggs img={airbnb} alt="Airbnb logo" />
                        <AllOneImggs img={amazon} alt="Amazon logo" />
                        <AllOneImggs img={grab} alt="Grab logo" />
                    </div>
                </div>

                {/* Mid Section */}
                <div className="mid flex items-center flex-col text-center px-4">
                    <h2 className="font-semibold text-3xl mb-4">
                        <span className="span1">All-In-One</span>{" "}
                        <span className="span2">Cloud Software.</span>
                    </h2>
                    <p className="w-full md:w-2/5">
                        Skilline is one powerful online software suite that combines all the tools needed to run a successful school or office.
                    </p>
                </div>

                {/* Bottom Section */}
                <div className="bottom">
                    <div className="botmMain flex items-center justify-between flex-wrap gap-8">
                        {bottomData.map((item, idx) => (
                            <AllOneBtm key={idx} {...item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllInOne;
