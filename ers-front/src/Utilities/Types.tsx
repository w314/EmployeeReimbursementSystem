
export enum StatusEnum {
    "pending" = "pending",
    "approved" = "approved",
    "denied" = "denied"
}

export enum RoleEnum {
    "employee" = "employee",
    "manager" = "manager"
}


export type ReimbursementType = {
    reimbursementId: number;
    description: string;
    amount: number;
    status: StatusEnum;
}

export type UserType = {
    employeeId: number,
    firstName: String,
    LastName: String,
    role: RoleEnum,
}


