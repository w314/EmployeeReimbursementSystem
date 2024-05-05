import * as React from "react"
import { EmployeeType, RoleEnum } from "../Utilities/Types"
import { Route, useNavigate } from "react-router-dom"
import InvalidCredentials from "./InvalidCredentials"

const Employee: React.FC<{
    employee: EmployeeType
}> = ({employee}) => {

    const [employees, setEmployees] = React.useState([] as EmployeeType[]) ;
    const navigate = useNavigate();

    // navigate to login page if user credentials are not populated
    if(!sessionStorage.getItem("employeeId")) navigate('/')

    // const loggedInUserId = parseInt(sessionStorage.getItem("employeeId") as string)   
    const loggedInUserRole = sessionStorage.getItem("role")
    console.log(`ROLE of User: ${loggedInUserRole}`)

    const handleClick = () => {

    }


    return loggedInUserRole == RoleEnum.manager
        ? (
            <>
                <p>{employee.firstName} {employee.lastName}</p>
                <button onClick={handleClick}>Delete</button>
            </>
        )
        : < InvalidCredentials />
 
}

export default Employee