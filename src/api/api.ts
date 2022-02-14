import {  ListParams, ListResponse, User} from '../model';
import axiosClient from "./axios"


const userApi = {
    getAll(params:ListParams) : Promise<ListResponse<User>>{
        const url = '/user'
        return axiosClient.get(url,{
            params
        })
    },
    getById(id: string) : Promise<User>{
        const url = `/users/${id}`
        return axiosClient.get(url)
    },

    add(data: User) : Promise<User>{
        const url = '/user'
        return axiosClient.post(url, data)
    },

   
}

export default userApi