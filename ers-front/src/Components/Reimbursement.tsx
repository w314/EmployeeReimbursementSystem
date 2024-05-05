import * as React from "react"
import { ReimbursementType, RoleEnum, StatusEnum } from "../Utilities/Types";
import { baseUrl } from "../Utilities/Utilities";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Reimbursement: React.FC<{
    reimbursement: ReimbursementType,
    handleReimbursementUpdate: (updatedReimbursement: ReimbursementType) => void
}> = ({reimbursement, handleReimbursementUpdate}) => {

    // const [reimbursemetnStatus, setReimbursementStatus ] = React.useState(status)

    const navigate = useNavigate();

    // navigate to login page if user credentials are not populated
    if(!sessionStorage.getItem("employeeId")) navigate('/')

    // const loggedInUserId = parseInt(sessionStorage.getItem("employeeId") as string)   
    const loggedInUserRole = sessionStorage.getItem("role")
    console.log(`ROLE of User: ${loggedInUserRole}`)




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

    return (

        <>
        <div>
            <div>
                <span>{reimbursement.description} </span>
                <button 
                    hidden={loggedInUserRole == RoleEnum.manager || reimbursement.status != StatusEnum.pending}>edit</button>
            </div>
            <p>{reimbursement.amount}</p>
            <p>{reimbursement.status}</p>
            <div 
                hidden={loggedInUserRole == RoleEnum.associate}
            >
                {/* <Link to={`${baseUrl}/reimbursements/employees/${reimbursement.employeeId}`}>{reimbursement.employee}</Link> */}
                <p>{reimbursement.employee}</p>
                
            </div>
            <p>{JSON.stringify(reimbursement)}</p>
        </div>
        <div>
            <button 
                onClick={handleStatusButtonClick} 
                disabled={reimbursement.status != StatusEnum.pending}
                hidden={loggedInUserRole == RoleEnum.associate}
                id="approved">
                approve
            </button>
            <button 
                onClick={handleStatusButtonClick} 
                disabled={reimbursement.status != StatusEnum.pending} 
                hidden={loggedInUserRole == RoleEnum.associate}
                id="denied">
                deny
            </button>
        </div>
        <hr></hr>
        </>
    )
}

export default Reimbursement