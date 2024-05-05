import { baseUrl, fetchData } from "../../Utilities/Utilities"
import * as React from "react"
import Reimbursement from "../Reimbursement/Reimbursement";
import { ReimbursementType, RoleEnum, StatusEnum, EmployeeType } from "../../Utilities/Types";
import { useNavigate } from "react-router-dom";
import InvalidCredentials from "../InvalidCredentials";
import Employee from "../Employee";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
import "./ReimbursementList.css"

const ReimbursementList: React.FC<{
    employee: EmployeeType | null
} > = (props) => {

    const [ reimbursements, setReimbursements ] = React.useState([] as ReimbursementType[])
    const [ statusFilter, setStatusFilter ] = React.useState("all" as StatusEnum | "all");
    
    const navigate = useNavigate();
    const location = useLocation();


    // navigate to login page if user credentials are not populated
    if(!sessionStorage.getItem("employeeId")) navigate('/')

    const loggedInUserId = parseInt(sessionStorage.getItem("employeeId") as string)   
    const loggedInUserRole = sessionStorage.getItem("role")

    const employee = props.employee == null ? location.state.employee : props.employee

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
        navigate("/reimbursements/addReimbursement", {
            state: {
                employee: employee
            }
        })
    }


    React.useEffect(() => {
        console.log('fetching reimbursements')
        const handleGetReimbursements = async () => {
            const url = loggedInUserRole == RoleEnum.manager as string 
                ?  `${baseUrl}reimbursements`
                :  `${baseUrl}reimbursements/employees/${loggedInUserId}`
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
    // ? (
    return (
        <div className="content">  
            {/* <div  hidden={employee.role == RoleEnum.associate}>
            < Header 
                employee={employee}          />

            </div> */}
            <div className="title">
                <h2>Reimbursements</h2>
                <select onChange={handleStatusFilterChange}>
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="denied">Denied</option>
                </select>
                <button 
                    hidden={loggedInUserRole=="manager"}
                    onClick={handleAddReimbursementClick}
                >Add Reimbursement</button>
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
    // : < InvalidCredentials />

}

export default ReimbursementList