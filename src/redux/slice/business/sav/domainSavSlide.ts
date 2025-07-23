import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { callFetchDomainSav } from "@/config/api/business/domainSav.api";
import { IDomainSav } from "@/types/model/savModel/domainSav.d";

interface IState {
  isFetching: boolean;
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: IDomainSav[];
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

// Thunk: Fetch paginated domain SAV list
export const fetchDomainSav = createAsyncThunk(
  "domainSav/fetchDomainSav",
  async ({ query }: { query: string }, { rejectWithValue }) => {
    try {
      const res = await callFetchDomainSav(query);
      return res?.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || err.message);
    }
  }
);

export const domainSavSlice = createSlice({
  name: "domainSav",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDomainSav.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchDomainSav.fulfilled, (state, action: any) => {
      state.isFetching = false;
      if (action.payload) {
        state.meta = action.payload.meta;
        state.result = action.payload.result;
      }
    });
    builder.addCase(fetchDomainSav.rejected, (state) => {
      state.isFetching = false;
    });
  },
});

export default domainSavSlice.reducer;
