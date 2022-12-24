export default function Images({ real, cartoon, famous, keyword, badImages, addBadImage, undoBadImage, famousTrueOrFalse, children }) {
    return <div className='flex m-5 rounded-lg gap-8 flex-col md:flex-row items-center md:items-stretch'>

        <div className="card w-96 bg-base-100 shadow-xl flex-auto ">
            <div className=" text-center font-bold pt-4 text-2xl text-white">
                {'Real ' + keyword}
            </div>

            <figure>
                <img src={real}
                    alt="Real"
                    className="aspect-[3/2] w-[75vw] md:w-[25vw] mt-4 max-w-[95%] rounded-lg drop-shadow-[15px_15px_5px_rgba(0,0,0,.45)] "
                    onError={() => addBadImage(real, 'real')}
                />
            </figure>

            <div className="card-body text-center">
                <h2>
                    {/* Modal 1 start */}
                    <input
                        type="checkbox"
                        id="my-modalReroll1"
                        className="modal-toggle" />

                    <div className="modal bg-opacity-90">
                        <div className="modal-box">
                            <h3 className=" pb-5  drop-shadow-[10px_10px_10px_rgba(0,0,0,1)]" >
                                ONLY CLICK REROLL IF YOU NEVER WANT IMAGE TO APPEAR AGAIN
                            </h3>
                            {/* reroll button */}
                            <label htmlFor="my-modalReroll1" onClick={() => addBadImage(real, 'real')}
                                className="btn btn-primary text-white">
                                REROLL
                            </label>
                            {/* reroll button */}
                            <label
                                htmlFor="my-modalReroll1"
                                className="ml-8 flex-auto btn btn-secondary">
                                Exit!
                            </label>
                        </div>
                    </div>
                    <div class="flex pl-12 px-5 pr-4 gap-5 text-center max-w-[95%]">
                        <label
                            htmlFor="my-modalReroll1"
                            className="flex-auto btn w-[50%] btn-primary text-white">
                            Reroll
                        </label>
                        <button onClick={() => undoBadImage('real')} disabled={!badImages.some(bad => bad.type === 'real')}
                            className="flex-auto w-[50%] btn btn-secondary text-white"> Undo
                        </button>
                    </div>
                    {/* Modal 1 end */}

                </h2>
                <div className="card-actions justify-end">
                    <div class="tooltip tooltip-left" data-tip="Click Widget Here To Add Custom Input">
                        <i class="fa-solid fa-gear"></i>
                    </div>
                </div>
            </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl flex-auto">
            <div className="text-center font-bold pt-4 text-2xl text-white">
                {'Cartoon ' + keyword}
            </div>
            <figure >
                <img
                    src={cartoon}
                    className="aspect-[3/2] w-[75vw] md:w-[25vw] mt-4 max-w-[95%] rounded-lg drop-shadow-[15px_15px_5px_rgba(0,0,0,.45)]"
                    alt="Cartoon"
                    onError={() => addBadImage(cartoon, 'cartoon')}
                />
            </figure>
            <div className="card-body text-center">
                <h2>
                    {/* Modal 2 start */}

                    <input
                        type="checkbox"
                        id="my-modalReroll2"
                        className="modal-toggle" />
                    <div className="modal bg-opacity-90">
                        <div className="modal-box">
                            <h3 className="pb-5 drop-shadow-[10px_10px_10px_rgba(0,0,0,1)]" >
                                ONLY CLICK REROLL IF YOU NEVER WANT IMAGE TO APPEAR AGAIN
                            </h3>
                            {/* reroll button */}
                            <label htmlFor="my-modalReroll2" onClick={() => addBadImage(cartoon, 'cartoon')}
                                className="btn btn-primary text-white">
                                REROLL
                            </label>
                            {/* reroll button */}
                            <label
                                htmlFor="my-modalReroll2"
                                className="ml-8 flex-auto btn btn-secondary">
                                Exit!
                            </label>
                        </div>
                    </div>
                    <div class="flex pl-12 px-5 pr-4 gap-5 text-center max-w-[95%]">
                        <label
                            htmlFor="my-modalReroll2"
                            className="flex-auto btn w-[50%] btn-primary text-white">
                            Reroll
                        </label>
                        {/* Modal 2 end */}


                        <button onClick={() => undoBadImage('cartoon')} disabled={!badImages.some(bad => bad.type === 'cartoon')}
                            className="flex-auto w-[50%] btn btn-secondary text-white"> Undo
                        </button>
                    </div>
                </h2>
                <div className="card-actions justify-end">
                    <div class="tooltip tooltip-left" data-tip="Click Widget Here To Add Custom Input">
                        <i class="fa-solid fa-gear"></i>
                    </div>
                </div>
            </div>
        </div>


        <div className="card w-96 bg-base-100 shadow-xl flex-auto ">
            <div className="text-center font-bold pt-4 text-2xl text-white">
                {'Famous ' + keyword}

            </div>
            <figure>
                <img
                    src={famous}
                    alt="Famous"
                    className="aspect-[3/2] w-[75vw] md:w-[25vw] mt-4 max-w-[95%] rounded-lg drop-shadow-[15px_15px_5px_rgba(0,0,0,.45)]"
                    onError={() => addBadImage(famous, 'famous')}
                />
            </figure>

            <div className="card-body text-center">
                {children
                    ? <>
                        {children}
                        <p>For the Famous Image I need help. Can you please input a famous character in the text box below so that we can save it the next time you use this app :)</p>
                    </> :
                    <>
                        <h2>
                            {/* Modal 3 start */}
                            <input
                                type="checkbox"
                                id="my-modalReroll3"
                                className="modal-toggle" />

                            <div className="modal bg-opacity-90">
                                <div className="modal-box">
                                    <h3 className="pb-5 drop-shadow-[10px_10px_10px_rgba(0,0,0,1)]" >
                                        ONLY CLICK REROLL IF YOU NEVER WANT IMAGE TO APPEAR AGAIN
                                    </h3>
                                    {/* reroll button */}
                                    <label onClick={() => addBadImage(famous, 'famous')}
                                        className="btn btn-primary  text-white"
                                        htmlFor="my-modalReroll3">
                                        REROLL
                                    </label>
                                    {/* reroll button */}
                                    <label
                                        htmlFor="my-modalReroll3"
                                        className="ml-8 flex-auto btn btn-secondary">
                                        Exit!
                                    </label>
                                </div>
                            </div>
                            <div class="flex pl-12 px-5 pr-4 gap-5 text-center max-w-[95%]">
                                <label
                                    htmlFor="my-modalReroll3"
                                    className="flex-auto btn w-[50%] btn-primary text-white">
                                    Reroll
                                </label>
                                {/* modal3 end */}
                                <button onClick={() => undoBadImage('famous')} disabled={!badImages.some(bad => bad.type === 'famous')}
                                    className="flex-auto btn w-[50%] btn-secondary text-white"> Undo
                                </button>
                            </div>
                        </h2>

                    </>
                }

                <div className="card-actions justify-end">
                    <div class="tooltip tooltip-left" data-tip="Click Widget Here To Add Custom Input">
                        <i class="fa-solid fa-gear"></i>
                    </div>
                </div>
            </div>
        </div>


    </div >
}