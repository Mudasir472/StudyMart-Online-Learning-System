import { useContext, useEffect, useRef, useState } from "react";
import profile from "../../assets/image 12.svg";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ReviewBlock from "./ReviewBlock";
import { CourseContext } from "../../context/CourseProvider";
import { URI } from "../../../env";

function Review({ id }) {
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [reviews, setReviews] = useState([]);
    const [reviewData, setReviewData] = useState({ name: '', email: '', rating: 5, comment: '' }); // State for review data
    const [cources, setCources] = useState([])
    const [ratings, setRatings] = useState([0, 0, 0, 0, 0]);
    const navigate = useNavigate();
    const [newReview, setNewReview] = useState({})

    // for more reviews logic
    const [showAll, setShowAll] = useState(false);
    const { courses, setCourses, loading, error } = useContext(CourseContext);

    const handleToggle = () => {
        setShowAll((prevShowAll) => !prevShowAll);
    };
    const token = localStorage.getItem("token");
    const visibleReviews = showAll ? reviews : reviews.slice(0, 2);
    // Submit Review Handler
    const submitReview = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${URI}/review/${id}`, reviewData, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            // Update the context with the new review
            setNewReview(res?.data?.newReview)
            setCourses((prevCourses) =>
                prevCourses.map((course) =>
                    course._id === id
                        ? {
                            ...course,
                            reviews: [...(course.reviews || []), newReview],
                        }
                        : course
                )
            );
            setReviewData({ name: '', email: '', rating: 5, comment: '' });
            toast.success("Review Success");
            // Close the modal
            setIsModalOpen(false);
            navigate(`/allcources/${id}`);
        } catch (error) {
            toast.error(error?.response?.data?.error)
            setIsModalOpen(false)
        }
    };

    // Calculate ratings distribution
    useEffect(() => {
        const counts = [0, 0, 0, 0, 0];
        reviews.forEach((review) => {
            counts[review.rating - 1] += 1; // Assuming `review.rating` is 1-5
        });

        // Convert counts to percentages
        const total = reviews.length || 1; // Avoid division by zero
        const percentages = counts.map((count) => (count / total) * 100);
        setRatings(percentages);
    }, [reviews]);
    // Cource Data
    useEffect(() => {
        const fetchCourceData = async (id) => {
            try {
                const response = await axios.get(`${URI}/getcourse`, { withCredentials: true });
                setCources(response.data?.Allcources)


            } catch (error) {
                console.error("Error fetching listing data:", error);
                toast.error("Error")
            }
            // finally {
            //     // setLoading(false);
            // }
        };
        fetchCourceData();
        // setDeleteReview(false)
    }, [reviewData]);

    useEffect(() => {
        if (!cources.length) return;
        const cource = cources.find((item) => item._id === id);
        if (cource) {
            // setListingOwner(listing?.owner);
            setReviews(cource.reviews || []);
        }

    }, [cources, id]);

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setReviewData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <>
            <div className="review">
                <div className="reviewMain flex flex-col gap-[3.5rem] bg-[#9dccff4d] w-[43rem] p-[41px] border rounded-xl">
                    <div className="top w-full flex items-center justify-between">
                        <div className="left rounded-xl p-[20px] h-[10rem] w-[14rem] flex flex-col items-center bg-white justify-between">
                            <p className="font-medium text-lg">
                                {(ratings.reduce((sum, rating, index) => sum + (rating / 100) * (index + 1), 0)).toFixed(1)} out of 5
                            </p>
                            <p className="starability-result"
                                data-rating={Math.round(ratings.reduce((sum, rating, index) => sum + (rating / 100) * (index + 1), 0))}>
                            </p>

                            <p>Top Rating</p>
                        </div>
                        <div className="right w-[55%]">
                            {ratings
                                .slice() // Create a shallow copy to avoid mutating the original array
                                .reverse()
                                .map((value, index) => (
                                    <p key={index}>
                                        {ratings.length - index} stars
                                        <span className="ms-4">
                                            <progress
                                                style={{ color: "#F48C06", backgroundColor: "#D9D9D9" }}
                                                className="w-[16rem] progress"
                                                value={value}
                                                max="100"
                                            ></progress>
                                        </span>
                                    </p>
                                ))}
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="reviews flex flex-col gap-[1rem]">
                            {visibleReviews.map((review, index) => (
                                <ReviewBlock review={review} index={index} />
                            ))}
                            <hr />
                            {reviews.length > 2 && (
                                <div className="flex items-center justify-center">
                                    <button
                                        className="text-lg border-2 border-current w-[29%]	 text-[#F48C06] rounded-lg h-[40px] "
                                        onClick={handleToggle}
                                    >
                                        {showAll ? "Show Less" : "More..."}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <button
                        className="font-medium text-lg bg-[#F48C06] rounded-lg h-[46px] w-[29%] text-white"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Write a Review
                    </button>

                    {isModalOpen && (
                        <div className="modal-overlay fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="modal-box bg-white rounded-lg p-6">
                                <h3 className="font-bold text-lg mb-4">Add a Review</h3>
                                <form onSubmit={submitReview} className="space-y-6">

                                    <fieldset className="starability-slot">
                                        <input
                                            type="radio"
                                            id="rate-1"
                                            name="rating"
                                            value="1"
                                            checked={reviewData.rating === '1'}
                                            onChange={handleReviewChange}
                                        />
                                        <label htmlFor="rate-1" title="1 star"></label>
                                        <input
                                            type="radio"
                                            id="rate-2"
                                            name="rating"
                                            value="2"
                                            checked={reviewData.rating === '2'}
                                            onChange={handleReviewChange}
                                        />
                                        <label htmlFor="rate-2" title="2 stars"></label>
                                        <input
                                            type="radio"
                                            id="rate-3"
                                            name="rating"
                                            value="3"
                                            checked={reviewData.rating === '3'}
                                            onChange={handleReviewChange}
                                        />
                                        <label htmlFor="rate-3" title="3 stars"></label>
                                        <input
                                            type="radio"
                                            id="rate-4"
                                            name="rating"
                                            value="4"
                                            checked={reviewData.rating === '4'}
                                            onChange={handleReviewChange}
                                        />
                                        <label htmlFor="rate-4" title="4 stars"></label>
                                        <input
                                            type="radio"
                                            id="rate-5"
                                            name="rating"
                                            value="5"
                                            checked={reviewData.rating === '5'}
                                            onChange={handleReviewChange}
                                        />
                                        <label htmlFor="rate-5" title="5 stars"></label>
                                    </fieldset>
                                    <div>
                                        <label htmlFor="comment" className="block text-sm/6 font-medium text-gray-900">
                                            Comment
                                        </label>
                                        <div className="mt-2">

                                            <textarea className="textarea textarea-bordered onfocus:border"
                                                placeholder="Your Comment"
                                                name="comment"
                                                id="comment"
                                                rows="6"
                                                value={reviewData.comment}
                                                onChange={handleReviewChange}
                                                cols="35"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold bg-[#F48C06] text-white"
                                        >
                                            Submit Review
                                        </button>
                                    </div>
                                </form>
                                <button
                                    onClick={() => setIsModalOpen(false)} // Close modal
                                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Review;
