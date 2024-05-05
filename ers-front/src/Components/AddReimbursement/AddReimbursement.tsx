import * as React from "react"
import Header from "../Header/Header"
import Employee from "../Employee"
import { useLocation } from "react-router-dom"
import { ReimbursementInputType, StatusEnum } from "../../Utilities/Types"
import axios from "axios"
import { baseUrl } from "../../Utilities/Utilities"

const AddReimbursement: React.FC<{}> = () => {

    const [ amountInput, setAmountInput ] = React.useState(0)
    const [ descriptionInput, setDescriptionInput ] = React.useState("");

    const location = useLocation();
    
    const employee = location.state.employee;

    // console.log(`In addReimb employee: ${JSON.stringify(employee)}`)

    const handleAmoutInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const amountEntered = event.target.value;
        setAmountInput(parseFloat(amountEntered));
    }

    const handleDescriptionInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const descriptionEntered= event.target.value;
        setDescriptionInput(descriptionEntered);
    }


    const submitReimbursement = async (reimbursement: ReimbursementInputType  ) => {
        const url = `${baseUrl}reimbursements`
        const response = await axios.post(
            url,
            {...reimbursement}
        )
        const reimbursementAdded = response.data
        console.log(`REIMBURSEMENT ADDED: ${JSON.stringify(reimbursementAdded)}`)
    
    }


    const handleSubmitReimbursement= (event: React.MouseEvent<HTMLButtonElement>) => {
        const reimbursement: ReimbursementInputType = {
            amount: amountInput,
            description: descriptionInput,
            employeeId: employee.employeeId
       }

       submitReimbursement(reimbursement)

    }

    return (
        <>
            <div className="header">
                <Header employee={employee} />
                <p className="welcome">{employee.firstName} {employee.lastName}</p>

            </div>
            <fieldset>
                <legend> Add New Reimbursement</legend>
                <label htmlFor="amoutn">Amount: </label>
                <input 
                    type="text" 
                    id="amount" 
                    value={amountInput.toString()}
                    onChange={handleAmoutInputChange}
                />
                <label htmlFor="description"></label>
                <input 
                    type="text" 
                    name="descripton" 
                    id="description" 
                    value={descriptionInput}
                    onChange={handleDescriptionInputChange} 
                />
                <button onClick={handleSubmitReimbursement}>Submit</button>
            </fieldset>
        </>
    )
}


export default AddReimbursement