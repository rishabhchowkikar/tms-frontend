import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser, loginAdmin, LoginCredentials, logoutAdmin } from "@/utils/api/auth";

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
    isInitialized: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuth: false,
    isLoading: false,
    error: null,
    isInitialized: false,
};

// login thunk
export const login = createAsyncThunk(
    'auth/login', //  this is not endpoint it is dispatch action type signal distpatch when to call this action function to redux
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

// check auth thunk
export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getCurrentUser()
            if (!res.success) throw new Error(res.message);

            return res.data.admin;
        } catch (error: any) {
            // If error, user is not authenticated (cookie invalid/expired)
            return rejectWithValue(null); // Return null instead of error message
        }
    }
)

// logout thunk
export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        await logoutAdmin();
        return true;
    } catch (error: any) {
        // If backend logout fails (e.g., not superadmin), 
        // we still want to clear client-side state
        // So we don't reject, just return success
        // The error will be logged but logout will proceed
        console.warn('Backend logout failed, clearing client-side state:', error.message);
        return true;
    }
})

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
            // case for login
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
            })

            // checking auth case
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuth = true,
                    state.isInitialized = true;
                state.error = null;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuth = false;
                state.isInitialized = true;
                state.error = null;
            })

            // logout case
            .addCase(logoutUser.pending, (state)=>{
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state)=>{
                state.isLoading = false;
                state.user = null;
                state.isAuth = false;
                localStorage.removeItem("adminToken");
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action)=>{
                 // Even if backend logout fails, clear client state
                 state.isLoading = false;
                 state.user = null;
                 state.isAuth = false;
                 state.error = null;
                 localStorage.removeItem("adminToken");
            })
    },
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;