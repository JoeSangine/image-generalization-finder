import { useEffect, useState } from "react"


export default function Login() {
    const [user, setUser] = useState(undefined);
    useEffect(() => {
        fetch('/api/user').then(response => response.json())
            .then(user => setUser(user))

    }, [])
    if (user !== null) {
        return <button onClick={()=>fetch('/api/logout').then(user=> setUser(null))}>LOGOUT</button>
    }
    else if (user === undefined) {
        return <h1>YOUS ALREADY ON FOOL</h1>
    }

    return <form className="flex" action="/api/login" method="POST">
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




}