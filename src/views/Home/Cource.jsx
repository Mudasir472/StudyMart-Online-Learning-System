import { useEffect, useState } from "react";
import "./home.css"

function Cource({ img, title, description, duration = '3 Months', instructor, instructorLogo, type, price }) {
    const [logo, setLogo] = useState(instructorLogo);
    useEffect(() => {
        if (instructorLogo) {
            setLogo(instructorLogo);
        }
    }, [instructorLogo]);


    return (<>
        <div className="cource ">
            <div className="courceMain">
                <div className="card  bg-white w-96 h-[28rem]  w-full">
                    <figure className="p-4 	">
                        <img className="rounded-xl h-[175px] w-[269px]"
                            src={img}
                            alt={title} />
                    </figure>
                    <div className="card-body">
                        <div className="design flex items-center justify-between">
                            <span><i className="bi bi-columns me-2"></i> {type}</span>
                            <span><i className="bi bi-stopwatch me-2"></i>{duration}</span>
                        </div>
                        <h2 className="card-title">{title}</h2>
                        <p>{description}</p>
                        <div className="card-actions justify-end flex items-center justify-between">
                            <div className="left flex items-center ">
                                <img className="h-[39px] rounded-full" src={logo} alt="" />
                                <span className="ms-3 font-medium	">{instructor}</span>
                            </div>
                            <div className="right h-[38px] w-[88px] flex items-center justify-center rounded-lg cursor-pointer">
                                <span className="font-medium">{price}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Cource;