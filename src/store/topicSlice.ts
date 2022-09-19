import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { INewTopic, ITopic } from "../helper/interfaces";

const URL = "http://localhost:3001/posts/";

const notLoggedInMessage = "You are not logged in.";

interface ITopicState {
  topics: ITopic[];
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

const initialTopicState = {
  topics: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
} as ITopicState;

export const topicSlice = createSlice({
  name: "topic",
  initialState: initialTopicState,
  reducers: {
    clearState(state) {
      state.isError = false;
      state.isSuccess = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addAsyncTopic.fulfilled, (state) => {
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(addAsyncTopic.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        if (action.payload) {
          state.errorMessage = action.payload!.toString(); // toString() just in case it returns an array of strings
        } else {
          state.errorMessage = notLoggedInMessage;
        }
      })
      .addCase(deleteAsyncTopic.fulfilled, (state) => {
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(deleteAsyncTopic.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        if (action.payload) {
          state.errorMessage = action.payload.toString();
        } else {
          state.errorMessage = notLoggedInMessage;
        }
      });
  },
});

export const topicActions = topicSlice.actions;

export const addAsyncTopic = createAsyncThunk<
  string,
  INewTopic,
  { rejectValue: string }
>("posts/categories/category/topic", async (payload: INewTopic, thunkApi) => {
  try {
    const { categoryId, title } = payload;
    const authString: string =
      "Bearer " + JSON.parse(localStorage.getItem("authToken")!).accessToken;

    const response = await axios.post(
      `${URL}categories/category/topic`,
      { categoryId, title },
      { headers: { Authorization: authString } }
    );

    return response.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data.message);
  }
});

export const deleteAsyncTopic = createAsyncThunk<
  string,
  number,
  { rejectValue: string }
>("posts/categories/category/:id", async (payload: number, thunkApi) => {
  try {
    const authString: string =
      "Bearer " + JSON.parse(localStorage.getItem("authToken")!).accessToken;

    const response = await axios.delete(
      `${URL}categories/category/${payload}`,
      { headers: { Authorization: authString } }
    );

    return response.data;
  } catch (err: any) {
    thunkApi.rejectWithValue(err.response.data.message);
  }
});
