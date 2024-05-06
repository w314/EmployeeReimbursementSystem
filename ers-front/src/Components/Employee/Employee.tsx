import * as React from "react"
import { EmployeeType, RoleEnum } from "../../Utilities/Types"
import { Route, useNavigate } from "react-router-dom"
import InvalidCredentials from "../InvalidCredentials"
import "./Employee.css"

const Employee: React.FC<{
    employee: EmployeeType
    handleEmployeeDelete: (employee: EmployeeType) => void
}> = ({employee, handleEmployeeDelete}) => {


    const handleDeleteClick = () => {
        handleEmployeeDelete(employee)
    }


    return (
            <div className="rowFlex spaceBetween employee">
                <p>{employee.firstName} {employee.lastName}</p>
                <button onClick={handleDeleteClick}>Delete</button>
            </div>
        )

 
}

export default Employee