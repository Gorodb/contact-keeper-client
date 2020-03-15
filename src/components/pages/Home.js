import React, {useContext, useEffect} from "react"
import Contacts from "../contacts/Contacts"
import ContactForm from "../contactForm/ContactForm"
import ContactFilter from "../contactFilter/ContactFilter"
import authContext from "../../context/auth/authContext"

const Home = () => {
    const { loadUser, user } = useContext(authContext)

    useEffect(() => {
        if (!user) {
            loadUser()
        }

        // eslint-disable-next-line
    }, [])

    return (
        <div className="grid-2">
            <div>
                <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    )
}

export default Home