import "./home.css"
function AllOneBtm({head,desc,imgg}) {
    return (<>
        <div className="allOneBtm flex items-center justify-center relative">
            <div className="AllOneImggs absolute">
                <img className="h-[113px]" src={imgg} alt="" />
            </div>
            <div className="BtmMain flex flex-col items-center">
                <h2 className="mb-4 font-medium	text-center">{head}</h2>
                <p className="text-center w-[94%]">{desc}</p>
            </div>
        </div>
    </>);
}

export default AllOneBtm;