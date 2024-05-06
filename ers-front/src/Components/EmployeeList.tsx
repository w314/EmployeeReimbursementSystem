import * as React from "react";
import { baseUrl, fetchData } from "../Utilities/Utilities";
import { useNavigate } from "react-router-dom";
import { EmployeeType, RoleEnum } from "../Utilities/Types";
import InvalidCredentials from "./InvalidCredentials";
import Employee from "./Employee";
import { getEmployee } from "../Utilities/Utilities";
import Login from "./Login/Login";
import Header from "./Header/Header";
import Navigation from "./Navigation/Navigation";
import axios from "axios";

const EmployeeList: React.FC<{}> = () => {

    const [employees, setEmployees] = React.useState([] as EmployeeType[]) ;

    
    const loggedIn = sessionStorage.getItem("employeeId")
    const employee: EmployeeType = getEmployee();

    
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


    const handleEmployeeDelete = (employee: EmployeeType) => {
        const url = `${baseUrl}employees/${employee.employeeId}`
        const response = axios.delete(url);

        const updatedEmployeeList = employees.filter(employee => employee.employeeId != employee.employeeId)
        setEmployees(updatedEmployeeList)

    }


    // return loggedIn == RoleEnum.manager as string 
    return loggedIn
        ? (  employee.role == RoleEnum.manager
            ? (
                <div className="content">
                    <div className="header">
                        < Header employee={employee} />
                        < Navigation />
                    </div>
                    <h1>Employees</h1>
                    <ul>
                        {/* create a list of employees */}
                        {/* filter first and show associates only */}
                        {employees
                            .filter(employee => employee.role == RoleEnum.associate)
                            .map(employee => (
                                // <li key={employee.employeeId}>{ JSON.stringify(employee)}</li>
                                < Employee 
                                    employee={employee}
                                    handleEmployeeDelete={handleEmployeeDelete} />
                            ))}

                    </ul>
                </div>
            )
            : < InvalidCredentials />
        )
        : <Login />
}

export default EmployeeList