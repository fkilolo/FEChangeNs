import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callFetchAllUser, callFetchUser } from '@/config/api/business/user.api';
import { IUser } from '@/types/model/userModel/user.d';
import { IUserSelect } from '@/types/model/userModel/userSelect.d';

interface IState {
  isFetching: boolean;
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: IUser[];
  optionUsers: IUserSelect[];
}

const initialState: IState = {
  isFetching: false,
  meta: {
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0,
  },
  result: [],
  optionUsers: [],
};

// Thunk: Fetch paginated user list
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async ({ query }: { query: string }, { rejectWithValue }) => {
    try {
      const response = await callFetchUser(query);
      return response;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || err.message);
    }
  }
);

// Thunk: Fetch all users (for dropdown select, etc.)
export const fetchAllUser = createAsyncThunk(
  'user/fetchAllUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await callFetchAllUser();
      return response;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || err.message);
    }
  }
);

export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ===== FETCH USER PAGINATED =====
    builder.addCase(fetchUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isFetching = false;
      if (action.payload && action.payload.data) {
        state.meta = action.payload.data.meta;
        state.result = action.payload.data.result;
      }
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.isFetching = false;
    });

    // ===== FETCH ALL USER (for dropdowns) =====
    builder.addCase(fetchAllUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchAllUser.fulfilled, (state, action) => {
      state.isFetching = false;
      if (action.payload && action.payload.data) {
        state.optionUsers = action.payload.data.map((item: IUser) => ({
          label: item.userName,
          value: item._id,
        }));
      }
    });
    builder.addCase(fetchAllUser.rejected, (state) => {
      state.isFetching = false;
    });
  },
});

export default userSlide.reducer;
