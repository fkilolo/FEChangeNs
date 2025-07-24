import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { callFetchDynadotList } from "@/config/api/business/dynadot.api";

export const fetchDynadotList = createAsyncThunk(
  "dynadot/fetchList",
  async (query: string, { rejectWithValue }) => {
    try {
      const res = await callFetchDynadotList(query);
      return res;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || error?.message || "Error");
    }
  }
);

const dynadotSlice = createSlice({
  name: "dynadot",
  initialState: {
    list: [],
    pagination: {},
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDynadotList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDynadotList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload?.result || [];
        state.pagination = action.payload?.meta || {};
      })
      .addCase(fetchDynadotList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dynadotSlice.reducer; 