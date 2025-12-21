import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAdmin, LoginCredentials } from "@/utils/api/auth";

export interface Admin {
    id: string;
    adminname: string;
    email: string;
    role: "admin" | "superadmin";
    depotId: string | null;  // ← Fixed: string | null, not "string" | null
}

interface AuthState {
    user: Admin | null;
    isAuth: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuth: false,
    isLoading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {  // ← Fixed typo
        try {
            const res = await loginAdmin(credentials);
            if (!res.success) throw new Error(res.message);

            localStorage.setItem("adminToken", res.data.token);  // ← Consistent key
            return res.data.admin;
        } catch (error: any) {
            return rejectWithValue(error.message || "Login failed");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state: AuthState) => {
            state.user = null;
            state.isAuth = false;
            state.error = null;
            localStorage.removeItem("adminToken");  // ← Matches setItem
        },
        clearError: (state: AuthState) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuth = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;