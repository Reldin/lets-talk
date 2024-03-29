import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface IAuthState {
  isAuthenticated: boolean;
  username: string;
  userToken: string | null;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

const userToken: string | undefined =
  localStorage.getItem("authToken") ?? undefined;

const URL = "http://localhost:3001/";

const initialAuthState = {
  isAuthenticated: false,
  username: "",
  userToken,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
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
      state.userToken = undefined!;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    clearState(state) {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.userToken = action.payload;
        // state.username = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = "Failed to login.";
        state.isAuthenticated = false;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.username = "";
      })
      .addCase(userLogout.rejected, (state) => {
        state.errorMessage = "Failed to logout";
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.errorMessage = action.payload;
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        if (action.payload) {
          state.errorMessage = action.payload;
        }
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
      const response = await axios.post(URL + "auth/signin", payload);
      if (response.status === 201) {
        localStorage.setItem("authToken", JSON.stringify(response.data));

        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
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

interface ISignup {
  username: string;
  password: string;
  email: string;
}

export const userSignup = createAsyncThunk<
  string,
  ISignup,
  { rejectValue: string }
>("auth/signup", async (payload: ISignup, thunkApi) => {
  try {
    const response = await axios.post(URL + "auth/signup", payload);
    if (response.status === 201) {
      return "Success";
    }
    return thunkApi.rejectWithValue("Something went wrong.");
  } catch (err: any) {
    const errorMsg: string = err.response.data.message
      .toString()
      .replace(",", ", ");
    return thunkApi.rejectWithValue(errorMsg);
  }
});
