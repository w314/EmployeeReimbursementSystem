import * as React from "react";
import { EmployeeType, RoleEnum } from "../../Utilities/Types";
import { useNavigate } from "react-router-dom";
import ReimbursementList from "../ReimbursementList/ReimbursementList";
import Header from "../Header/Header";
import "./EmployeePage.css"

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
        <div className="content">
  
            <div className="header">
            < Header employee={employee} />
            <h2 className="welcome">Welcome {employee.firstName} {employee.lastName}!</h2>
            </div>


            <ReimbursementList/>
        </div>
    )
} 

export default EmployeePage