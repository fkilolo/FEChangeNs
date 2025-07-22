import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import accountReducer from "./slice/business/auth/accountSlide";
import permissionReducer from "./slice/business/auth/permissionSlide";
import userReducer from "./slice/business/auth/userSlide";

import roleReducer from "./slice/business/roleSlide";


export const store = configureStore({
  reducer: {
    account: accountReducer,
    user: userReducer,
    permission: permissionReducer,
    role: roleReducer,
   
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
