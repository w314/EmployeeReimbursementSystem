import * as React from "react"

const AddReimbursement: React.FC<{}> = () => {
    
    return (
        <>
            <fieldset>
                <legend> Add New Reimbursement</legend>
                <label htmlFor="amoutn">Amount: </label>
                <input type="number" id="amount"/>
                <label htmlFor="description"></label>
                <input type="text" name="descripton" id="description" />
            </fieldset>
        </>
    )
}


export default AddReimbursement