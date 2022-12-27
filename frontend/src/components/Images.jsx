import { useState } from 'react'

export default function Images({ real, cartoon, famous, keyword, badImages, addBadImage, undoBadImage, submitCustomQuery, customQueries, user, showRerollDialog, setShowRerollDialog }) {
    const [editingRealQuery, setEditingRealQuery] = useState(false)
    const [editingCartoonQuery, setEditingCartoonQuery] = useState(false)
    const [editingFamousQuery, setEditingFamousQuery] = useState(false)
    return <div className='flex m-5 rounded-lg gap-8 flex-col md:flex-row items-center md:items-stretch'>

        <div className="card w-96 bg-base-100 shadow-xl flex-auto border-2 border-[#ffffff50]">
            <div className=" text-center font-bold pt-4 text-2xl text-white">
                {'Real ' + (keyword || 'Owl')}
            </div>

            <figure>
                {real ? <img src={real}
                    alt="Real"
                    className="aspect-[3/2] w-[75vw] md:w-[50vw] mt-4 max-w-[95%] rounded-lg drop-shadow-[15px_15px_5px_rgba(0,0,0,.45)] "
                    xmlns="http://placekitten.com/200/300"


                    onError={() => addBadImage(real, 'real')}
                /> : !keyword ? <img src="https://pazlspb.ru/sites/default/files/styles/catmed/public/uploads/1222/pazl_super_3d_nochnoy_strazh_500_elementov.jpg"
                    alt="Real"
                    className="aspect-[3/2] w-[75vw] md:w-[50vw] mt-4 max-w-[95%] rounded-lg drop-shadow-[15px_15px_5px_rgba(0,0,0,.45)] "
                /> : <svg className={`${keyword ? 'animate-pulse' : ''} aspect-[3/2] w-[75vw] md:w-[50vw] mt-4 max-w-[95%] rounded-lg drop-shadow-[15px_15px_5px_rgba(0,0,0,.45)]`} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>}
            </figure>

            <div className="card-body text-center">
                {user && editingRealQuery ? (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitCustomQuery('real', e.target.elements[0].value).then(() => setEditingRealQuery(false));
                        }}
                        className="text-center"
                    >
                        <input
                            className="input input-bordered input-secondary col-3 form-control-sm py-1 fs-4 text-capitalize border border-3 drop-shadow-[0_0_25px_rgba(225,225,225,.10)] border-dark "
                            type="text"
                            placeholder="Enter Real Figure..."
                            defaultValue={customQueries.real?.convertedQuery || ''}
                        />

                        <button type="submit" className="btn btn-secondary ml-5">Submit</button>
                    </form>
                ) : <h2>
                    {/* Modal 1 start */}
                    <input
                        type="checkbox"
                        id="my-modalReroll1"
                        className="modal-toggle" />

                    <label htmlFor="my-modalReroll1" className="modal bg-opacity-90 cursor-pointer">
                        <label className="modal-box" htmlFor="">
                            <div>
                                <h3 className="pb-5 drop-shadow-[10px_10px_10px_rgba(0,0,0,1)]" >
                                    ONLY CLICK REROLL IF YOU NEVER WANT IMAGE TO APPEAR AGAIN
                                </h3>
                                <label className="label cursor-pointer">
                                    <span className="label-text">Show Dialog Again</span>
                                    <input type="checkbox" checked={showRerollDialog} className="checkbox" onChange={(e) => setShowRerollDialog(e.currentTarget.checked)} />
                                </label>
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
                        </label>
                    </label>
                    <div class="flex pl-12 px-5 pr-4 gap-5 text-center max-w-[95%]">
                        <label
                            htmlFor="my-modalReroll1"
                            className="flex-auto btn w-[50%] btn-primary text-white"
                            onClick={(e) => {
                                if (!showRerollDialog) {
                                    e.preventDefault()
                                    addBadImage(real, 'real')
                                }
                            }}
                            disabled={!keyword}
                        >
                            Reroll
                        </label>
                        <button onClick={() => undoBadImage('real')} disabled={!badImages.some(bad => bad.type === 'real')}
                            className="flex-auto w-[50%] btn btn-secondary text-white"> Undo
                        </button>
                    </div>
                    {/* Modal 1 end */}

                </h2>
                }
                <div className="card-actions justify-end">
                    <div class="tooltip tooltip-left" data-tip="Click Widget Here To Add Custom Input">
                        <i class="fa-solid fa-gear cursor-pointer" onClick={() => setEditingRealQuery(p => !p)}></i>
                    </div>
                </div>
            </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl flex-auto border-2 border-[#ffffff50]">
            <div className="text-center font-bold pt-4 text-2xl text-white">
                {'Cartoon ' + (keyword || 'Owl')}
            </div>
            <figure >
                {cartoon ? <img
                    src={cartoon}
                    className="aspect-[3/2] w-[75vw] md:w-[50vw] mt-4 max-w-[95%] rounded-lg drop-shadow-[15px_15px_5px_rgba(0,0,0,.45)]"
                    alt="Cartoon"
                    onError={() => addBadImage(cartoon, 'cartoon')}
                /> : !keyword ? <img src="https://i.pinimg.com/736x/8e/c7/e9/8ec7e96bf97de75431d67a79a012ca24.jpg"
                    alt="Cartoon"
                    className="aspect-[3/2] w-[75vw] md:w-[50vw] mt-4 max-w-[95%] rounded-lg drop-shadow-[15px_15px_5px_rgba(0,0,0,.45)] "
                /> : <svg className={`${keyword ? 'animate-pulse' : ''} aspect-[3/2] w-[75vw] md:w-[50vw] mt-4 max-w-[95%] rounded-lg drop-shadow-[15px_15px_5px_rgba(0,0,0,.45)]`} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>}
            </figure>
            <div className="card-body text-center">
                {user && editingCartoonQuery ? (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitCustomQuery('cartoon', e.target.elements[0].value).then(() => setEditingCartoonQuery(false));
                        }}
                        className="text-center"
                    >
                        <input
                            className="input input-bordered input-secondary col-3 form-control-sm py-1 fs-4 text-capitalize border border-3 drop-shadow-[0_0_25px_rgba(225,225,225,.10)] border-dark "
                            type="text"
                            placeholder="Enter Cartoon Figure..."
                            defaultValue={customQueries.cartoon?.convertedQuery || ''}
                        />

                        <button type="submit" className="btn btn-secondary ml-5">Submit</button>
                    </form>
                ) : <h2>
                    {/* Modal 2 start */}
                    <input
                        type="checkbox"
                        id="my-modalReroll2"
                        className="modal-toggle" />

                    <label htmlFor="my-modalReroll2" className="modal bg-opacity-90 cursor-pointer">
                        <label className="modal-box" htmlFor="">
                            <div>
                                <h3 className="pb-5 drop-shadow-[10px_10px_10px_rgba(0,0,0,1)]" >
                                    ONLY CLICK REROLL IF YOU NEVER WANT IMAGE TO APPEAR AGAIN
                                </h3>
                                <label className="label cursor-pointer">
                                    <span className="label-text">Show Dialog Again</span>
                                    <input type="checkbox" checked={showRerollDialog} className="checkbox" onChange={(e) => setShowRerollDialog(e.currentTarget.checked)} />
                                </label>
                                {/* reroll button */}
                                <label htmlFor="my-modalReroll1" onClick={() => addBadImage(real, 'real')}
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
                        </label>
                    </label>
                    <div class="flex pl-12 px-5 pr-4 gap-5 text-center max-w-[95%]">
                        <label
                            htmlFor="my-modalReroll2"
                            onClick={(e) => {
                                if (!showRerollDialog) {
                                    e.preventDefault()
                                    addBadImage(cartoon, 'cartoon')
                                }
                            }}
                            disabled={!keyword}
                            className="flex-auto btn w-[50%] btn-primary text-white">
                            Reroll
                        </label>

                        {/* Modal 2 end */}


                        <button onClick={() => undoBadImage('cartoon')} disabled={!badImages.some(bad => bad.type === 'cartoon')}
                            className="flex-auto w-[50%] btn btn-secondary text-white"> Undo
                        </button>
                    </div>
                </h2>
                }
                <div className="card-actions justify-end">
                    <div class="tooltip tooltip-left" data-tip="Click Widget Here To Add Custom Input">
                        <i class="fa-solid fa-gear cursor-pointer" onClick={() => setEditingCartoonQuery(p => !p)}></i>
                    </div>
                </div>
            </div>
        </div>


        <div className="card w-96 bg-base-100 shadow-xl flex-auto border-2 border-[#ffffff50] ">
            <div className="text-center font-bold pt-4 text-2xl text-white">
                {'Famous ' + (keyword || 'Owl')}

            </div>
            <figure>
                {customQueries.famous && famous ? <img
                    src={famous}
                    alt="Famous"
                    className="aspect-[3/2] w-[75vw] md:w-[50vw] mt-4 max-w-[95%] rounded-lg drop-shadow-[15px_15px_5px_rgba(0,0,0,.45)]"
                    onError={() => addBadImage(famous, 'famous')}
                /> : !keyword ? <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f918f41c-9b07-4abc-b8d0-c27a1602ae90/daoln0v-369faaed-6057-4369-8599-5571b40091b9.jpg/v1/fill/w_1024,h_719,q_75,strp/harry_potter_by_opheliac98-daoln0v.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi9mOTE4ZjQxYy05YjA3LTRhYmMtYjhkMC1jMjdhMTYwMmFlOTAvZGFvbG4wdi0zNjlmYWFlZC02MDU3LTQzNjktODU5OS01NTcxYjQwMDkxYjkuanBnIiwid2lkdGgiOiI8PTEwMjQiLCJoZWlnaHQiOiI8PTcxOSJ9XV19.LjpKhmrE0QmrFxdrlwyGsp0N9xj4QR9Su8PPNlkAXRM"
                    alt="Famous"
                    className="aspect-[3/2] w-[75vw] md:w-[50vw] mt-4 max-w-[95%] rounded-lg drop-shadow-[15px_15px_5px_rgba(0,0,0,.45)] "
                /> : <svg className={`${keyword ? 'animate-pulse' : ''} aspect-[3/2] w-[75vw] md:w-[50vw] mt-4 max-w-[95%] rounded-lg drop-shadow-[15px_15px_5px_rgba(0,0,0,.45)]`} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>}
            </figure>

            <div className="card-body text-center">
                {user && (!customQueries.famous || editingFamousQuery) ? (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitCustomQuery('famous', e.target.elements[0].value).then(() => setEditingFamousQuery(false));;
                        }}
                        className="text-center"
                    >
                        <input
                            className="input input-bordered input-secondary col-3 form-control-sm py-1 fs-4 text-capitalize border border-3 drop-shadow-[0_0_25px_rgba(225,225,225,.10)] border-dark "
                            type="text"
                            placeholder="Enter Famous Figure..."
                            defaultValue={customQueries.famous?.convertedQuery || ''}
                        />

                        <button type="submit" className="btn btn-secondary ml-5">Submit</button>

                        <p className="pt-2">For the Famous Image I need help. Can you please input a famous character in the text box below so that we can save it the next time you use this app :)</p>
                    </form>
                ) :
                    <h2>
                        {/* Modal 3 start */}
                        <input
                            type="checkbox"
                            id="my-modalReroll3"
                            className="modal-toggle" />

                        <label htmlFor="my-modalReroll3" className="modal bg-opacity-90 cursor-pointer">
                            <label className="modal-box" htmlFor="">
                                <div>
                                    <h3 className="pb-5 drop-shadow-[10px_10px_10px_rgba(0,0,0,1)]" >
                                        ONLY CLICK REROLL IF YOU NEVER WANT IMAGE TO APPEAR AGAIN
                                    </h3>
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Show Dialog Again</span>
                                        <input type="checkbox" checked={showRerollDialog} className="checkbox" onChange={(e) => setShowRerollDialog(e.currentTarget.checked)} />
                                    </label>
                                    {/* reroll button */}
                                    <label htmlFor="my-modalReroll3" onClick={() => addBadImage(real, 'real')}
                                        className="btn btn-primary text-white">
                                        REROLL
                                    </label>
                                    {/* reroll button */}
                                    <label
                                        htmlFor="my-modalReroll3"
                                        className="ml-8 flex-auto btn btn-secondary">
                                        Exit!
                                    </label>
                                </div>
                            </label>
                        </label>
                        <div class="flex pl-12 px-5 pr-4 gap-5 text-center max-w-[95%]">
                            <label
                                htmlFor="my-modalReroll3"
                                className="flex-auto btn w-[50%] btn-primary text-white"
                                onClick={(e) => {
                                    if (!showRerollDialog) {
                                        e.preventDefault()
                                        addBadImage(famous, 'famous')
                                    }
                                }}
                                disabled={!keyword}>
                                Reroll
                            </label>
                            {/* modal3 end */}
                            <button onClick={() => undoBadImage('famous')} disabled={!badImages.some(bad => bad.type === 'famous')}
                                className="flex-auto btn w-[50%] btn-secondary text-white"> Undo
                            </button>
                        </div>
                    </h2>
                }

                <div className="card-actions justify-end">
                    <div class="tooltip tooltip-left" data-tip="Click Widget Here To Add Custom Input">
                        <i class="fa-solid fa-gear cursor-pointer" onClick={() => setEditingFamousQuery(p => !p)}></i>
                    </div>
                </div>
            </div>
        </div>


    </div >
}