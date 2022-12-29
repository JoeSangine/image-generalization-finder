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
        return <h1>YOUS ALREADY ON FOOL</h1>
    }
    // Text and eventually logo below
    return <nav className="drop-shadow-[10px_10px_10px_rgba(0, 0, 0, 1)] mb-6 flex justify-end py-1 bg-[#191d24e3] text-[#ffffffe6]">
        <div className="flex flex-auto" >
            <i className="fa-solid fa-school pt-1 text-5xl ml-10"></i>
            <h1 className="pl-2 md:pl-20 pt-2 font-extrabold md:text-4xl tracking-widest text-center text-[#ffffffd8]">
                Image Generalization Finder
            </h1>




        </div>

        {/* About Modal  */}
        <label
            htmlFor="my-modalAbout"
            className="btn mr-10 btn-outline btn-secondary my-1">
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
                        Image Generalization Finder This app is built to help children with Autism in their development and education. My wife is a behavioral technician for children with Autism and they often use an excersize that requires her and many of her coworkers to need to manually get images to use. Generalization is what this is going to help with. This app will display 3 images based off of a single input.
                        <br></br>
                        <br></br>
                        For example, if you type in the word dog you will recieve a Real dog, Generic Cartoon dog, and a Famous dog. All three containers will always be tied to the words Real, Cartoon, and Famous. This will save behavioral techs and anyone who is helping children learn generalization a ton of excess time and effort that could be used helping the children!
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
            className="btn mr-10 btn-outline btn-primary my-1">
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
                        <form action="/api/login" method="POST" onSubmit={handleLogin}>
                            {message ? <div className="alert alert-error shadow-lg mb-5">
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
                    className="btn btn-outline btn-secondary mr-10 my-1">
                    Signup
                </label>
                <input
                    type="checkbox"
                    id="my-modal"
                    className="modal-toggle" />
                <label htmlFor="my-modal" className="modal bg-opacity-90 cursor-pointer">
                    <div className="modal-box">
                        <form action="/api/signup" method="POST" onSubmit={handleSignup}>
                            {message ? <div className="alert alert-error shadow-lg mb-5">
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