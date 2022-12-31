import { useEffect, useState } from "react"

export default function Nav({ user, setUser }) {
    const [message, setMessage] = useState('')
    // use state for logout button to appear when user is logged in

    const handleLogin = async (e) => {
        e.preventDefault()

        const form = e.currentTarget;
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: form.method,
            body: new URLSearchParams(formData),
        })
        const data = await response.json()
        if (data.user) setUser(data.user)
        if (data.message) setMessage(data.message)
    }

    const handleSignup = async (e) => {
        e.preventDefault()

        const form = e.currentTarget;
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: form.method,
            body: new URLSearchParams(formData),
        })
        const data = await response.json()
        if (data.user) setUser(data.user)
        if (data.message) setMessage(data.message)
    }

    if (user === undefined) {
        return null;
    }
    // Text and eventually logo below
    return <nav className="drop-shadow-[10px_10px_10px_rgba(0, 0, 0, 1)] mb-6 flex justify-end py-1 bg-[#191d24e3] text-[#ffffffe6]">
        <div className="flex flex-auto" >
            <i className="fa-solid fa-school pt-1 text-5xl ml-10"></i>
            <h1 className="pl-4 xl:pl-20 pt-4 xl:pt-2 font-extrabold xl:text-4xl tracking-widest text-center text-[#ffffffd8]">
                Image Generalization Finder
            </h1>
        </div>

        <div className="dropdown dropdown-end xl:hidden my-1">
            <label tabIndex={0} className="btn btn-ghost rounded-btn">Menu</label>
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                <li>
                    <label
                        htmlFor="my-modalAbout"
                        className="btn btn-outline btn-secondary my-1">
                        About
                    </label>
                </li>
                <li>
                    <label
                        htmlFor="my-modalHow"
                        className="btn btn-outline btn-primary my-1">
                        How It Works
                    </label>
                </li>
                {user !== null ? <li>
                    <button className="btn btn-outline btn-secondary my-1" onClick={() => fetch('/api/logout').then(user => setUser(null))}> LOGOUT</button>
                </li> : <>
                    <li>
                        <label
                            htmlFor="my-modal2"
                            className="btn btn-outline btn-primary my-1">
                            Login
                        </label>
                    </li>
                    <li>
                        <label
                            htmlFor="my-modal"
                            className="btn btn-outline btn-secondary my-1">
                            Signup
                        </label>
                    </li>
                </>}
            </ul>
        </div>

        {/* About Modal  */}
        <label
            htmlFor="my-modalAbout"
            className="btn mr-5 btn-outline btn-secondary my-1 hidden xl:flex">
            About
        </label>
        <input
            type="checkbox"
            id="my-modalAbout"
            className="modal-toggle" />
        <label htmlFor="my-modalAbout" className="modal bg-opacity-90 cursor-pointer">
            <div className="modal-box w-10/12 max-w-4xl">
                <form action="/api/login" method="POST">
                    <div className="flex flex-auto pb-6">
                        <i className="fa-solid fa-school pb-2 text-5xl ml-4"></i>
                        <h1 className="text-center pl-24 pt-2 text-4xl tracking-wide">About</h1>
                    </div>

                    <p className="indent-5 tracking-widest">
                        Autism is a social impairment that makes it difficult for individuals to relate to their surroundings and others. Through Applied Behavior Analysis this website is designed to help with the vital skill of generalization. Generalization is the ability to perform a skill in different circumstances or with different objects. It starts with an idea of exposure to different types of objects (a novel or real life example, a cartoon version and a well known version) to help a learner understand that things can be the same even when they appear to be different.
                        <br></br>
                        <br></br>
                        Once a learner has this skill it can lead to them generalizing things like hi meaning the same thing as hey or that the parts on a bicycle in a picture are also the same as the real bicycle a person can sit on.
                        Teaching people how to make these connections in the world allows them to better understand everything around them.
                    </p>





                    <div className="modal-action">

                        <label
                            htmlFor="my-modalAbout"
                            className="flex-auto btn">
                            Exit!
                        </label>
                    </div>
                </form>
            </div>
        </label>

        {/* How it works  */}
        <label
            htmlFor="my-modalHow"
            className="btn mr-5 btn-outline btn-primary my-1 hidden xl:flex">
            How It Works
        </label>
        <input
            type="checkbox"
            id="my-modalHow"
            className="modal-toggle" />
        <label htmlFor="my-modalHow" className="modal bg-opacity-90 cursor-pointer">
            <div className="modal-box">
                <form action="/api/login" method="POST">
                    <div className="flex flex-auto">
                        <i className="fa-solid fa-school pb-2 text-5xl ml-8"></i>
                        <h1 className="text-center pl-8 pt-2 text-4xl">Instructions</h1>
                    </div>
                    <br></br>
                    <ul className="list-disc pl-5">
                        <li> Login to get the app started!</li>
                        <br></br>
                        <li> Type in the Search input above to generate a real and a cartoon image     </li>
                        <br></br>
                        <li> For Famous Images you haven't already seen You need to type in the search bar below Famous Images</li>
                        <br></br>
                        <li> Once you save the Famous Image you wont have to ever re-type that image again for future use   </li>
                        <br></br>
                        <li> If you want to re roll the Image Click the Reroll button for a new one</li>
                        <br></br>
                        <li> If you make an oopsies and get rid of an image you like click undo to revert</li>
                        <br></br>
                        <li> If you want to look for a different specific image click the widget at the bottom of each container</li>
                        <br></br>

                        <li> Finally, Enjoy and have a wonderful day</li>
                    </ul>





                    <div className="modal-action">

                        <label
                            htmlFor="my-modalHow"
                            className="flex-auto btn">
                            Exit!
                        </label>
                    </div>
                </form>
            </div>
        </label>
        {/*  LOGIN MODAL BELOW */}

        {user !== null ? <>
            <h3 className="hidden xl:block pt-3 pr-10 text-2xl">{user.userName}</h3>
            <button className="btn mr-1 md:mr-5 btn-outline btn-secondary my-1 hidden xl:flex" onClick={() => fetch('/api/logout').then(user => setUser(null))}> LOGOUT</button>
        </>
            : <>
                <label
                    htmlFor="my-modal2"
                    className="btn mr-5 btn-outline btn-primary my-1 hidden xl:flex">
                    Login
                </label>
                <input
                    type="checkbox"
                    id="my-modal2"
                    className="modal-toggle" />

                <label htmlFor="my-modal2" className="modal bg-opacity-90 cursor-pointer">
                    <div className="modal-box">
                        <form action="/api/login" method="POST" onSubmit={handleLogin}>
                            {message ? <div className="alert alert-error shadow-xl mb-5">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{message}</span>
                                </div>
                            </div> : null}
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
                    className="btn btn-outline btn-secondary mr-5 my-1 hidden xl:flex">
                    Signup
                </label>
                <input
                    type="checkbox"
                    id="my-modal"
                    className="modal-toggle" />
                <label htmlFor="my-modal" className="modal bg-opacity-90 cursor-pointer">
                    <div className="modal-box">
                        <form action="/api/signup" method="POST" onSubmit={handleSignup}>
                            {message ? <div className="alert alert-error shadow-xl mb-5">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{message}</span>
                                </div>
                            </div> : null}
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