export interface PaginationParams {
    limit : number;
    page : number;

    [key:string]:any
}

export interface ListResponse<T> {
    data : T[];
    pagination?: PaginationParams
}

export interface ListParams {
    page: number;
    limit: number;
    sort?: number;
    order?: 'asc' | 'desc';

    [key:string]:any
}
export interface User {
    id?: any;
    email : string;
    position : string;
    phone:string;
    username:string
}

