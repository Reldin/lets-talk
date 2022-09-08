import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "../helper/interfaces";

export const categorySlice = createSlice({
  name: "categories",
  initialState: [] as ICategory[],
  reducers: {
    setCategories(state, action: PayloadAction<ICategory[]>) {
      state = action.payload;
    },
  },
});

export const categoryActions = categorySlice.actions;
