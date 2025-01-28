import group from "../../assets/Group 122.svg"

function Tools() {
    return ( <>
        <div className="tools">
            <div className="toolsMain mb-[3rem] flex items-center justify-between container mx-auto" >
                <div className="left w-[34%]">
                    <h2 className="font-semibold text-3xl mb-5 w-[94%]"><span className="orange">Tools</span> <span className="voilet">For Teachers And Learners</span></h2>
                    <p>Class has a dynamic set of teaching tools built to be deployed and used during class.
                        Teachers can handout assignments in real-time for students to complete and submit.</p>
                </div>
                <div className="right me-[3rem]">
                    <img className="h-[30rem]" src={group} alt="" />
                </div>
            </div>
        </div>
    </> );
}

export default Tools;