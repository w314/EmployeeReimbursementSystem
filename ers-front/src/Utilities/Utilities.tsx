import axios from "axios"
import { useNavigate } from "react-router-dom"
import { EmployeeType } from "./Types"
import { RoleEnum } from "./Types"

export const fetchData = async (url: string) => {

//  USING FETCH
//     try {
//         const res = await fetch(url)
//         // console.log('response')
//         // console.log(res.json)
//         if(res.ok) {
//             return {
//                 error: null,
//                 response: await res.json()
//             }
//         }
//     } catch(e) {
//         return {
//             error: e,
//             response: null
//         }
//     }


// USING AXIOS
    try {
        const response = await axios(url)
        return {
           response: response.data,
           error: null
        }
    } catch (err) {
        return {
            response: null,
            error: err
        }
    }
}

export const baseUrl = "http://localhost:8080/";


// export const checkLoginCredentials = ( ) => {
      
//     // check if user is logged in and navigate to login page if not logged in
//     const userId = 
// }

export const getEmployee = () => {

    const employee: EmployeeType =  {
        employeeId: parseInt(sessionStorage.getItem("employeeId") as string, 10),
        firstName: sessionStorage.getItem("firstName") as string,
        lastName: sessionStorage.getItem("lastName") as string,
        role: sessionStorage.getItem("role") as RoleEnum   
    } 

    return employee;
}
