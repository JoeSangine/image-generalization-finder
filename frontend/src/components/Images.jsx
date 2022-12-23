export default function Images({ real, cartoon, famous, keyword, addBadImage, famousTrueOrFalse, children }) {
    return <div className='flex m-5 rounded-lg gap-8 flex-col md:flex-row items-center md:items-stretch'>

        <div className="card w-96 bg-base-100 shadow-xl flex-auto ">
            <div className=" text-center font-bold pt-4 text-2xl text-white">
                {'Real ' + keyword}
            </div>

            <figure>
                <img src={real}
                    alt="Real"
                    className="aspect-[3/2] w-[75vw] md:w-[25vw] mt-4 max-w-[95%] rounded-lg drop-shadow-[15px_15px_5px_rgba(0,0,0,.45)] " />
            </figure>

            <div className="card-body text-center">
                <h2>
                    <button onClick={() => addBadImage(real, 'real')}
                        className="btn btn-secondary text-white">
                        REROLL
                    </button>
                </h2>
                <h3 className="drop-shadow-[10px_10px_10px_rgba(0,0,0,1)]">
                    ONLY CLICK REROLL IF YOU NEVER WANT IMAGE TO APPEAR AGAIN
                </h3>
                <div className="card-actions justify-end">

                </div>
            </div>
        </div>


        <div className="card w-96 bg-base-100 shadow-xl flex-auto">
            <div className="text-center font-bold pt-4 text-2xl text-white">
                {'Cartoon ' + keyword}
            </div>
            <figure >
                <img src={cartoon}
                    className="aspect-[3/2] w-[75vw] md:w-[25vw] mt-4 max-w-[95%] rounded-lg drop-shadow-[15px_15px_5px_rgba(0,0,0,.45)]"
                    alt="Cartoon" />
            </figure>
            <div className="card-body text-center">
                <h2>
                    <button onClick={() => addBadImage(cartoon, 'cartoon')}
                        className="btn btn-secondary text-white"> REROLL
                    </button>
                </h2>
                <h3 className="drop-shadow-[10px_10px_10px_rgba(0,0,0,1)]">
                    ONLY CLICK REROLL IF YOU NEVER WANT IMAGE TO APPEAR AGAIN
                </h3>
                <div className="card-actions justify-end">
                </div>
            </div>
        </div>


        <div className="card w-96 bg-base-100 shadow-xl flex-auto ">
            <div className="text-center font-bold pt-4 text-2xl text-white">
                {'Famous ' + keyword}

            </div>
            <figure>
                <img src={famous}
                    alt="Famous"
                    className="aspect-[3/2] w-[75vw] md:w-[25vw] mt-4 max-w-[95%] rounded-lg drop-shadow-[15px_15px_5px_rgba(0,0,0,.45)]" />
            </figure>

            <div className="card-body text-center">
                {children
                    ? <>
                        {children}
                        <p>For the Famous Image I need help. Can you please input a famous character in the text box below so that we can save it the next time you use this app :)</p>
                    </> :
                    <>
                        <h2>
                            <button onClick={() => addBadImage(famous, 'famous')}
                                className="btn btn-secondary text-white">
                                REROLL
                            </button>
                        </h2>
                        <h3 className="drop-shadow-[10px_10px_10px_rgba(0,0,0,1)]" >
                            ONLY CLICK REROLL IF YOU NEVER WANT IMAGE TO APPEAR AGAIN
                        </h3>
                    </>
                }

                <div className="card-actions justify-end">

                </div>
            </div>
        </div>


    </div >
}