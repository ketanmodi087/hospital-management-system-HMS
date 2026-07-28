import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  notificationSuccess,
  notificationFail,
} from "../slice/notificationSlice";

export const putNotification = createAsyncThunk(
  "putNotification",
  (_request: any, { dispatch }) => {
    if (_request.status) {
      dispatch(notificationSuccess(_request.msg));
    } else {
      dispatch(notificationFail(_request.msg));
    }
  }
);
