import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API Endpoint
const endpoint = process.env.REACT_APP_API_BASE_URL;

// Async Thunk for Submitting Job Application
export const submitApplication = createAsyncThunk(
  "applications/submitApplication",
  async ({ jobId, name, email, resume }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("jobId", jobId);
      formData.append("applicantName", name);
      formData.append("applicantEmail", email);
      formData.append("resume", resume);

      const response = await fetch(`${endpoint}/api/applications`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to submit application");
      }

      return data; // Successfully submitted application
    } catch (error) {
      return rejectWithValue("Error submitting application");
    }
  }
);

const applicationsSlice = createSlice({
  name: "applications",
  initialState: {
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    clearApplicationStatus: (state) => {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(submitApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Application submitted successfully!";
      })
      .addCase(submitApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearApplicationStatus } = applicationsSlice.actions;
export default applicationsSlice.reducer;
