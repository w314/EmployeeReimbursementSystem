import * as React from  "react"
import { baseUrl, fetchData } from "../Utilities/Utilities"
import axios from "axios"
import { RoleEnum, UserType } from "../Utilities/Types"
import { useNavigate } from "react-router-dom"
import ManagerPage from "./ManagerPage"

const Login: React.FC<{}> = () => {

    const [ userCredentials, setUserCredentials ] = React.useState({username: "", password: ""})
    const [ errorMessage, setErrorMessage ] = React.useState("");
    const [ loggedInUser, setLoggedInUser ] = React.useState({} as UserType)
    const navigate = useNavigate();

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const username = event.target.value
        setUserCredentials({...userCredentials, username: username})
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value
        setUserCredentials({...userCredentials, password: password})
    }

    const loginUser = async () => {

        const url = `${baseUrl}employees/login`
        const { data, status } = await axios.post<UserType>(
            url,
            {...userCredentials},
            {withCredentials: true}
        );
        
        console.log(JSON.stringify(data, null, 4));        
        console.log(status);
        
        setLoggedInUser({... data})

        // show appropriate page
        // const url = loggedInUser.role === RoleEnum.manager 
        //     ? `${baseUrl}` 
        //     : `${baseUrl}`

     }


    const handleOnClick = () => {
        
        // error handling
        if(userCredentials.username.length == 0 || userCredentials.password.length == 0) {
            setErrorMessage("Please enter valid username and password")
            return
        }
        // login user
        loginUser();      
    }

    return loggedInUser.employeeId == null
        ? (
            <>
            <label htmlFor="username">Username: </label>
            <input type="text" name="username" id="username" onChange={handleUsernameChange} value={userCredentials.username} />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={handlePasswordChange} value={userCredentials.password}/>
            <button onClick={handleOnClick}>Login</button>
        </>

        )
        : loggedInUser.role == RoleEnum.manager
            ? < ManagerPage />
            : <h1>Employee</h1>
    
}

export default Login