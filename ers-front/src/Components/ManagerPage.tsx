import * as React from "react"
import EmployeeList from "./EmployeeList"
import { Link } from "react-router-dom"

const ManagerPage: React.FC<{}> = () => {

    return (
        <nav>
            <Link to="/employees">Employees</Link>
            <Link to="/reimbursements">Reimbursements</Link>
        </nav>
    )
}

export default ManagerPage
