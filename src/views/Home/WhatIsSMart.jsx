import "./home.css"
import group1 from "../../assets/Group 22.png"
import group2 from "../../assets/Group 23.png"
import group3 from "../../assets/Group 17.png"
function WhatIsSMart() {
    return (<>
        <div className="SMart">
            <div className="smartMain flex flex-col justify-evenly container mx-auto">
                <div className="marttop flex flex-col items-center " >
                    <h2 className="mb-5 text-4xl font-semibold	"><span className="voilet">What is</span> <span className="orange">Skilline?</span></h2>
                    <p style={{ color: '#696984' }} className="w-[59%] text-center mb-6">Skilline is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exams; monitor due dates; grade results and provide students with feedback all in one place.</p>
                    <div className="martImgs1 text-white w-full flex items-center justify-evenly ">
                        <div className="relative">
                            <div className=" flex flex-col items-center absolute left-[29%] top-[35%] ">
                                <h2 className="mb-4 text-2xl font-medium	">{"For instructors".toUpperCase()}</h2>
                                <button className="instructBtn border-2	rounded-3xl bg-transparent transition transform hover:scale-105">Start a class today</button>
                            </div>
                            <img src={group1} alt="#60a5fa" />
                        </div>
                        <div className="relative">
                            <div className="flex flex-col items-center absolute left-[29%] top-[35%] ">
                                <h2 className=" mb-4 text-2xl font-medium">{"For students".toUpperCase()}</h2>
                                <button className="accessBtn border-2	rounded-3xl bg-opacity-75 transition transform hover:scale-105 hover:bg-opacity-0">Enter access code</button>
                            </div>
                            <img src={group2} alt="" />
                        </div>
                    </div>
                </div>
                <div className="martbtm flex justify-between items-center">
                    <div className="classroom w-[40%]">
                        <h2 className="text-2xl	mb-5 font-medium" ><span className="span2">Everything you can do in a physical classroom,</span><span className="span1"> you can do with Skilline</span></h2>
                        <p className="mb-5">Skilline’s school management software helps traditional and online schools manage scheduling, attendance, payments and virtual classrooms all in one secure cloud-based system.</p>
                    </div>
                    <div className="classImgg">
                        <img className="h-[22rem]" src={group3} alt="" />
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default WhatIsSMart;