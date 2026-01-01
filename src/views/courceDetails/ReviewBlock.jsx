import profile from "../../assets/image 12.svg";

function formatDate(createdAt) {
    const date = new Date(createdAt);
    
    const options = { month: "short", year: "numeric" }; 
    if (date ==='Invalid Date') {
        console.error("Date is undefined or null.");
        return;
    }
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));

}

function ReviewBlock({ review, index }) {
    
    return (
        <>
            <div
                className="rating border-[1px] border-current rounded-lg p-4 gap-[1rem] flex flex-col"
                key={index}
            >
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="logo">
                            <img
                                className="h-[52px] mr-2 rounded-full"
                                src={review?.author?.image?.url}
                                alt="Profile"
                            />
                        </div>
                        <div className="name">
                            <p>{review?.author?.fullname}</p>
                            <p className="starability-result" data-rating={review?.rating}></p>
                        </div>
                    </div>
                    <p>{formatDate(review?.createdAt)}</p>
                </div>
                <p className="ms-3">{review?.comment}</p>
            </div>
        </>
    );
}

export default ReviewBlock;
