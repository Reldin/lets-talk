import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ICategory, INewCategory } from "../helper/interfaces";

const URL = "http://localhost:3001/posts/";

interface ICategoryState {
  categories: ICategory[];
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

const initialCategoryState = {
  categories: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
} as ICategoryState;

export const categorySlice = createSlice({
  name: "category",
  initialState: initialCategoryState,
  reducers: {
    setCategories(state, action: PayloadAction<ICategory[]>) {
      state.categories = action.payload;
    },
    addCategory(state) {},
    clearStatus(state) {
      state.isSuccess = false;
      state.isError = false;
      state.isFetching = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addAsyncCategory.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(addAsyncCategory.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        if (action.payload) {
          state.errorMessage = action.payload!.toString(); // toString() just in case it returns an array of strings
        } else {
          state.errorMessage = "You are not logged in.";
        }
      })
      .addCase(addAsyncCategory.fulfilled, (state) => {
        state.isFetching = false;
        state.isError = false;
        state.isSuccess = true;
      });
  },
});

export const categoryActions = categorySlice.actions;

export const addAsyncCategory = createAsyncThunk<
  string,
  INewCategory,
  { rejectValue: string }
>("posts/categories/category", async (payload: INewCategory, thunkApi) => {
  try {
    const { name } = payload;
    const authString: string | undefined =
      "Bearer " + JSON.parse(localStorage.getItem("authToken")!).accessToken;

    const response = await axios.post(
      `${URL}categories/category`,
      { name },
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
});
