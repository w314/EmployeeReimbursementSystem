import * as React from "react"
import './Header.css'
import { EmployeeType, RoleEnum } from "../../Utilities/Types";
import { useNavigate } from "react-router-dom";

const Header: React.FC<{
    employee: EmployeeType | null
}> = ({employee}) => {

    const [loggedOut, setLoggedOut ] = React.useState(employee == null);

    const navigate = useNavigate();


 

        const handleLogoutClick = () => {
            console.log(`IN HANDLELOGOUT`)
            sessionStorage.clear();
            setLoggedOut(true)
    }

    React.useEffect(() => {
        if(loggedOut) {
            navigate('/')
        }

    },[loggedOut])
 

    return (
        <div className="headerTitle">
            <h1>Employee Reimbursement System</h1>
            <button 
                onClick={handleLogoutClick}
                hidden={loggedOut}
            >Logout</button>
        </div>

    )
}

export default Header