import Api from './Api'
import Footer from './Footer'
import Nav from './Nav'
import { useEffect, useState } from "react"


export default function App() {
    const [user, setUser] = useState(undefined);
    useEffect(() => {
        fetch('/api/user').then(response => response.json())
            .then(user => setUser(user))

    }, [])
    return <div>
        <Nav
            user={user}
            setUser={setUser}
        />
        <Api
            user={user}
        />
        <Footer />
    </div>
}