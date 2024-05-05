import * as React from "react";
import { EmployeeType, RoleEnum } from "../Utilities/Types";
import { useNavigate } from "react-router-dom";
import ReimbursementList from "./ReimbursementList";

const EmployeePage: React.FC<{
    employee: EmployeeType
    }> = ({employee}) => {

    const navigate = useNavigate();

    // navigate to login page if user credentials are not populated
    if(!sessionStorage.getItem("employeeId")) navigate('/')

    // const loggedInUserId = parseInt(sessionStorage.getItem("employeeId") as string)   
    const loggedInUserRole = sessionStorage.getItem("role")
    console.log(`ROLE of User: ${loggedInUserRole}`)



    return (
        <>
            <h1>Employee Page</h1>
            <h2>{employee.firstName} {employee.lastName}</h2>

            <ReimbursementList />
        </>
    )
} 

export default EmployeePage