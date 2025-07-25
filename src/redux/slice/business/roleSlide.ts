import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callFetchAllRole, callFetchRole, callFetchRoleById } from '@/config/api/business/role.api';
import { IRole } from '@/types/model/roleModel/role.d';
import { IRoleSelect } from '@/types/model/roleModel/roleSelect.d';

interface IState {
    isFetching: boolean;
    meta: {
        current: number;
        pageSize: number;
        pages: number;
        total: number;
    },
    result: IRole[];
    isFetchSingle: boolean;
    singleRole: IRole;
    optionRoles: IRoleSelect[];
}
// First, create the thunk
export const fetchRole = createAsyncThunk(
    'resume/fetchRole',
    async ({ query }: { query: string }) => {
        const response = await callFetchRole(query);
        return response;
    }
)

export const fetchRoleById = createAsyncThunk(
    'resume/fetchRoleById',
    async (id: string) => {
        const response = await callFetchRoleById(id);
        return response;
    }
)

// Get all role
export const fetchAllRole = createAsyncThunk(
    'team/fetchAllRole',
    async () => {
        const response = await callFetchAllRole();
        return response;
    }
)


const initialState: IState = {
    isFetching: true,
    isFetchSingle: true,
    meta: {
        current: 1,
        pageSize: 10,
        pages: 0,
        total: 0
    },
    result: [],
    singleRole: {
        _id: "",
        name: "",
        description: "",
        isActive: false,
        permissions: []
    },
    optionRoles: []
};


export const roleSlide = createSlice({
    name: 'role',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        resetSingleRole: (state, action) => {
            state.singleRole = {
                _id: "",
                name: "",
                description: "",
                isActive: false,
                permissions: []
            }
        },

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchRole.pending, (state, action) => {
            state.isFetching = true;
            // Add user to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchRole.rejected, (state, action) => {
            state.isFetching = false;
            // Add user to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchRole.fulfilled, (state, action) => {
            if (action.payload && action.payload.data) {
                state.isFetching = false;
                state.meta = action.payload.data.meta;
                state.result = action.payload.data.result;
            }
            // Add user to the state array

            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchRoleById.pending, (state, action) => {
            state.isFetchSingle = true;
            state.singleRole = {
                _id: "",
                name: "",
                description: "",
                isActive: false,
                permissions: []
            }
            // Add user to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchRoleById.rejected, (state, action) => {
            state.isFetchSingle = false;
            state.singleRole = {
                _id: "",
                name: "",
                description: "",
                isActive: false,
                permissions: []
            }
            // Add user to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchRoleById.fulfilled, (state, action) => {
            if (action.payload && action.payload.data) {
                state.isFetchSingle = false;
                state.singleRole = action.payload.data;
            }
        })

        builder.addCase(fetchAllRole.pending, (state, action) => {
            state.isFetchSingle = true;
        })

        builder.addCase(fetchAllRole.rejected, (state, action) => {
            state.isFetchSingle = false;
        })

        builder.addCase(fetchAllRole.fulfilled, (state, action) => {
            if (action.payload && action.payload.data) {
                state.isFetching = false;
                state.optionRoles = action.payload.data.map((item) => {
                    return {
                        value: item.name,
                        label: item.name
                    }
                })
            }
        })
    },

});

export const {
    resetSingleRole
} = roleSlide.actions;

export default roleSlide.reducer;
