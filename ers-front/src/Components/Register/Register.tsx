import * as React from "react"
import Header from "../Header/Header"
import { baseUrl } from "../../Utilities/Utilities"
import axios from "axios"
import { EmployeeType, RoleEnum } from "../../Utilities/Types"
import { useNavigate } from "react-router-dom"
import { validateHeaderName } from "http"

const Register: React.FC<{}> = () => {
    
    
    const [ userCredentials, setUserCredentials ] = React.useState({username: "", password: ""})
    const [ firstName, setFirstName ] = React.useState("")
    const [ lastName, setLastName ] = React.useState("")
    const navigate = useNavigate();

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

    const validUserInput = () => {
        if(userCredentials.username == "") return false
        if(userCredentials.password == "") return false
        if(firstName == "") return false
        if(lastName == "") return false
        return true
    }

    const uniqueUserName = async () =>  {
        const url = `${baseUrl}employees/username/${userCredentials.username}`
        console.log(`CHECKING USERNAME AT URL: ${url}`)
        try {
            const {data } = await axios(url);
            console.log(`data returned at username check: ${JSON.stringify(data)}`)
            // if(status == 404) return false
            return false
        } catch {
            return true
        }

        // return true

    }

    const registerEmployee = async () => {
        const url = `${baseUrl}employees`
        const response  = await axios.post(
            url,
            {
                firstName,
                lastName,
                userName: userCredentials.username,
                password: userCredentials.password,
                role: RoleEnum.associate,
            }
        )

        const employee: EmployeeType = response.data
        console.log(`EMPLOYEE ADDED:`)
        console.log(JSON.stringify(employee))

        navigate("/")
    }


    const handleOnRegisterClick = async () => {

        if(!validUserInput()) {
            alert(`Please fill out all fields to register`)
            return
        }

        console.log(`ALL FIELDS HAVE VALUES`)
        const isUserNameUnique =  await uniqueUserName()
        // console.log(`Username is unique? ${isUserNameUnique}`)

        if(!isUserNameUnique) {
            
            alert(`Please choose a unique username`)
            return
        }

        console.log(`WE HAVE UNIQUE USERNAME`)

        registerEmployee()
    }


    // console.log(`IN REGISTER COMP`)
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
                    <input type="text" name="firstname" id="firstname" onChange={handleFirstNameChange} value={firstName} />
                    
                    <label htmlFor="lastname">Last Name: </label>
                    <input type="text" name="lastname" id="lastname" onChange={handleLastNameChange} value={lastName} />
                    
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