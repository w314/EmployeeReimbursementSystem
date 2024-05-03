import * as React from "react"

type Reimbursement = {
    description: string;
    amount: number;
    status: string;
}

const Reimbursement: React.FC<{
    reimbursement: Reimbursement
}> = ({reimbursement}) => {

    const {description, amount, status} = reimbursement;

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