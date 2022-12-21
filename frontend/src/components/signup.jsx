export default function Signup() {
    return <div className="flex flex-col-reverse">
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
    </div>
}
