import * as React from "react"
import { ReimbursementType, StatusEnum } from "../Utilities/Types";
import { baseUrl } from "../Utilities/Utilities";
import axios from "axios";

const Reimbursement: React.FC<{
    reimbursement: ReimbursementType,
    handleReimbursementUpdate: (updatedReimbursement: ReimbursementType) => void
}> = ({reimbursement, handleReimbursementUpdate}) => {

    // const [reimbursemetnStatus, setReimbursementStatus ] = React.useState(status)


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
            <p>{reimbursement.description}</p>
            <p>{reimbursement.amount}</p>
            <p>{reimbursement.status}</p>
        </div>
        <div>
            <button 
                onClick={handleStatusButtonClick} 
                disabled={reimbursement.status != StatusEnum.pending}
                id="approved">
                approve
            </button>
            <button 
                onClick={handleStatusButtonClick} 
                disabled={reimbursement.status != StatusEnum.pending} 
                id="denied">
                deny
            </button>
        </div>
        <hr></hr>
        </>
    )
}

export default Reimbursement