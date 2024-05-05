import * as React from "react";
import { fetchData } from "../Utilities/Utilities";
import { useNavigate } from "react-router-dom";
import { RoleEnum } from "../Utilities/Types";
import InvalidCredentials from "./InvalidCredentials";

const EmployeeList: React.FC<{}> = () => {

    const [employees, setEmployees] = React.useState([]);
    const navigate = useNavigate();

    // navigate to login page if user credentials are not populated
    if(!sessionStorage.getItem("employeeId")) navigate('/')

    // const loggedInUserId = parseInt(sessionStorage.getItem("employeeId") as string)   
    const loggedInUserRole = sessionStorage.getItem("role")


    
    React.useEffect( () => {

        const handleFetchEmployees = async () => {
            const url = "http://localhost:8080/employees"
            const res = await fetchData(url)
            console.log(res);
            if(res?.response) {
                console.log("hi")
                console.log(res.response)
                setEmployees(res?.response)
            }
        }

        handleFetchEmployees();   
    }, [])



    return loggedInUserRole == RoleEnum.manager as string 
        ? (
            <>
            <h1>Employees</h1>
            {employees.map(emp => (
            <p>{ JSON.stringify(emp)}</p>
            ))}
            </>
        )
        : < InvalidCredentials />
}

export default EmployeeList