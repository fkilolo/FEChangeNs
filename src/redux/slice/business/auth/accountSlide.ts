import { callFetchAccount } from '@/config/api/business/auth.api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// First, create the thunk
export const fetchAccount = createAsyncThunk(
    'account/fetchAccount',
    async () => {
        const response = await callFetchAccount();
        return response.data;
    }
)

interface IState {
    isAuthenticated: boolean;
    isLoading: boolean;
    isRefreshToken: boolean;
    errorRefreshToken: string;
    user: {
        _id: string;
        userName: string;
        role: {
            _id: string;
            name: string;
        },
        teams: [
            {
                _id: string;
                name: string;
            }
        ]
        permissions: {
            _id: string;
            name: string;
            apiPath: string;
            method: string;
            module: string;
        }[]
    };
    activeMenu: string;
}

const initialState: IState = {
    isAuthenticated: false,
    isLoading: true,
    isRefreshToken: false,
    errorRefreshToken: "",
    user: {
        _id: "",
        userName: "",
        role: {
            _id: "",
            name: "",
        },
        teams: [
            {
                _id: "",
                name: "",
            }
        ],
        permissions: [],
    },

    activeMenu: 'home'
};


export const accountSlide = createSlice({
    name: 'account',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setActiveMenu: (state, action) => {
            state.activeMenu = action.payload;
        },
        setUserLoginInfo: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user._id = action?.payload?._id;
            state.user.userName = action.payload.userName;
            state.user.role = action?.payload?.role;
            state.user.permissions = action?.payload?.permissions;
        },
        setLogoutAction: (state, action) => {
            localStorage.removeItem('access_token');
            state.isAuthenticated = false;
            state.user = {
                _id: "",
                userName: "",
                teams: [
                    {
                        _id: "",
                        name: "",
                    }
                ],
                role: {
                    _id: "",
                    name: "",
                },
                permissions: [],
            }
        },
        setRefreshTokenAction: (state, action) => {
            state.isRefreshToken = action.payload?.status ?? false;
            state.errorRefreshToken = action.payload?.message ?? "";
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchAccount.pending, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = false;
                state.isLoading = true;
            }
        })

        builder.addCase(fetchAccount.fulfilled, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = true;
                state.isLoading = false;
                state.user._id = action?.payload?.user?._id;
                state.user.userName = action.payload.user?.userName;
                state.user.role = action?.payload?.user?.role;
                state.user.teams = action?.payload?.user?.teams;
                state.user.permissions = action?.payload?.user?.permissions;
            } else {
                state.isLoading = false;
            }
        })

        builder.addCase(fetchAccount.rejected, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = false;
                state.isLoading = false;
            }
        })

    },

});

export const {
    setActiveMenu, setUserLoginInfo, setLogoutAction, setRefreshTokenAction
} = accountSlide.actions;

export default accountSlide.reducer;
