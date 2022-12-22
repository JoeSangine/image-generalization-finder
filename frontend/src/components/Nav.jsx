import { useEffect, useState } from "react"


export default function Nav() {
    // use state for logout button to appear when user is logged in
    const [user, setUser] = useState(undefined);
    useEffect(() => {
        fetch('/api/user').then(response => response.json())
            .then(user => setUser(user))

    }, [])
    if (user !== null) {
        return <button onClick={() => fetch('/api/logout').then(user => setUser(null))}>LOGOUT</button>
    }
    else if (user === undefined) {
        return <h1>YOUS ALREADY ON FOOL</h1>
    }

    return <div className="flex">
        <label htmlFor="my-modal2" className="btn">Login</label>
        <input type="checkbox" id="my-modal2" className="modal-toggle" />
        <div className="modal bg-black">

            <form className="flex" action="/api/login" method="POST">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail2" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail2"
                        aria-describedby="emailHelp"
                        name="email"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        name="password"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className="modal-action">
                <label htmlFor="my-modal2" className="btn">Exit!</label>
            </div>
        </div>


        {/* Signup modal below */}


        <div >
            <label htmlFor="my-modal" className="btn">Signup</label>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal bg-black">

                <form className="flex" action="/api/signup" method="POST">
                    <div className="mb-3">
                        <label htmlFor="userName" className="form-label">User Name</label>
                        <input type="text" className="form-control" id="userName" name="userName" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div className="modal-action">
                    <label htmlFor="my-modal" className="btn">Exit!</label>
                </div>
            </div>
        </div>
    </div>

}