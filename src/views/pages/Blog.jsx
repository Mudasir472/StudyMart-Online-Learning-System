import Recomended from "../Home/Recomended";
import BlogFile from "./BlogFile";

function Blog() {
    return (<>
        <div className="blog my-[2.5rem] container mx-auto">
            <div className="blogMain flex flex-wrap gap-[2rem]">
                <BlogFile />
                <BlogFile />
                <BlogFile />
            </div>
            
        </div>
        <div>
            <Recomended />
        </div>
    </>);
}

export default Blog;