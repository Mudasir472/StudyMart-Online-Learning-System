import group from "../../assets/Group 92.svg"

function Quiz() {
    return (<>
        <div className="wuiz">
            <div className="quizMain flex items-center justify-between container mx-auto">
                <div className="left">
                    <img className="h-[33rem]" src={group} alt="" />
                </div>
                <div className="right w-1/2 flex flex-col">
                    <div className="w-[66%]">
                        <h2 className="font-semibold text-3xl mb-5"><span className="voilet">Assessments,</span><span className="orange">Quizzes,</span> <span className="voilet">Tests</span></h2>
                        <p>Easily launch live assignments, quizzes, and tests.
                        Student results are automatically entered in the online gradebook.</p>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Quiz;