import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API Endpoint
const endpoint = process.env.REACT_APP_API_BASE_URL;

// Async Thunk to fetch jobs from API
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const response = await fetch(`${endpoint}/api/jobs`);
  const data = await response.json();
  return data.jobs; // Return only jobs array
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default jobsSlice.reducer;
