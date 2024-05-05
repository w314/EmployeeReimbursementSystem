import * as React from "react"
import './Header.css'
import { EmployeeType, RoleEnum } from "../../Utilities/Types";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header: React.FC<{
    employee: EmployeeType | null
}> = ({employee}) => {

    // const [loggedIn, setLoggedIn ] = React.useState(false);

    // React.useEffect(() => {
    //     setLoggedIn(sessionStorage.length > 0)
    // },[sessionStorage.length])
    
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        sessionStorage.clear();
        navigate('/')
    }

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

    // const loggedIn = () =>  sessionStorage.length == 0;

    const hideNavigation = () => {
        if(employee == null) return true
        if(employee.role == RoleEnum.associate) return true
        return false
    }


    return (
        <>
            <header>
                <div>
                    <h1>Employee Reimbursement System</h1>
                    <button 
                        onClick={handleLogoutClick}
                        hidden={employee == null}
                    >Logout</button>
                </div>
                <nav
                    hidden={hideNavigation()}
                >                            
                    {/* <span className="link">
                        <Link to="/reimbursements" state={{employee: employee}}>Reimbursements</Link>
                    </span> */}
                    <button onClick={handleReimbursementClick}>Reimbursements</button>
                    <button onClick={handleReimbursementClick}>Employees</button>
                    {/* <span className="link">
                        <Link to="/employees" state={{employee: employee}}>Employees</Link>
                    </span> */}
                </nav>
            </header>
        </>

    )
}

export default Header