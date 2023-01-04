import { useState, useEffect } from 'react'


const INITIAL_OVERRIDES = {
    'owl': {
        'real': 'https://pazlspb.ru/sites/default/files/styles/catmed/public/uploads/1222/pazl_super_3d_nochnoy_strazh_500_elementov.jpg',
        'cartoon': 'https://i.pinimg.com/736x/8e/c7/e9/8ec7e96bf97de75431d67a79a012ca24.jpg',
        'famous': 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f918f41c-9b07-4abc-b8d0-c27a1602ae90/daoln0v-369faaed-6057-4369-8599-5571b40091b9.jpg/v1/fill/w_1024,h_719,q_75,strp/harry_potter_by_opheliac98-daoln0v.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi9mOTE4ZjQxYy05YjA3LTRhYmMtYjhkMC1jMjdhMTYwMmFlOTAvZGFvbG4wdi0zNjlmYWFlZC02MDU3LTQzNjktODU5OS01NTcxYjQwMDkxYjkuanBnIiwid2lkdGgiOiI8PTEwMjQiLCJoZWlnaHQiOiI8PTcxOSJ9XV19.LjpKhmrE0QmrFxdrlwyGsp0N9xj4QR9Su8PPNlkAXRM',
    },
    '': {
        'real': 'https://pazlspb.ru/sites/default/files/styles/catmed/public/uploads/1222/pazl_super_3d_nochnoy_strazh_500_elementov.jpg',
        'cartoon': 'https://i.pinimg.com/736x/8e/c7/e9/8ec7e96bf97de75431d67a79a012ca24.jpg',
        'famous': 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f918f41c-9b07-4abc-b8d0-c27a1602ae90/daoln0v-369faaed-6057-4369-8599-5571b40091b9.jpg/v1/fill/w_1024,h_719,q_75,strp/harry_potter_by_opheliac98-daoln0v.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi9mOTE4ZjQxYy05YjA3LTRhYmMtYjhkMC1jMjdhMTYwMmFlOTAvZGFvbG4wdi0zNjlmYWFlZC02MDU3LTQzNjktODU5OS01NTcxYjQwMDkxYjkuanBnIiwid2lkdGgiOiI8PTEwMjQiLCJoZWlnaHQiOiI8PTcxOSJ9XV19.LjpKhmrE0QmrFxdrlwyGsp0N9xj4QR9Su8PPNlkAXRM',
    },
}

