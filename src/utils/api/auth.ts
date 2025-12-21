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


export const loginAdmin = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axiosInstance.post('/admin/auth/login', credentials);
    return response.data;
}