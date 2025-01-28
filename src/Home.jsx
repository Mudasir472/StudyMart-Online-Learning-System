import AllCources from "./views/Home/AllCources";
import AllInOne from "./views/Home/AllInOne";
import Categories from "./views/Home/Categories";
import Features from "./views/Home/Features";
import Quiz from "./views/Home/Quiz";
import Recomended from "./views/Home/Recomended";
import Tools from "./views/Home/Tools";
import Top from "./views/Home/TopComp"
import WhatIsSMart from "./views/Home/WhatIsSMart";

function Home() {
    return (<>
        <div className="Home">
            <div className="homeMain ">
                <div className="top ">
                    <Top />
                    <AllInOne />
                    <WhatIsSMart />
                    <AllCources />
                    <Recomended />
                    <Categories />
                    <Features />
                    <Tools />
                    <Quiz/>
                </div>
            </div>
        </div>
    </>);
}

export default Home;