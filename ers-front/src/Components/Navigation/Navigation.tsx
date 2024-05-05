import * as React from "react"
import { useNavigate } from "react-router-dom"
import { EmployeeType } from "../../Utilities/Types"

const Navigation: React.FC<{
    employee: EmployeeType
}> = ({employee}) => {

    const navigate = useNavigate();


    const handleReimbursementClick = () => {
        navigate("/reimbursements", {
            state: {
             employee
            }    
        })
    }
    
    const handleEmployeesClick = () => {
        navigate("/employees", {
            state: {
             employee
            }    
        })
    }

    // const hideNavigation = () => {
    //     if(employee == null) return true
    //     if(employee.role == RoleEnum.associate) return true
    //     return false
    // }


    return(
        <nav>                           
        {/* <span className="link">
            <Link to="/reimbursements" state={{employee: employee}}>Reimbursements</Link>
        </span> */}
        <button onClick={handleReimbursementClick}>Reimbursements</button>
        <button onClick={handleEmployeesClick}>Employees</button>
        {/* <span className="link">
            <Link to="/employees" state={{employee: employee}}>Employees</Link>
        </span> */}
    </nav>

    )
}

export default Navigation