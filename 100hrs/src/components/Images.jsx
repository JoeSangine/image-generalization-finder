export default function Images({ real, cartoon, famous }) {
    return <div className='flex mt-60'>

        <div className="card w-96 bg-base-100 shadow-xl flex-auto ">
            <figure><img src={real} alt="Real" /></figure>
            <div className="card-body text-center">
                <h2 >
                    Shoes!
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">

                </div>
            </div>
        </div>


        <div className="card w-96 bg-base-100 shadow-xl flex-auto">
            <figure><img src={cartoon} alt="Cartoon" /></figure>
            <div className="card-body text-center">
                <h2 >
                    Shoes!
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">

                </div>
            </div>
        </div>


        <div className="card w-96 bg-base-100 shadow-xl flex-auto">
            <figure><img src={famous} alt="Famous" /></figure>
            <div className="card-body text-center">
                <h2 >
                    Shoes!
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">

                </div>
            </div>
        </div>


    </div>
}