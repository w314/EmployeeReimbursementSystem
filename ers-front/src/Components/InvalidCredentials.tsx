import * as React from "react"

const InvalidCredentials: React.FC<{}> = () => {
    return (
        <h2>{`${sessionStorage.getItem("firstName")}, you do not have the credentials to view this page.`}</h2>
    )
}

export default InvalidCredentials