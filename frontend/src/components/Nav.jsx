import { useEffect, useState } from "react"


export default function Nav({ user, setUser }) {
    // use state for logout button to appear when user is logged in

    if (user === undefined) {
        return <h1>YOUS ALREADY ON FOOL</h1>
    }
    // Text and eventually logo below
    return <nav className="drop-shadow-[10px_10px_10px_rgba(0, 0, 0, 1)] mb-6 flex justify-end py-1 bg-[#191D24] text-white">

        <div className="flex flex-auto" >
            <i className="fa-solid fa-school pt-1 text-5xl ml-10"></i>
            <h1 className="pl-2 md:pl-20 pt-2 font-extrabold md:text-4xl tracking-widest text-center text-gray-300">
                Image Generalization Finder
            </h1>
        </div>
        {/*  LOGIN MODAL BELOW */}

        {user !== null ? <>
            <h3 className="hidden md:block pt-3 pr-10 text-2xl">{user.userName}</h3>
            <button className="btn mr-1 md:mr-10 btn-outline btn-secondary my-1" onClick={() => fetch('/api/logout').then(user => setUser(null))}> LOGOUT</button>
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

                <label htmlFor="my-modal2" className="modal bg-opacity-90 cursor-pointer">
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
                </label>

                {/* Signup modal below */}

                <label
                    htmlFor="my-modal"
                    className="btn btn-outline btn-secondary mr-10 my-1">
                    Signup
                </label>
                <input
                    type="checkbox"
                    id="my-modal"
                    className="modal-toggle" />
                <label htmlFor="my-modal" className="modal bg-opacity-90 cursor-pointer">
                    <div className="modal-box">
                        <form action="/api/signup" method="POST">
                            <label className="input-group input-group-vertical mb-2">
                                <span className="w-max">User Name</span>
                                <input className="input input-bordered" name="userName" />
                            </label>
                            <label className="input-group input-group-vertical mb-2">
                                <span className="w-max">Email Address</span>
                                <input type="email" className="input input-bordered" name="email" />
                            </label>

                            <label className="input-group input-group-vertical">
                                <span className="w-max">Password</span>
                                <input type="password" className="input input-bordered" name="password" />
                            </label>


                            <label className="input-group input-group-vertical">
                                <span className="w-max">Confirm Password</span>
                                <input type="password" className="input input-bordered" name="confirmPassword" />
                            </label>

                            <div className="modal-action">
                                <button
                                    type="submit"
                                    className="flex-auto btn btn-primary mr-8">
                                    Submit
                                </button>
                                <label
                                    htmlFor="my-modal"
                                    className="flex-auto btn">
                                    Exit!
                                </label>
                            </div>
                        </form>
                    </div>
                </label>
            </>}

    </nav>

}