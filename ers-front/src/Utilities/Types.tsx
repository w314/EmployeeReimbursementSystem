
export enum StatusEnum {
    "pending" = "pending",
    "approved" = "approved",
    "denied" = "denied"
}

export enum RoleEnum {
    "associate" = "associate",
    "manager" = "manager"
}


export type ReimbursementType = {
    reimbursementId: number;
    description: string;
    amount: number;
    status: StatusEnum;
    employee: string;
    employeeId: number;
}

export type ReimbursementInputType = {
    description: string;
    amount: number;
    employeeId: number;

}

export type EmployeeType = {
    employeeId: number;
    firstName: string;
    lastName: string;
    role: RoleEnum;
}


