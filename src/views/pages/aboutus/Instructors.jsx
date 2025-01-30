import img from "../../../assets/mern.webp"
function Instructors({ instructor }) {
    return (<>
        <div className="instructors p-[19px] flex flex-col items-center">
            <div className="rounded-full border hover:border-[#f48c06] mb-4">
                <img className="h-[136px] m-[15px] rounded-full " src={instructor?.image?.url} alt="" />
            </div>
            <p className="font-medium text-xl">{instructor?.fullname}</p>
            <p className="text-[#f48c06]">{`${instructor?.skills?.length ? instructor.skills[0] : ""}, Instructor`}</p>
        </div>
    </>);
}

export default Instructors;