export default function Images({ real, cartoon, famous, keyword = 'owl', badImages, addBadImage, addGoodImage, deleteGoodImage, selectGoodImage, unselectGoodImage, undoBadImage, goodImages, submitCustomQuery, customQueries, user, showRerollDialog, setShowRerollDialog }) {
    const [editingRealQuery, setEditingRealQuery] = useState(false)
    const [editingCartoonQuery, setEditingCartoonQuery] = useState(false)
    const [editingFamousQuery, setEditingFamousQuery] = useState(false)

    const showingRealForm = user && editingRealQuery
    const showingCartoonForm = user && editingCartoonQuery
    const showingFamousForm = user && (!customQueries.famous || editingFamousQuery)

    const selectedRealImage = goodImages.real?.find(img => img.selected);
    const realURL = selectedRealImage?.url || INITIAL_OVERRIDES[keyword]?.real || real;
    const isRealURLGood = goodImages.real?.some(good => good.url === realURL);

    const selectedCartoonImage = goodImages.cartoon?.find(img => img.selected);
    const cartoonURL = selectedCartoonImage?.url || INITIAL_OVERRIDES[keyword]?.cartoon || cartoon;
    const isCartoonURLGood = goodImages.cartoon?.some(good => good.url === cartoonURL);

    const selectedFamousImage = goodImages.famous?.find(img => img.selected);
    const famousURL = selectedFamousImage?.url || INITIAL_OVERRIDES[keyword]?.famous || famous;
    const isFamousURLGood = goodImages.famous?.some(good => good.url === famousURL);
    return <div className='flex m-4 rounded-lg gap-8 flex-col xl:flex-row items-center pb-[12.5vh] xl:pb-0 xl:h-[75vh]'>

        <div className="flex flex-col max-h-max w-80 md:w-96 bg-base-100 min-h-[62.5vh] shadow-xl flex-auto border-2 border-[#ffffff50]">
            <div className="basis-0 text-center font-bold pt-4 text-2xl text-white relative">
                {goodImages.real?.length ? <div className="tooltip tooltip-right absolute top-5 left-5" data-tip="Click to change image">
                    <label htmlFor="real-history-modal" className="cursor-pointer">
                        <i className="fa-solid fa-clock-rotate-left"></i>
                    </label>
                </div> : null}
                <input type="checkbox" id="real-history-modal" className="modal-toggle" />
                <label htmlFor="real-history-modal" className="modal cursor-pointer">
                    <label className="modal-box relative" htmlFor="">
                        {goodImages.real?.map(({ _id, url, selected }) => (
                            <div key={_id} className="flex flex-col">
                                <img src={url} alt="Real" className="aspect-[3/2] mt-4 w-[95%] m-auto rounded-lg drop-shadow-[15px_15px_5px_rgba(0,0,0,.45)] pb-5" />
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        className="flex-auto btn btn-error"
                                        onClick={() => deleteGoodImage('real', _id)}
                                    >
                                        Delete
                                    </button>
                                    {!selected &&
                                        <button
                                            type="button"
                                            className="flex-auto btn btn-success"
                                            onClick={() => selectGoodImage('real', _id)}
                                        >
                                            Use
                                        </button>
                                    }
                                </div>
                            </div>
                        ))}
                    </label>
                </label>
                {'Real ' + (keyword || 'Owl')}
            </div>

            <figure className="shrink basis-1/2">
                {INITIAL_OVERRIDES[keyword]?.real || ((real || selectedRealImage?.url) && keyword) ? <img
                    src={realURL}
                    alt="Real"
                    className={`aspect-[3/2] mt-4 ${showingRealForm ? 'w-[75%]' : 'w-[95%]'} m-auto rounded-lg drop-shadow-[15px_15px_5px_rgba(0,0,0,.45)]`}
                    xmlns="http://placekitten.com/200/300"
                    onError={() => addBadImage(real, 'real')}
                /> : <>
                    <svg className={`${keyword ? 'animate-pulse' : ''} aspect-[3/2] mt-4 ${showingRealForm ? 'w-[75%]' : 'w-[95%]'} rounded-lg drop-shadow-[15px_15px_5px_rgba(0,0,0,.45)]`} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                    <progress className="progress progress-info w-[92.5%] m-auto"></progress>
                </>}
                <button
                    className={`btn btn-${isRealURLGood ? 'primary' : 'secondary'} tooltip tooltip-left float-right mt-5 mr-5`}
                    data-tip={isRealURLGood ? "Click to delete image" : "Click to mark image good"}
                    onClick={() => {
                        isRealURLGood
                            ? deleteGoodImage('real', goodImages.real.find(good => good.url === realURL)._id)
                            : addGoodImage('real', { imageURL: realURL })
                    }}
                >
                    <i className="fa-solid fa-heart"></i>
                </button>
            </figure>
            <div className="basis-3/12 card-body text-center">
                {user && editingRealQuery ? (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.currentTarget;
                            const convertedQuery = form.elements.convertedQuery.value;
                            const imageURL = form.elements.imageURL.value;
                            const image = form.elements.image.files[0];
                            const promise = imageURL || image
                                ? addGoodImage('real', { imageURL, image })
                                : submitCustomQuery('real', convertedQuery);
                            return promise
                                .then(() => setEditingRealQuery(false));
                        }}
                        className="text-center"
                    >
                        <div className="flex">
                            <input
                                className="flex-1 w-[10vw] m-1 input input-bordered input-secondary col-3 form-control-sm py-1 fs-4 text-capitalize border border-3 drop-shadow-[0_0_25px_rgba(225,225,225,.10)] border-dark "
                                type="text"
                                name="convertedQuery"
                                placeholder="Enter Real Figure..."
                            />
                            <input
                                className="flex-1 w-[10vw] m-1 input input-bordered input-secondary col-3 form-control-sm py-1 fs-4 text-capitalize border border-3 drop-shadow-[0_0_25px_rgba(225,225,225,.10)] border-dark "
                                type="text"
                                name="imageURL"
                                placeholder="Enter Image URL..."
                            />
                        </div>
                        <div className="flex">
                            <input type="file" name="image" className="flex-1 w-[7.75vw] m-1 file-input file-input-bordered" />
                            <button type="submit" className="flex-1 w-[7.75vw] btn btn-secondary ml-5">Submit</button>
                        </div>
                        <br></br>
                        <br></br>
                    </form>
                ) : <h2>
                    {/* Modal 1 start */}

                    <br></br>
                    <br></br>
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
                                    if (selectedRealImage?.url === realURL) {
                                        unselectGoodImage('real', selectedRealImage._id)
                                    } else {
                                        addBadImage(real, 'real')
                                    }
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
        <div className="flex flex-col max-h-max w-80 md:w-96 bg-base-100 min-h-[62.5vh] shadow-xl flex-auto border-2 border-[#ffffff50]">
            <div className="basis-0 text-center font-bold pt-4 text-2xl text-white relative">
                {goodImages.cartoon?.length ? <div className="tooltip tooltip-right absolute top-5 left-5" data-tip="Click to change image">
                    <label htmlFor="real-history-modal" className="cursor-pointer">
                        <i className="fa-solid fa-clock-rotate-left"></i>
                    </label>
                </div> : null}
                <input type="checkbox" id="cartoon-history-modal" className="modal-toggle" />
                <label htmlFor="cartoon-history-modal" className="modal cursor-pointer">
                    <label className="modal-box relative" htmlFor="">
                        {goodImages.cartoon?.map(({ _id, url, selected }) => (
                            <div key={_id} className="flex flex-col">
                                <img src={url} alt="Cartoon" className="aspect-[3/2] mt-4 w-[95%] m-auto rounded-lg drop-shadow-[15px_15px_5px_rgba(0,0,0,.45)] pb-5" />
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        className="flex-auto btn btn-error"
                                        onClick={() => deleteGoodImage('cartoon', _id)}
                                    >
                                        Delete
                                    </button>
                                    {!selected &&
                                        <button
                                            type="button"
                                            className="flex-auto btn btn-success"
                                            onClick={() => selectGoodImage('cartoon', _id)}
                                        >
                                            Use
                                        </button>
                                    }
                                </div>
                            </div>
                        ))}
                    </label>
                </label>
                {'Cartoon ' + (keyword || 'Owl')}
            </div>
            <figure className="shrink basis-1/2">
                {INITIAL_OVERRIDES[keyword]?.cartoon || ((cartoon || goodImages.cartoon?.[0].url) && keyword) ? <img
                    src={goodImages.cartoon?.[0].url || INITIAL_OVERRIDES[keyword]?.cartoon || cartoon}
                    className={`aspect-[3/2] mt-4 ${showingCartoonForm ? 'w-[75%]' : 'w-[95%]'} m-auto rounded-lg drop-shadow-[15px_15px_5px_rgba(0,0,0,.45)]`}
                    alt="Cartoon"
                    onError={() => addBadImage(cartoon, 'cartoon')}
                /> : <>
                    <svg className={`${keyword ? 'animate-pulse' : ''} aspect-[3/2] mt-4 ${showingCartoonForm ? 'w-[75%]' : 'w-[95%]'} rounded-lg drop-shadow-[15px_15px_5px_rgba(0,0,0,.45)]`} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                    <progress className="progress progress-info w-[92.5%] m-auto"></progress>
                </>}
                <button
                    className={`btn btn-${isCartoonURLGood ? 'primary' : 'secondary'} tooltip tooltip-left float-right mt-5 mr-5`}
                    data-tip={isCartoonURLGood ? "Click to delete image" : "Click to mark image good"}
                    onClick={() => isCartoonURLGood
                        ? deleteGoodImage('cartoon', goodImages.cartoon.find(good => good.url === cartoon)._id)
                        : addGoodImage('cartoon', { imageURL: cartoonURL })}
                >
                    <i className="fa-solid fa-heart"></i>
                </button>
            </figure>
            <div className="basis-3/12 card-body text-center">
                {showingCartoonForm ? (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.currentTarget;
                            const convertedQuery = form.elements.convertedQuery.value;
                            const imageURL = form.elements.imageURL.value;
                            const image = form.elements.image.files[0];
                            const promise = imageURL || image
                                ? addGoodImage('cartoon', { imageURL, image })
                                : submitCustomQuery('cartoon', convertedQuery);
                            return promise
                                .then(() => setEditingRealQuery(false));
                        }}
                        className="text-center"
                    >
                        <div className="flex">
                            <input
                                className="flex-1 w-[10vw] m-1 input input-bordered input-secondary col-3 form-control-sm py-1 fs-4 text-capitalize border border-3 drop-shadow-[0_0_25px_rgba(225,225,225,.10)] border-dark "
                                type="text"
                                name="convertedQuery"
                                placeholder="Enter Cartoon Figure..."
                            />
                            <input
                                className="flex-1 w-[10vw] m-1 input input-bordered input-secondary col-3 form-control-sm py-1 fs-4 text-capitalize border border-3 drop-shadow-[0_0_25px_rgba(225,225,225,.10)] border-dark "
                                type="text"
                                name="imageURL"
                                placeholder="Enter Image URL..."
                            />
                        </div>
                        <div className="flex">
                            <input type="file" name="image" className="flex-1 w-[10vw] m-1 file-input file-input-bordered" />
                            <button type="submit" className="flex-1 w-[10vw] btn btn-secondary ml-5">Submit</button>
                        </div>
                        <br></br>
                        <br></br>
                    </form>
                ) : <h2>

                    <br></br>
                    <br></br>
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
                                <label htmlFor="my-modalReroll1" onClick={() => addBadImage(cartoon, 'cartoon')}
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
        <div className="flex flex-col max-h-max w-80 md:w-96 bg-base-100 min-h-[62.5vh] shadow-xl flex-auto border-2 border-[#ffffff50] ">
            <div className="basis-0 text-center font-bold pt-4 text-2xl text-white relative">
                {goodImages.famous?.length ? <div className="tooltip tooltip-right absolute top-5 left-5" data-tip="Click to change image">
                    <label htmlFor="famous-history-modal" className="cursor-pointer">
                        <i className="fa-solid fa-clock-rotate-left"></i>
                    </label>
                </div> : null}
                <input type="checkbox" id="famous-history-modal" className="modal-toggle" />
                <label htmlFor="famous-history-modal" className="modal cursor-pointer">
                    <label className="modal-box relative" htmlFor="">
                        {goodImages.famous?.map(({ _id, url, selected }) => (
                            <div key={_id} className="flex flex-col">
                                <img src={url} alt="Famous" className="aspect-[3/2] mt-4 w-[95%] m-auto rounded-lg drop-shadow-[15px_15px_5px_rgba(0,0,0,.45)] pb-5" />
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        className="flex-auto btn btn-error"
                                        onClick={() => deleteGoodImage('famous', _id)}
                                    >
                                        Delete
                                    </button>
                                    {!selected &&
                                        <button
                                            type="button"
                                            className="flex-auto btn btn-success"
                                            onClick={() => selectGoodImage('famous', _id)}
                                        >
                                            Use
                                        </button>
                                    }
                                </div>
                            </div>
                        ))}
                    </label>
                </label>
                {'Famous ' + (keyword || 'Owl')}
            </div>
            <figure className="shrink basis-1/2">
                {INITIAL_OVERRIDES[keyword]?.famous || (((customQueries.famous && famous) || goodImages.famous?.[0].url) && keyword) ? <img
                    src={goodImages.famous?.[0].url || INITIAL_OVERRIDES[keyword]?.famous || famous}
                    alt="Famous"
                    className={`aspect-[3/2] mt-4 ${showingFamousForm ? 'w-[75%]' : 'w-[95%]'} m-auto rounded-lg drop-shadow-[15px_15px_5px_rgba(0,0,0,.45)]`}
                    onError={() => addBadImage(famous, 'famous')}
                /> : <>
                    <svg className={`${keyword && customQueries.famous ? 'animate-pulse' : ''} aspect-[3/2] mt-4 ${showingFamousForm ? 'w-[75%]' : 'w-[95%]'} rounded-lg drop-shadow-[15px_15px_5px_rgba(0,0,0,.45)]`} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                    {keyword && customQueries.famous ? <progress className="progress progress-info w-[92.5%] m-auto"></progress> : null}
                </>}
                <button
                    className={`btn btn-${isFamousURLGood ? 'primary' : 'secondary'} tooltip tooltip-left float-right mt-5 mr-5`}
                    data-tip={isFamousURLGood ? "Click to delete image" : "Click to mark image good"}
                    onClick={() => isFamousURLGood
                        ? deleteGoodImage('famous', goodImages.famous.find(good => good.url === famousURL)._id)
                        : addGoodImage('famous', { imageURL: famousURL })}
                >
                    <i className="fa-solid fa-heart"></i>
                </button>
            </figure>

            <div className="basis-1/2 card-body text-center">
                {user && (!customQueries.famous || editingFamousQuery) ? (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.currentTarget;
                            const convertedQuery = form.elements.convertedQuery.value;
                            const imageURL = form.elements.imageURL.value;
                            const image = form.elements.image.files[0];
                            const promise = imageURL || image
                                ? addGoodImage('famous', { imageURL, image })
                                : submitCustomQuery('famous', convertedQuery);
                            return promise
                                .then(() => setEditingRealQuery(false));
                        }}
                        className="text-center"
                    >
                        <div className="flex">
                            <input
                                className="flex-1 w-[10vw] m-1 input input-bordered input-secondary col-3 form-control-sm py-1 fs-4 text-capitalize border border-3 drop-shadow-[0_0_25px_rgba(225,225,225,.10)] border-dark "
                                type="text"
                                name="convertedQuery"
                                placeholder="Enter Famous Figure..."
                            />
                            <input
                                className="flex-1 w-[10vw] m-1 input input-bordered input-secondary col-3 form-control-sm py-1 fs-4 text-capitalize border border-3 drop-shadow-[0_0_25px_rgba(225,225,225,.10)] border-dark "
                                type="text"
                                name="imageURL"
                                placeholder="Enter Image URL..."
                            />
                        </div>
                        <div className="flex">
                            <input type="file" name="image" className="flex-1 w-[10vw] m-1 file-input file-input-bordered" />
                            <button type="submit" className="flex-1 w-[10vw] btn btn-secondary ml-5">Submit</button>
                        </div>

                        <p className="pt-2">For the Famous Image I need help. Can you please input a famous character in the text box below so that we can save it the next time you use this app :)</p>
                    </form>
                ) :
                    <h2>
                        {/* Modal 3 start */}
                        <br></br>
                        <br></br>
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
                                    <label htmlFor="my-modalReroll3" onClick={() => addBadImage(famous, 'famous')}
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
    </div>
}