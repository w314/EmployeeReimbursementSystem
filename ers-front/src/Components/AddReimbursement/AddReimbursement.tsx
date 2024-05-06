import * as React from "react"
import Header from "../Header/Header"
import Employee from "../Employee/Employee"
import { useLocation } from "react-router-dom"
import { ReimbursementInputType, StatusEnum } from "../../Utilities/Types"
import axios from "axios"
import { baseUrl } from "../../Utilities/Utilities"
import { EmployeeType } from "../../Utilities/Types"
import { getEmployee } from "../../Utilities/Utilities"
import Login from "../Login/Login"
import { ReimbursementType } from "../../Utilities/Types"
import { formatter } from "../../Utilities/Utilities"
import "./AddReimbursement.css"

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


    const validAmount = (amount: string) => {
        if(isNaN(Number(amount))) {
            alert(`Amount has to be a number!`)
            return false
        }
        if(amount == "") {
            alert('Please enter an amount')
            return false
        }
        return true
    }

    const validDescription = (description: string) => {
        if(description.length == 0 ) {
            alert(`Please enter a description`)
            return false
        }
        return true
    }

    const handleAmoutInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const amountEntered = event.target.value;
        if(validAmount(amountEntered)) setAmountInput(amountEntered);
    }

    const handleDescriptionInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const descriptionEntered= event.target.value;
        if(validDescription(descriptionEntered)) setDescriptionInput(descriptionEntered);
    }


    const submitReimbursement = async (reimbursement: ReimbursementInputType  ) => {
        if(!validAmount(amountInput) || !validDescription(descriptionInput)) return;
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
                <label htmlFor="descriptionInput"></label>
                <input 
                    type="text" 
                    tabIndex={2}
                    name="descripton" 
                    id="descriptionInput" 
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