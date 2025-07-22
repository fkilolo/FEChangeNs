import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { callFetchSpaceshipList } from "@/config/api/business/spaceship.api";

export const fetchSpaceshipList = createAsyncThunk(
  "spaceship/fetchList",
  async (query: string, { rejectWithValue }) => {
    try {
      const res = await callFetchSpaceshipList(query);
      return res;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || error?.message || "Error");
    }
  }
);

const spaceshipSlice = createSlice({
  name: "spaceship",
  initialState: {
    list: [],
    pagination: {},
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpaceshipList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpaceshipList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload?.result || [];
        state.pagination = action.payload?.pagination || {};
      })
      .addCase(fetchSpaceshipList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default spaceshipSlice.reducer; 