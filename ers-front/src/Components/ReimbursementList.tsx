import { Link } from "react-router-dom";
import { fetchData } from "../Utilities/fetchData."
import * as React from "react"



const ReimbursementList: React.FC<{}> = () => {

    const [ reimbursements, setReimbursements ] = React.useState([])
    const [ status, setStatus ] = React.useState("");

    React.useEffect(() => {

        
        const handleGetReimbursements = async () => {
            const url = "http://localhost:8080/reimbursements"
            const res  = await fetchData(url);
            console.log("in reimbursements")
            console.log(res);
            if(res?.response) {
                setReimbursements(res.response);

            }          
        }
        handleGetReimbursements();
    },[])

    return (
        <>
        <h1>Reimbursements</h1>
        {/* <ul>
             <li><Link to="/reimbursements">All</Link></li>
            <li><Link to="/reimbursements/status/pending">Pending</Link></li>
            <li><Link to="/reimbursements/status/approved">Approved</Link></li>
            <li><Link to="/reimbursements/status/denied">Denied</Link></li>             
            <li>All</li>
            <li>Pending</li>
            <li>Approved</li>
            <li>Denied</li>
        </ul> 
        */}
        <label htmlFor="all">All</label>
        <input type="radio" name="status" value="all" id="all" checked/>
        <label htmlFor="pending">Pending</label>
        <input type="radio" name="status" value="pending" id="pending"/>
        <label htmlFor="approved">Approved</label>
        <input type="radio" name="status" value="approved" id="approved"/>
        <label htmlFor="denied">Denied</label>
        <input type="radio" name="status" value="denied" id="denied"/>

        {reimbursements.map(reimb => (
            <p>{JSON.stringify(reimb)}</p>
        ))}
        </>
    )
}

export default ReimbursementList