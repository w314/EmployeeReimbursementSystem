
export enum StatusEnum {
    "pending" = "pending",
    "approved" = "approved",
    "denied" = "denied"
}


export type ReimbursementType = {
    reimbursementId: number;
    description: string;
    amount: number;
    status: StatusEnum;
}


