import * as React from  "react"
import { baseUrl, fetchData } from "../../Utilities/Utilities"
import axios from "axios"
import { RoleEnum, EmployeeType } from "../../Utilities/Types"
import { useNavigate } from "react-router-dom"
import ManagerPage from "../ManagerPage"
import EmployeePage from "../EmployeePage/EmployeePage"
import Header from "../Header/Header"
import "./Login.css"
import ReimbursementList from "../ReimbursementList/ReimbursementList"

const Login: React.FC<{}> = () => {

    const [ userCredentials, setUserCredentials ] = React.useState({username: "", password: ""})
    const [ errorMessage, setErrorMessage ] = React.useState("");
    const [ loggedInUser, setLoggedInUser ] = React.useState({} as EmployeeType)
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
        const { data, status } = await axios.post<EmployeeType>(
            url,
            {...userCredentials},
            {withCredentials: true}
        );
        
        console.log(JSON.stringify(data, null, 4));        
        console.log(status);
        
        setLoggedInUser({... data})
        // save logged in user to session storage
        sessionStorage.setItem("employeeId", data.employeeId.toString())
        sessionStorage.setItem("role", data.role)
        sessionStorage.setItem("lastName", data.lastName)
        sessionStorage.setItem("firstName", data.firstName)
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


    // if the user is not logged in a login page is rendered
    return loggedInUser.employeeId == null
        ? (
            <div className="content">
                <div className="header textLeft">
                < Header employee={null} />

                </div>
                <div>
                    {/* <form> */}
                        <fieldset>
                            <legend>Please Log In to ERS</legend>
                            <label htmlFor="username">Username: </label>
                            <input type="text" name="username" id="username" onChange={handleUsernameChange} value={userCredentials.username} />
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" onChange={handlePasswordChange} value={userCredentials.password}/>
                            <button onClick={handleOnClick}>Login</button>

                        </fieldset>
                    {/* </form> */}
                </div>


            </div>

        )
        // if the user is logged in the page rendered is based on their role
        : loggedInUser.role == RoleEnum.manager
            ? < ManagerPage employee={loggedInUser}/>
            : < EmployeePage employee={loggedInUser} />
        // : <ReimbursementList employee={loggedInUser} />
    
}

export default Login