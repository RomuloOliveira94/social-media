import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../utils/config";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  status: "idle",
  error: null,
  success: false,
  loading: false,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const response = await api.post("/users/register", user);
      if (response.data._id) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      const e =
        typeof error.response.data.errors === "string"
          ? error.response.data.errors
          : error.response.data.errors[0];
      return thunkAPI.rejectWithValue(e);
    }
  }
);

//login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      const response = await api.post("/users/login", user);
      console.log(response.data)
      if (response.data._id) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      const e =
        typeof error.response.data.errors === "string"
          ? error.response.data.errors
          : error.response.data.errors[0];
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = "idle";
      state.error = null;
      state.success = false;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.user = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.user = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
        state.success = true;
      })
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
