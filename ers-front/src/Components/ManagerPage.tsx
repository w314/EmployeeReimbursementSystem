import * as React from "react"
import { Link, Navigate } from "react-router-dom"


const ManagerPage: React.FC<{} > = () => {
    
    // const navigate = useNavigate();

    // // check if user is logged in and navigate to login page if not logged in
    // if(user.employeeId == null) navigate('/')
    const employeeId = sessionStorage.getItem("employeeId")
    const role = sessionStorage.getItem("role")

    // const handleClick = (event: React.MouseEvent<HTMLButtonElement> ) => {

    // }

    return  (
        <nav>
            <Link to="/employees">Employees</Link>
            <Link to="/reimbursements">Reimbursements</Link>
            {/* <button onClick={handleClick} id="employees">Employees</button> */}
            {/* <button onClick={handleClick} id="reimbursements">Reimbursements</button> */}
        </nav>
    )
}

export default ManagerPage
