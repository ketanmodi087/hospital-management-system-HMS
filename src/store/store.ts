import { combineReducers, configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slice/modalSlice";
import authReducer from "./slice/authSlice";
import notificationSlice from "./slice/notificationSlice";
import commonSlice from "./slice/commonSlice";
import themeSlice from "./slice/themeSlice";
import tenantSlice from "./slice/tenantSlice";
import profileSlice from "./slice/profileSlice";
import adminSlice from "./slice/adminSlice";
import rolePermissionSlice from "./slice/rolePermissionSlice";
import tenantUserSlice from "./slice/tenantUserSlice";
import tenantReportSlice from "./slice/tenantReportSlice";
import dateSlice from "./slice/dateSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import timeTrackerSlice from "./slice/timeTrackerSlice";
import notificationListSlice from "./slice/userNotificationList"

const rootReducer = combineReducers({
  modalReducer,
  authReducer,
  notificationSlice,
  commonSlice,
  themeSlice,
  tenantSlice,
  profileSlice,
  adminSlice,
  rolePermissionSlice,
  tenantUserSlice,
  tenantReportSlice,
  dateSlice,
  timeTrackerSlice,
  notificationListSlice
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
