import { useEffect, useState } from "react"


export default function Nav() {
    // use state for logout button to appear when user is logged in
    const [user, setUser] = useState(undefined);
    useEffect(() => {
        fetch('/api/user').then(response => response.json())
            .then(user => setUser(user))

    }, [])
    if (user === undefined) {
        return <h1>YOUS ALREADY ON FOOL</h1>
    }
    // Text and eventually logo below
    return <nav className="drop-shadow-[10px_10px_10px_rgba(0, 0, 0, 1)] mb-6 flex justify-end py-1 bg-[#191D24] text-white">

        <div className="flex flex-auto" >
            <i className="fa-solid fa-school pt-1 text-5xl ml-10"></i>
            <h1 className="pl-20 pt-2 font-extrabold text-4xl tracking-widest text-center text-gray-300">
                Image Generalization Finder
            </h1>
        </div>
        {/*  LOGIN MODAL BELOW */}

        {user !== null ? <>
            <button className="btn mr-10 btn-outline btn-secondary my-1" onClick={() => fetch('/api/logout').then(user => setUser(null))}>LOGOUT</button>
        </>
            : <>
                <label
                    htmlFor="my-modal2"
                    className="btn mr-10 btn-outline btn-primary my-1">
                    Login
                </label>
                <input
                    type="checkbox"
                    id="my-modal2"
                    className="modal-toggle" />

                <div className="modal bg-opacity-90">
                    <div className="modal-box">
                        <form action="/api/login" method="POST">
                            <label className="input-group input-group-vertical mb-2">
                                <span className="w-max">Email Address</span>
                                <input type="email" className="input input-bordered" name="email" />
                            </label>

                            <label className="input-group input-group-vertical">
                                <span className="w-max">Password</span>
                                <input type="password" className="input input-bordered" name="password" />
                            </label>

                            <div className="modal-action">
                                <button
                                    type="submit"
                                    className="flex-auto btn btn-primary mr-8">
                                    Submit
                                </button>
                                <label
                                    htmlFor="my-modal2"
                                    className="flex-auto btn">
                                    Exit!
                                </label>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Signup modal below */}


                <div >
                    <label
                        htmlFor="my-modal"
                        className="btn btn-outline btn-secondary mr-10 my-1">
                        Signup
                    </label>

                    <input
                        type="checkbox"
                        id="my-modal"
                        className="modal-toggle" />

                    <div className="modal bg-black">

                        <form className="flex" action="/api/signup" method="POST">
                            <div className="mb-3">
                                <label
                                    htmlFor="userName"
                                    className="form-label">
                                    User Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control mr-8"
                                    id="userName"
                                    name="userName" />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="exampleInputEmail1"
                                    className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control mr-8"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name="email" />
                                <div
                                    id="emailHelp"
                                    className="form-text">

                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="password"
                                    className="form-label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    className="form-control mr-8"
                                    id="password"
                                    name="password" />

                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="confirmPassword"
                                    className="form-label">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    className="form-control mr-8"
                                    id="confirmPassword"
                                    name="confirmPassword" />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                        <div className="modal-action">
                            <label
                                htmlFor="my-modal"
                                className="btn">
                                Exit!
                            </label>
                        </div>
                    </div>
                </div>
            </>}

    </nav>

}