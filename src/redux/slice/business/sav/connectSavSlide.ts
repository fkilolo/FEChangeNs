import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { callFetchConnectSav } from "@/config/api/business/connectSav.api";
import { IConnectSav } from "@/types/model/savModel/connectSav.d";

interface IState {
  isFetching: boolean;
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: IConnectSav[];
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
};

// Thunk: Fetch paginated connect SAV list
export const fetchConnectSav = createAsyncThunk(
  "connectSav/fetchConnectSav",
  async ({ query }: { query: string }, { rejectWithValue }) => {
    try {
      const res = await callFetchConnectSav(query);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || err.message);
    }
  }
);

export const connectSavSlice = createSlice({
  name: "connectSav",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchConnectSav.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchConnectSav.fulfilled, (state, action: any) => {
      state.isFetching = false;
      if (action.payload) {
        state.meta = action.payload.meta;
        state.result = action.payload.result;
      }
    });
    builder.addCase(fetchConnectSav.rejected, (state) => {
      state.isFetching = false;
    });
  },
});

export default connectSavSlice.reducer;
