import * as React from "react";
import { fetchData } from "../Utilities/Utilities";

const EmployeeList: React.FC<{}> = () => {

    const [employees, setEmployees] = React.useState([]);

    React.useEffect( () => {

        const handleFetchEmployees = async () => {

            const url = "http://localhost:8080/employees"
            const res = await fetchData(url)
            console.log(res);
            if(res?.response) {
                console.log("hi")
                console.log(res.response)
                setEmployees(res?.response)
            }

        }

        handleFetchEmployees();
    

    }, [])



    return (
        <>
        <h1>Employees</h1>
        {employees.map(emp => (
         <p>{ JSON.stringify(emp)}</p>
    ))}
    </>
    )
}

export default EmployeeList