function Description({desc}) {
    return (<>
        <div className="desc">
            <div className="descMian w-[43rem] text-[#52565b] border p-[20px] rounded-lg flex flex-col gap-[1rem]">
                <div>
                    <h2 className="font-medium text-xl mb-3 text-black">Description:</h2>
                    <p className="text-justify	">
                        {desc}
                    </p>
                </div>
                <div>
                    <h2 className="font-medium text-xl mb-3 text-black">Curriculam:</h2>
                    <p className="text-justify	">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularsed in the 1960 with release containing Lorem Ipsum passages desktop publishing software.
                    </p>
                </div>
                <div>
                    <h2 className="font-medium text-xl mb-3 text-black">Certification:</h2>
                    <p className="text-justify	">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularsed in the 1960 with release containing Lorem Ipsum passages desktop publishing software.</p>
                </div>
            </div>
        </div>
    </>);
}

export default Description;