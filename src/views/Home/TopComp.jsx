import "./home.css"
import headerPic from "../../assets/headerPic.svg"
import mail from "../../assets/mail.svg"
import calender from "../../assets/calender.svg"
function Top() {
    return (<>
        <div style={{ backgroundColor: "#FFF2E1" }} className="homeTop ">
            <div className="topMain container  mx-auto  flex items-center justify-between">
                <div className="topLeft  flex  flex-col  justify-between ">
                    <div className="topHead font-bold	text-4xl	">
                        <h2><span className="spa1">Studying</span> <span className="spa2">Online is now much easier</span></h2>
                    </div>
                    <div className="topDesc font-medium	">
                        <p style={{color: '#464646'}}>Skilline is an interesting platform that will teach you in more an interactive way</p>
                    </div>
                    <div className="topJoin">
                        <button >Join for free</button>
                    </div>
                </div>
                <div className="topRight">
                    <div className="imgg-teen">
                        <img src={headerPic} alt="" />
                    </div>
                    {/* <div className="compps">
                        <img src={calender} alt="" />
                    </div> */}
                </div>
            </div>
        </div>
    </>);
}

export default Top;