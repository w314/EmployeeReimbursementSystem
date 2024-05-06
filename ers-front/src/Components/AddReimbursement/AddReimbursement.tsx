import * as React from "react"
import Header from "../Header/Header"
import Employee from "../Employee"
import { useLocation } from "react-router-dom"
import { ReimbursementInputType, StatusEnum } from "../../Utilities/Types"
import axios from "axios"
import { baseUrl } from "../../Utilities/Utilities"
import { EmployeeType } from "../../Utilities/Types"
import { getEmployee } from "../../Utilities/Utilities"
import Login from "../Login/Login"
import { ReimbursementType } from "../../Utilities/Types"

const AddReimbursement: React.FC<{
    handleAddReimbursementSubmit: (reimbusement: ReimbursementType) => void
}> = ({handleAddReimbursementSubmit}) => {

    const [ amountInput, setAmountInput ] = React.useState("")
    const [ descriptionInput, setDescriptionInput ] = React.useState("");

    // const location = useLocation();
    
    // const employee = location.state.employee;

    // console.log(`In addReimb employee: ${JSON.stringify(employee)}`)

        
    const loggedIn = sessionStorage.getItem("employeeId")
    const employee: EmployeeType = getEmployee();

    const handleAmoutInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const amountEntered = event.target.value;
        setAmountInput(amountEntered);
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
        
        // clean input fields
        setAmountInput("")
        setDescriptionInput("")
        handleAddReimbursementSubmit(reimbursementAdded)

    
    }


    const handleSubmitReimbursement= (event: React.MouseEvent<HTMLButtonElement>) => {
        const reimbursement: ReimbursementInputType = {
            amount: parseFloat(amountInput),
            description: descriptionInput,
            employeeId: employee.employeeId
       }

       submitReimbursement(reimbursement)

    }

    return loggedIn
        ? (
        <>
            {/* <div className="header">
                <Header employee={employee} />
                <p className="welcome">{employee.firstName} {employee.lastName}</p>

            </div> */}
            <fieldset>
                <legend> Add New Reimbursement</legend>
                <label htmlFor="amount">Amount: </label>
                <input 
                    type="text" 
                    id="amount" 
                    tabIndex={1}
                    value={amountInput.toString()}
                    onChange={handleAmoutInputChange}
                />
                <label htmlFor="description"></label>
                <input 
                    type="text" 
                    tabIndex={2}
                    name="descripton" 
                    id="description" 
                    value={descriptionInput}
                    onChange={handleDescriptionInputChange} 
                />
                <button
                    tabIndex={3} 
                    onClick={handleSubmitReimbursement}>Submit</button>
            </fieldset>
        </>
    )
    : <Login />
}


export default AddReimbursement