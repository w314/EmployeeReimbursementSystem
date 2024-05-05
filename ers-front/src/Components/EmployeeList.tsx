import * as React from "react";
import { fetchData } from "../Utilities/Utilities";
import { useNavigate } from "react-router-dom";
import { EmployeeType, RoleEnum } from "../Utilities/Types";
import InvalidCredentials from "./InvalidCredentials";
import Employee from "./Employee";

const EmployeeList: React.FC<{}> = () => {

    const [employees, setEmployees] = React.useState([] as EmployeeType[]) ;
    const navigate = useNavigate();

    // navigate to login page if user credentials are not populated
    if(!sessionStorage.getItem("employeeId")) navigate('/')

    // const loggedInUserId = parseInt(sessionStorage.getItem("employeeId") as string)   
    const loggedInUserRole = sessionStorage.getItem("role")
    console.log(`ROLE of User: ${loggedInUserRole}`)


    
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
                <ul>
                    {/* create a list of employees */}
                    {/* filter first and show associates only */}
                    {employees
                        .filter(employee => employee.role == RoleEnum.associate)
                        .map(employee => (
                            // <li key={employee.employeeId}>{ JSON.stringify(employee)}</li>
                            < Employee employee={employee} />
                        ))}

                </ul>
            </>
        )
        : < InvalidCredentials />
}

export default EmployeeList