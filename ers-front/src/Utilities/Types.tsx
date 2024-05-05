
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
}

export type EmployeeType = {
    employeeId: number,
    firstName: string,
    lastName: string,
    role: RoleEnum,
}


