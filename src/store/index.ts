import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { categorySlice } from "./categorySlice";
import { postSlice } from "./postSlice";
import { topicSlice } from "./topicSlice";

const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
    auth: authSlice.reducer,
    post: postSlice.reducer,
    topic: topicSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// export const categoryActions = categorySlice.actions;
// export const authActions = authSlice.actions;
export default store;
