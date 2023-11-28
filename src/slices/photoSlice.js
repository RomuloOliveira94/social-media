import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, apiWithFiles } from "../utils/config";

const initialState = {
  photos: [],
  status: "idle",
  error: null,
  success: false,
  loading: false,
  message: null,
  photo: {},
};

export const publishPhoto = createAsyncThunk(
  "photo/publish",
  async (photo, thunkAPI) => {
    try {
      const response = await apiWithFiles.post("/photos", photo, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors[0]);
    }
  }
);

export const listPhotos = createAsyncThunk("photo/list", async (thunkAPI) => {
  try {
    const response = await api.get("/photos");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errors[0]);
  }
});

export const removePhoto = createAsyncThunk(
  "photo/remove",
  async (id, thunkAPI) => {
    try {
      const response = await api.delete("/photos/" + id, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors[0]);
    }
  }
);

export const listPhotosByUser = createAsyncThunk(
  "photo/listByUser",
  async (id, thunkAPI) => {
    try {
      const response = await api.get("/photos/user/" + id, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors[0]);
    }
  }
);

export const listPhotosById = createAsyncThunk(
  "photo/listById",
  async (id, thunkAPI) => {
    try {
      const response = await api.get("/photos/" + id, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors[0]);
    }
  }
);

export const updatePhoto = createAsyncThunk(
  "photo/update",
  async (id, thunkAPI) => {
    try {
      const response = await apiWithFiles.put("/photos/" + id, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors[0]);
    }
  }
);

export const likePhoto = createAsyncThunk(
  "photo/like",
  async (id, thunkAPI) => {
    try {
      const response = await api.post("/photos/like/" + id, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors[0]);
    }
  }
);

export const dislikePhoto = createAsyncThunk(
  "photo/dislike",
  async (id, thunkAPI) => {
    try {
      const response = await api.post("/photos/dislike/" + id, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors[0]);
    }
  }
);

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPhoto.pending, (state) => {
        state.status = "loading";
      })
      .addCase(publishPhoto.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.photo = action.payload;
        state.photos.unshift(state.photo);
        state.success = true;
        state.message = "Foto publicada com sucesso!";
      })
      .addCase(publishPhoto.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.success = false;
        state.photo = {};
      })
      .addCase(listPhotosByUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(listPhotosByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      })
      .addCase(listPhotosByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.success = false;
      })
      .addCase(removePhoto.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removePhoto.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.success = true;
        state.message = "Foto removida com sucesso!";
        state.photos = state.photos.filter((photo) => {
          return photo._id !== action.payload.id;
        });
      })
      .addCase(removePhoto.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.success = false;
        state.photo = {};
      });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
