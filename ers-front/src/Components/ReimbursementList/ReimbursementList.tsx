import { baseUrl, fetchData } from "../../Utilities/Utilities"
import * as React from "react"
import Reimbursement from "../Reimbursement/Reimbursement";
import { ReimbursementType, RoleEnum, StatusEnum, EmployeeType, ReimbursementInputType } from "../../Utilities/Types";
import { useNavigate } from "react-router-dom";
import InvalidCredentials from "../InvalidCredentials";
import Employee from "../Employee/Employee";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
import "./ReimbursementList.css"
import { getEmployee } from "../../Utilities/Utilities";
import Login from "../Login/Login";
import { Link } from "react-router-dom";
import AddReimbursement from "../AddReimbursement/AddReimbursement";

const ReimbursementList: React.FC<{}> = () => {

    const [ reimbursements, setReimbursements ] = React.useState([] as ReimbursementType[])
    const [ statusFilter, setStatusFilter ] = React.useState("all" as StatusEnum | "all");
    const [ showAddReimbursement , setShowAddReimbursement ] = React.useState(false)
    
    // const navigate = useNavigate();
    // const location = useLocation();


    // navigate to login page if user credentials are not populated
    // if(!sessionStorage.getItem("employeeId")) navigate('/')

            
    const loggedIn = sessionStorage.getItem("employeeId")
    const employee: EmployeeType = getEmployee();

    // const loggedInUserId = parseInt(sessionStorage.getItem("employeeId") as string)   
    // const loggedInUserRole = sessionStorage.getItem("role")

    // const employee = props.employee == null ? location.state.employee : props.employee

    // handle change in how we filter the ReimbursementList (all, pending, approved or denied only)
    const handleStatusFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        setStatusFilter(event.target.value as StatusEnum);
    }


    const handleReimbursementUpdate = (updatedReimbursement: ReimbursementType) => {
        console.log(`Incoming updated reimb: ${JSON.stringify(updatedReimbursement)}`)
        console.log(`ID of incoming reimbursement: ${updatedReimbursement.reimbursementId}`)
        const updatedReimbursements: unknown = reimbursements.map(reimbursement => (
            reimbursement.reimbursementId == updatedReimbursement.reimbursementId
                ? updatedReimbursement
                : reimbursement
            )
        )
        console.log(`Updated Reim. List:`)
        console.log(JSON.stringify(updatedReimbursements))

        setReimbursements(updatedReimbursements as ReimbursementType[]);
    }

    const handleAddReimbursementClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setShowAddReimbursement(true)
    }

    const handleAddReimbursementSubmit = (reimbursement: ReimbursementType) => {
        console.log(`back in reim list`)
        console.log(JSON.stringify(reimbursement))
        setShowAddReimbursement(false)
        setReimbursements([...reimbursements, reimbursement])
    }


    React.useEffect(() => {
        console.log('fetching reimbursements')
        const handleGetReimbursements = async () => {
            const url = employee.role == RoleEnum.manager as string 
                ?  `${baseUrl}reimbursements`
                :  `${baseUrl}reimbursements/employees/${employee.employeeId}`
            const res  = await fetchData(url);
            if(res?.response) {
                console.log(`INITIAL REIMB LIST:`)
                console.log(res.response)
                setReimbursements(res.response);
            }          
        }
        handleGetReimbursements();
    }, [])


    // if logged in user is not a manager do not render the reimbursement list
    // return loggedInUserRole == RoleEnum.manager

    return  loggedIn 
        ? (
        <div className="content">  
            {/* <div  hidden={employee.role == RoleEnum.associate}>
            < Header 
                employee={employee}          />

            </div> */}
            <div className="subheader">
                <div className="rowFlex flexStart alignCenter titleSatus">
                <h2 className="subTitle">Reimbursements</h2>
                <select className="statusSelect" onChange={handleStatusFilterChange}>
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="denied">Denied</option>
                </select>
                </div>
                <button 
                    className="addreimbursementbutton"
                    hidden={employee.role=="manager"}
                    onClick={handleAddReimbursementClick}
                >
                {/* <Link to={`/reimbursements/addReimbursement`} >Add Reimbursement</Link> */}
                Add Reimbursement
                </button>
            </div>
            <div>
                { showAddReimbursement
                ?  <AddReimbursement handleAddReimbursementSubmit={handleAddReimbursementSubmit}/>
                : null
                }   
            </div>
            {/* render list of reimbursements */}
            <ul>
                {reimbursements
                    // first filter reimbursements
                    // only show the ones where the status matches the statusFilter selection
                    .filter(reimbursement => statusFilter == "all" || reimbursement.status == statusFilter )
                    // render a Reimbursement child element for each reimbursement
                    .map(reimbursement => (
                    // set a key for each item
                    <li key={reimbursement.reimbursementId}>
                        < Reimbursement 
                            // send the reimbursement object as prop
                            reimbursement={reimbursement}
                            // send the function to update the reimbursement as prop
                            handleReimbursementUpdate={handleReimbursementUpdate}
                         />
                    </li>
                ))}
            </ul>
        </div>
    )
    : <Login />

}

export default ReimbursementList