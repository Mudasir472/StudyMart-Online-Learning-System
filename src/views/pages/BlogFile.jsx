import img from '../../assets/blog-01.webp'

function BlogFile() {
    return (<>
        <div className="blogfile border rounded-lg p-[1.5rem] w-[31%]">
            <div className="flex flex-col gap-[1.4rem] ">
                <div className="imgg">
                    <img className='w-full rounded-lg' src={img} alt="" />
                </div>
                <div className="teacher flex items-center justify-between">
                    <div className='flex items-center'>
                        <img className='h-[40px]' src={`https://res.cloudinary.com/dh7fvtv7e/image/upload/v1737901563/StudyMart/e9budaz1hcxwfccvy9e5.png`} alt="" />
                        <p className='ms-3 font-medium '>Mudasir</p>
                    </div>
                    <div className='p-[10px] w-[98px] flex items-center justify-center rounded-lg bg-[#fff2e1] transition-all duration-300 ease-in-out hover:bg-[#f48c06] hover:text-white'><p>Science</p></div>
                </div>
                <h2 className='font-medium text-xl'>Data Science and Machine Learning with Python - Hands On!</h2>
                <div className="date flex items-center justify-between">
                    <p><span><i class="bi bi-calendar text-xl me-3"></i></span>21 March, 2021</p>
                    <p className='flex items-center'><span><i class="bi bi-heart-fill text-2xl me-3 text-[#f48c06]"></i></span>90 likes</p>
                </div>
                <button className='p-[12px] bg-[#fff2e1] w-[138px] rounded-lg transition-all duration-300 ease-in-out hover:bg-[#f48c06] hover:text-white'>
                    Read more
                </button>

            </div>
        </div>
    </>);
}

export default BlogFile;