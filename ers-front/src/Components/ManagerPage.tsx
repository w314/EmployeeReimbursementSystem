import * as React from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import Header from "./Header/Header"
import { EmployeeType, RoleEnum } from "../Utilities/Types"
import ReimbursementList from "./ReimbursementList/ReimbursementList"
import { getEmployee } from "../Utilities/Utilities"
import Navigation from "./Navigation/Navigation"
import Login from "./Login/Login"

// const ManagerPage: React.FC<{
//     employee: EmployeeType
// } > = ({ employee }) => {
    
const ManagerPage: React.FC<{} > = () => {
    
    const navigate = useNavigate();

    // check if user is logged in and navigate to login page if not logged in

    // if(!sessionStorage.getItem("employeeId")) navigate('/')
    
        const loggedIn = sessionStorage.getItem("employeeId")


    const employee: EmployeeType = getEmployee();


    // const employeeId = sessionStorage.getItem("employeeId")
    // const role = sessionStorage.getItem("role")

    // const handleClick = (event: React.MouseEvent<HTMLButtonElement> ) => {

    // }

    return  loggedIn
    ? (
        <div className="content">
            <div className="header">
                <Header employee={employee} />
                <Navigation/>
            </div>
            <ReimbursementList />
        </div>
    )
    : <Login />
}

export default ManagerPage
