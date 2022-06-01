export interface Linkage {
    "company_code": string;
    "accounts": LinkageAccount[];
}

interface LinkageAccount {
    "line_user_id": string,
    "line_display_name": string,
    "kot_number": string;
    "kot_key": string;
    "kot_name": string;
}
