export interface Linkage {
    "company_id": string;
    "accounts": LinkageAccount[] | undefined;
}

export interface LinkageAccount {
    "line_user_id": string,
    "line_display_name": string,
    "employee_code": string;
    "employee_key": string;
    "employee_name": string;
    "edited": boolean | undefined;
}
