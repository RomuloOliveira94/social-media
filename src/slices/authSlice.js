import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../services/authService";

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
    const response = await authService.registerUser(user);

    //error handling
    if (response.errors.length > 0) {
      return thunkAPI.rejectWithValue(
        typeof response.errors === "string"
          ? response.errors
          : response.errors[0]
      );
    }
    return response;
  }
);

//login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    const response = await authService.loginUser(user);

    //error handling
    if (response.errors.length > 0) {
      return thunkAPI.rejectWithValue(
        typeof response.errors === "string"
          ? response.errors
          : response.errors[0]
      );
    }
    return response;
  }
);

//logout
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  authService.logoutUser();
  return null;
});

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
      authService.logoutUser();
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
      .addCase(logoutUser.pending, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null;
        state.success = true;
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
      });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
