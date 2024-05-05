import * as React from "react"
import { Link, Navigate } from "react-router-dom"
import Header from "./Header/Header"
import { EmployeeType } from "../Utilities/Types"
import ReimbursementList from "./ReimbursementList/ReimbursementList"
import Navigation from "./Navigation/Navigation"


const ManagerPage: React.FC<{
    employee: EmployeeType
} > = ({ employee }) => {
    
    // const navigate = useNavigate();

    // // check if user is logged in and navigate to login page if not logged in
    // if(user.employeeId == null) navigate('/')
    const employeeId = sessionStorage.getItem("employeeId")
    const role = sessionStorage.getItem("role")

    // const handleClick = (event: React.MouseEvent<HTMLButtonElement> ) => {

    // }

    return  (
        <div className="content">
            <div className="header">
             <Header employee={employee} />
             <Navigation employee={employee}/>
            {/* <nav> */}
                {/* <Link to="/employees">Employees</Link> */}
                {/* <Link to="/reimbursements">Reimbursements</Link> */}
                {/* <button onClick={handleClick} id="employees">Employees</button> */}
                {/* <button onClick={handleClick} id="reimbursements">Reimbursements</button> */}
            {/* </nav> */}

            </div>
            <ReimbursementList employee={employee} />
        </div>
    )
}

export default ManagerPage
