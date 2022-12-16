export default function Images({ real, cartoon, famous, keyword, addBadImage, famousTrueOrFalse }) {
    return <div className='flex mt-60'>

        <div className="card w-96 bg-base-100 shadow-xl flex-auto ">
            <figure><img src={real} alt="Real" /></figure>
            <div className="card-body text-center">
                <h2>
                    {'Real ' + keyword}
                    <button onClick={() => addBadImage(real, 'real')}
                        className="badge badge-secondary"> REROLL</button>
                </h2>
                <h3>ONLY CLICK REROLL IF YOU NEVER WANT IMAGE TO APPEAR AGAIN</h3>
                <div className="card-actions justify-end">

                </div>
            </div>
        </div>


        <div className="card w-96 bg-base-100 shadow-xl flex-auto">
            <figure><img src={cartoon} alt="Cartoon" /></figure>
            <div className="card-body text-center">
                <h2>
                    {'Cartoon ' + keyword}
                    <button onClick={() => addBadImage(cartoon, 'cartoon')}
                        className="badge badge-secondary"> REROLL</button>
                </h2>
                <h3>ONLY CLICK REROLL IF YOU NEVER WANT IMAGE TO APPEAR AGAIN</h3>
                <div className="card-actions justify-end">

                </div>
            </div>
        </div>


        <div className="card w-96 bg-base-100 shadow-xl flex-auto">
            <figure><img src={famous} alt="Famous" /></figure>
            <div className="card-body text-center">
                <h2>
                    {'Famous ' + keyword}
                    <button onClick={() => addBadImage(famous, 'famous')}
                        className="badge badge-secondary"> REROLL</button>
                </h2>

                {!famousTrueOrFalse && <p>For the Famous Image I need help. Can you please input a famous character in the text box below so that we can save it the next time you use this app :)</p>}

                <div className="card-actions justify-end">

                </div>
            </div>
        </div>


    </div>
}