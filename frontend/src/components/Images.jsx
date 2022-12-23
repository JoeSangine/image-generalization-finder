export default function Images({ real, cartoon, famous, keyword, addBadImage, famousTrueOrFalse }) {
    return <div className='flex m-5 rounded-lg gap-8 flex-col md:flex-row items-center md:items-stretch'>

        <div className="card w-96 bg-base-100 shadow-xl flex-auto border-2 border- drop-shadow-[0_25px_25px_rgba(0,0,0,.65)]">
            <div className="text-center font-bold">
                {'Real ' + keyword}
            </div>
            <figure><img src={real} alt="Real" className="max-h-96 mt-4" /></figure>
            <div className="card-body text-center">
                <h2>
                    <button onClick={() => addBadImage(real, 'real')}
                        className="btn bg-[#ff5208] text-white"> REROLL</button>
                </h2>
                <h3>ONLY CLICK REROLL IF YOU NEVER WANT IMAGE TO APPEAR AGAIN</h3>
                <div className="card-actions justify-end">

                </div>
            </div>
        </div>


        <div className="card w-96 bg-base-100 shadow-xl flex-auto border-2 drop-shadow-[0_25px_25px_rgba(0,0,0,.65)]">
            <div className="text-center font-bold">
                {'Cartoon ' + keyword}
            </div>
            <figure ><img src={cartoon} className="max-h-96 mt-4" alt="Cartoon" /></figure>
            <div className="card-body text-center">
                <h2>
                    <button onClick={() => addBadImage(cartoon, 'cartoon')}
                        className="btn bg-[#ff5208] text-white"> REROLL</button>
                </h2>
                <h3>ONLY CLICK REROLL IF YOU NEVER WANT IMAGE TO APPEAR AGAIN</h3>
                <div className="card-actions justify-end">
                </div>
            </div>
        </div>


        <div className="card w-96 bg-base-100 shadow-xl flex-auto border-2 drop-shadow-[0_25px_25px_rgba(0,0,0,.65)]">
            <div className="text-center font-bold">
                {'Famous ' + keyword}
            </div>
            <figure><img src={famous} alt="Famous" className="max-h-96 mt-4" /></figure>
            <div className="card-body text-center">
                <h2>
                    <button onClick={() => addBadImage(famous, 'famous')}
                        className="btn bg-[#ff5208] text-white"> REROLL</button>
                </h2>

                {!famousTrueOrFalse && <p>For the Famous Image I need help. Can you please input a famous character in the text box below so that we can save it the next time you use this app :)</p>}

                <div className="card-actions justify-end">

                </div>
            </div>
        </div>


    </div>
}