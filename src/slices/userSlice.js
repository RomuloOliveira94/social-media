import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../utils/config";

const initialState = {
  user: {},
  error: null,
  success: false,
  loading: false,
  message: null,
};

export const profile = createAsyncThunk("user/profile", async (thunkAPI) => {
  try {
    const response = await api.get("/users/profile");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errors[0]);
  }
});

export const update = createAsyncThunk(
  "user/update",
  async (user, thunkAPI) => {
    try {
      const response = await api.post("/users/update", user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors[0]);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(profile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.user = null;
        state.success = false;
      })
      .addCase(update.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        state.success = true;
        state.message = "Perfil atualizado com sucesso.";
      })
      .addCase(update.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.success = false;
      });
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
