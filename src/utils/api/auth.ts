import axios from "axios";
import axiosInstance from "../axiosInstance";
export interface LoginCredentials {
    identifier: string;
    password: string
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        admin: {
            id: string;
            adminname: string;
            email: string;
            role: "admin" | "superadmin";
            depotId: string | null;
        };
    };
}

export interface LogoutResponse {
    sucess: boolean,
    message: string,
}




export const loginAdmin = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/auth/login`, credentials);
    if (response.status !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
}

export const getCurrentUser = async (): Promise<LoginResponse> => {
    const response = await axiosInstance.get('/admin/auth/me');
    if (response.status !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
}

export const logoutAdmin = async(): Promise <LogoutResponse> => {
    try {
        const response = await axiosInstance.post('admin/auth/admin-logout');
    if(response.status !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
    } catch (error: any) {
        throw new Error(error.message || 'Failed to logout');
    }
}