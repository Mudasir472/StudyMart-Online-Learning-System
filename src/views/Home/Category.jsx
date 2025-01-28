import "./home.css"
function Category({ title, desc, icon, backgroundColor, color }) {
    return (  <>
        <div className="category rounded-xl h-[19rem] w-[24%] flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-evenly h-full p-[27px] text-center">
                <div style={{ backgroundColor: backgroundColor, color: color }} className="logopart flex items-center justify-center h-[60px] w-[60px] rounded-lg">
                    <i className={`${icon} text-3xl`}></i>
                </div>
                <h2 className="font-medium	text-lg	">{title}</h2>
                <p>{desc}</p>
            </div>
        </div>
    </>);
}

export default Category;