import * as React from "react"
import { ReimbursementType } from "../Utilities/Types";

const Reimbursement: React.FC<{
    reimbursement: ReimbursementType
}> = ({reimbursement}) => {

    const {id, description, amount, status} = reimbursement;

    return (

        <>
        <p>{description}</p>
        <p>{amount}</p>
        <p>{status}</p>
        <hr></hr>
        </>
    )
}

export default Reimbursement