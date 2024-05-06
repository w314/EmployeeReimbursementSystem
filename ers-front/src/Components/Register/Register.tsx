import * as React from "react"
import Header from "../Header/Header"

const Register: React.FC<{}> = () => {
    
    
    const [ userCredentials, setUserCredentials ] = React.useState({username: "", password: ""})
    const [ firstName, setFirstName ] = React.useState("")
    const [ lastName, setLastName ] = React.useState("")

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const username = event.target.value
        setUserCredentials({...userCredentials, username: username})
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value
        setUserCredentials({...userCredentials, password: password})
    }

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const firstName = event.target.value
        setFirstName(firstName)
    }

    
    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const lastName = event.target.value
        setLastName(lastName)
    }

    const handleOnRegisterClick = () => {

    }


    console.log(`IN REGISTER COMP`)
    return (
        <div className="content">
        <div className="header textLeft">
        < Header registerShown={true} />

        </div>
        <div>
            {/* <form> */}
                <fieldset>
                    <legend>Please Register for ERS</legend>
                    <label htmlFor="firstname">First Name: </label>
                    <input type="text" name="firstname" id="firstname" onChange={handleFirstNameChange} value={userCredentials.username} />
                    <label htmlFor="lastname">Last Name: </label>
                    <input type="text" name="lastname" id="lastname" onChange={handleLastNameChange} value={userCredentials.username} />
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username" onChange={handleUsernameChange} value={userCredentials.username} />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={handlePasswordChange} value={userCredentials.password}/>
                    <button onClick={handleOnRegisterClick}>Register</button>


                </fieldset>
            {/* </form> */}
        </div>
        </div>

    )
}

export default Register