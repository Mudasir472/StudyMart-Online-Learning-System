import Category from "./Category";

function Categories() {
    const categoriesData = [
        {
            title: "Design",
            desc: "Learn the art of creating visually appealing designs, from graphics to user interfaces.",
            icon: "bi bi-brush-fill", // Replace with an actual icon if needed
            backgroundColor: "rgb(73 187 189 / 30%)", // Light teal background
            color: "rgb(73, 187, 189)", // Teal color
        },
        {
            title: "Development",
            desc: "Build robust and scalable software applications with modern programming languages.",
            icon: "bi bi-laptop", // Replace with an actual icon if needed
            backgroundColor: "rgb(91 114 238 / 30%)", // Light teal background
            color: "rgb(91, 114, 238)", // Teal color
        },
        {
            title: "Web Development",
            desc: "Create dynamic websites and web applications using HTML, CSS, and JavaScript frameworks.",
            icon: "bi bi-database-fill", // Replace with an actual icon if needed
            backgroundColor: "rgb(157 204 255 / 30%)", // Light purple background
            color: "rgb(157, 204, 255)", // Purple color
        },
        {
            title: "Business",
            desc: "Master business strategies, management, and entrepreneurship skills to succeed in the corporate world.",
            icon: "bi bi-briefcase", // Replace with an actual icon if needed
            backgroundColor: "rgb(0 203 184 / 30%)", // Light teal background
            color: "rgb(0, 203, 184)", // Teal color
        },
        {
            title: "Marketing",
            desc: "Explore techniques to promote products and services effectively and reach your target audience.",
            icon: "bi bi-shop-window", // Replace with an actual icon if needed
            backgroundColor: "rgb(244 140 6 / 30%)", // Light yellow background
            color: "rgb(244, 140, 6)", // Yellow color
        },
        {
            title: "Photography",
            desc: "Discover the world of photography, from capturing moments to editing stunning visuals.",
            icon: "bi bi-camera", // Replace with an actual icon if needed
            backgroundColor: "rgb(238 100 91 / 30%)", // Light pink background
            color: "rgb(238, 100, 91)", // Red color
        },
        {
            title: "Acting",
            desc: "Learn the fundamentals of acting and performance for theater, film, and television.",
            icon: "bi bi-camera-reels", // Replace with an actual icon if needed
            backgroundColor: "rgb(37 38 65 / 30%)", // Light grayish purple background
            color: "rgb(37, 38, 65)", // Blue color
        },
        {
            title: "Business",
            desc: "Develop insights into finance, marketing, and organizational behavior for business success.",
            icon: "bi bi-briefcase", // Replace with an actual icon if needed
            backgroundColor: "rgb(0 203 184 / 30%)", // Light teal background
            color: "rgb(0, 203, 184)", // Teal color
        },
    ];

    return (<>
        <div className="categories container mx-auto">
            <div className="categoriesMain py-[5rem]">
                <h2 className="font-medium	mb-5 text-lg">Choice favourite course from top category</h2>
                <div className="flex  items-center flex-wrap gap-[1rem]">
                    {categoriesData.map((category, index) => (
                        <Category
                            key={index}
                            title={category.title}
                            desc={category.desc}
                            icon={category.icon}
                            backgroundColor={category.backgroundColor}
                            color={category.color}
                        />
                    ))}
                </div>
            </div>
        </div>
    </>);
}

export default Categories;