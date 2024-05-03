import { Link } from "react-router-dom";
import { fetchData } from "../Utilities/fetchData."
import * as React from "react"
import Reimbursement from "./Reimbursement";



const ReimbursementList: React.FC<{}> = () => {

    const [ reimbursements, setReimbursements ] = React.useState([])
    const [ status, setStatus ] = React.useState("all");

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();

        setStatus(event.target.value);

        console.log(status);
    }

    const setUrl = () => {

        const baseUrl =  "http://localhost:8080/reimbursements";

        switch (status) {
            case "pending":
                return `${baseUrl}/status/pending`
            case "approved":
                return `${baseUrl}/status/approved`
            case "denied":
                return `${baseUrl}/status/denied`
        }

        return baseUrl;
    }


    React.useEffect(() => {
    
        const handleGetReimbursements = async () => {
            const url = setUrl();
            const res  = await fetchData(url);
            // console.log("in reimbursements")
            // console.log(res);
            if(res?.response) {
                setReimbursements(res.response);
            }          
        }
        handleGetReimbursements();
    },[status])

    return (
        <>
            <h1>Reimbursements</h1>
            <select onChange={handleStatusChange}>
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="denied">Denied</option>
            </select>
            <p>current status: {status}</p>
            <ul>
                {reimbursements.map(reimb => (
                    <li>< Reimbursement reimbursement={reimb} /></li>
                ))}
            </ul>
        </>
    )
}

export default ReimbursementList