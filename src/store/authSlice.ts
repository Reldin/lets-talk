import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface IAuthState {
  isAuthenticated: boolean;
  error: {
    isError: boolean;
    message: string;
  };
  username: string;
  userToken: string | null;
}

const userToken: string | null = localStorage.getItem("authToken")
  ? localStorage.getItem("authToken")
  : null;

const initialAuthState = {
  isAuthenticated: false,
  error: {
    isError: false,
    message: "Failed To login.",
  },
  username: "",
  userToken,
} as IAuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.username = "";
      state.userToken = null;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userToken = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.error.isError = true;
        state.error.message = "Failed to login.";
        state.isAuthenticated = false;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.username = "";
      })
      .addCase(userLogout.rejected, (state) => {
        state.error.message = "Failed to logout";
      });
  },
});

export const authActions = authSlice.actions;

interface IAuthCredentials {
  username: string;
  password: string;
}

export const userLogin = createAsyncThunk(
  "auth/signin",
  async (payload: IAuthCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/signin",
        payload
      );
      localStorage.setItem("authToken", JSON.stringify(response.data));
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const userLogout = createAsyncThunk(
  "auth/signout",
  async (_payload, { rejectWithValue }) => {
    try {
      localStorage.removeItem("authToken");
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
