import * as React from "react"
import './Header.css'
import { EmployeeType, RoleEnum } from "../../Utilities/Types";
import { useNavigate } from "react-router-dom";

const Header: React.FC<{
    employee: EmployeeType | null
}> = ({employee}) => {

    const navigate = useNavigate();

    const handleLogoutClick = () => {
        sessionStorage.clear();
        navigate('/')
    }
 

    return (
        <div className="title">
            <h1>Employee Reimbursement System</h1>
            <button 
                onClick={handleLogoutClick}
                hidden={employee == null}
            >Logout</button>
        </div>

    )
}

export default Header