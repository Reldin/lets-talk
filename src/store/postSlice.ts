import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:3001/posts/";

interface PostInterface {
  id: number;
  message: string;
  appUserId: number;
  topicId: number;
  appUser: {
    id: number;
    username: string;
  };
}
interface IPostState {
  posts: PostInterface[];
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}
const initialPostState = {
  posts: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
} as IPostState;

export const postSlice = createSlice({
  name: "post",
  initialState: initialPostState,
  reducers: {
    getPosts(state, action: PayloadAction<PostInterface[]>) {
      state.posts = action.payload;
    },
    addPost(state) {},
    clearState(state) {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addAsyncPost.pending, (state, action) => {
        state.isFetching = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(addAsyncPost.rejected, (state, action) => {
        state.isFetching = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(addAsyncPost.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.isError = false;
        if (action.payload) {
          state.errorMessage = action.payload!.toString(); // toString() just in case it returns an array of strings
        } else {
          state.errorMessage = "You are not logged in.";
        }
      });
  },
});

export const postActions = postSlice.actions;

export interface IPost {
  topicId: number;
  message: string;
}

export const addAsyncPost = createAsyncThunk(
  "posts/post",
  async (payload: IPost, thunkApi) => {
    try {
      const { topicId, message } = payload;
      const authString: string =
        "Bearer " + JSON.parse(localStorage.getItem("authToken")!).accessToken;

      const response = await axios.post(
        `${URL}post`,
        { topicId, message },
        {
          headers: {
            Authorization: authString,
          },
        }
      );

      return response.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data.message);
    }
  }
);
