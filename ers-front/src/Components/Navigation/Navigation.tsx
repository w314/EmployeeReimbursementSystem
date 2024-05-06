import * as React from "react"
import { useNavigate } from "react-router-dom"
import { EmployeeType } from "../../Utilities/Types"
import "./Navigation.css"

const Navigation: React.FC<{}> = () => {

    const navigate = useNavigate();


    const handleReimbursementClick = () => {
        navigate("/reimbursements")
    }
    
    const handleEmployeesClick = () => {
        navigate("/employees")
    }


    return(
        <nav>                           
        {/* <span className="link">
            <Link to="/reimbursements" state={{employee: employee}}>Reimbursements</Link>
        </span> */}
        <button
            onClick={handleReimbursementClick}
        >Reimbursements</button>
        <button onClick={handleEmployeesClick}>Employees</button>
        {/* <span className="link">
            <Link to="/employees" state={{employee: employee}}>Employees</Link>
        </span> */}
    </nav>

    )
}

export default Navigation