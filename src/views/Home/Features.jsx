// import Group1 from "../../assets/Group 71.svg"
import Group1 from "../../assets/features.png"
import Group2 from "../../assets/Group 72.svg"
import Group3 from "../../assets/Group 73.svg"

import user from "../../assets/users 2.svg"


function Features() {
    return (<>
        <div className="features">
            <div className="featuresMain flex flex-col container mx-auto mb-[3.25rem]">
                <div className="featuresHeading flex-col flex items-center justify-between p-[20px]">
                    <h2 className="font-medium text-2xl mb-3" ><span className="voilet">Our</span> <span className="orange">Features</span></h2>
                    <p className="mb-5">This very extraordinary feature, can make learning activities more efficient</p>
                </div>
                <div className="featuresBody flex items-center justify-between">
                    <div className="left">
                        <img src={Group1} alt="" />
                    </div>
                    <div className="right h-[17rem] flex flex-col justify-between">
                        <h2 className="mb-[3rem] font-semibold text-3xl  w-[90%]"><span className="voilet">A</span> <span className="orange">user interface designed for</span> <span className="voilet">the classroom</span></h2>
                        <div className="right-body flex flex-col justify-between h-full">
                            <div className="flex items-center justify-between">
                                <p><img src={Group3} alt="" /></p>
                                <p className="w-[88%]">Teachers don’t get lost in the grid view and have a dedicated Podium space.</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p><img src={Group2} alt="" /></p>
                                <p className="w-[88%]">Teachers don’t get lost in the grid view and have a dedicated Podium space.</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p><img src={user} alt="" /></p>
                                <p className="w-[88%]">Teachers don’t get lost in the grid view and have a dedicated Podium space.</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Features;