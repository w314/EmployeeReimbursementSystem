import * as React from "react"
import { ReimbursementType, RoleEnum, StatusEnum } from "../../Utilities/Types";
import { baseUrl } from "../../Utilities/Utilities";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Reimbursement.css"
import { getEmployee } from "../../Utilities/Utilities";
import { EmployeeType } from "../../Utilities/Types";
import Login from "../Login/Login";

const Reimbursement: React.FC<{
    reimbursement: ReimbursementType,
    handleReimbursementUpdate: (updatedReimbursement: ReimbursementType) => void
}> = ({reimbursement, handleReimbursementUpdate}) => {

    // const [reimbursemetnStatus, setReimbursementStatus ] = React.useState(status)

    const navigate = useNavigate();


            
    const loggedIn = sessionStorage.getItem("employeeId")
    const employee: EmployeeType = getEmployee();


        // handle change in the status of a specific reimbursement (in case it was approved or denied)
        const updateReimbursementStatus= async (newStatus: StatusEnum) => {
            // console.log(`Incoming updated reimb in List: ${JSON.stringify(updatedReimbursement)}`)
            // update reimbursement status in the database
            console.log(`ID of reimbursement: ${reimbursement.reimbursementId}`)
            console.log(JSON.stringify(reimbursement))
            const url = `${baseUrl}reimbursements/${reimbursement.reimbursementId}/status/${newStatus}`
            const response = await axios.patch(url);
            const updatedReimbursement = response.data
            // update reimbursementList in component
            handleReimbursementUpdate(updatedReimbursement)
        }

    const handleStatusButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // cast event target as button
        const button = event.target as HTMLButtonElement;
        // get id of button where status is stored
        // giving status the type unknown which will be converted later to StatusEnum
        const newStatus: unknown = button.getAttribute("id");
        // console.log(`Satus of button clicked: ${status}`)
        // update status on reimbursement by calling the function passed down as props
        // const updatedReimbursement = {
        //     ...reimbursement,
        //     satus: updatedStatus as StatusEnum 
        // }
        // console.log(`Updated reimbursement: ${JSON.stringify(updatedReimbursement)}`)
        updateReimbursementStatus(newStatus as StatusEnum)
        // setReimbursementStatus(status as StatusEnum);

    }

    return loggedIn
      ? (
        <div className="reimbursement">
            <div  className="details">
            {/* <span className="rowFlex"> */}
                    {/* <label htmlFor="status">Status: </label> */}
                    <p className={`${reimbursement.status} bolder`}>{reimbursement.status.toLocaleUpperCase()}</p>
                {/* </span> */}
                <span className="rowFlex" hidden={employee.role == RoleEnum.associate}>
                    {/* <Link to={`${baseUrl}/reimbursements/employees/${reimbursement.employeeId}`}>{reimbursement.employee}</Link> */}
                    <label htmlFor="employee">Submitted By:</label>
                    <span id="employee">{reimbursement.employee}</span>
                </span>

                <div>
                    <label htmlFor="description"></label>
                    <button hidden={employee.role == RoleEnum.manager || reimbursement.status != StatusEnum.pending}>edit</button>

                    <span id="description">{reimbursement.description} </span>
                </div>
                <p>{reimbursement.amount}</p>
            </div>
            <div className="buttons">
                <button 
                    className={reimbursement.status == StatusEnum.pending ? "approved" : ""}
                    onClick={handleStatusButtonClick} 
                    disabled={reimbursement.status != StatusEnum.pending}
                    hidden={employee.role == RoleEnum.associate}
                    id="approved">
                    Approve
                </button>
                <button 
                    className={reimbursement.status == StatusEnum.pending ? "denied" : ""}
                    onClick={handleStatusButtonClick} 
                    disabled={reimbursement.status != StatusEnum.pending} 
                    hidden={employee.role == RoleEnum.associate}
                    id="denied">
                    Deny
                </button>
            </div>
        </div>
    )
    : < Login />
}

export default Reimbursement