import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  notificationFail,
  notificationSuccess,
} from "../slice/notificationSlice";
import { API, graphqlOperation } from "aws-amplify";
import {
  sendOTPCodeMutation,
  updateUserProfileMutation,
  verifyOTPCodeMutation,
} from "../../graphql/mutations";
import { otp_status_profile, otp_status_mfa } from "../slice/profileSlice";

export const updateUserProfileThunk = createAsyncThunk(
  "updateProfile",
  async (_request: any, { dispatch }) => {
    try {
      const data = await API.graphql({
        ...graphqlOperation(updateUserProfileMutation, {
          userProfile: _request,
        }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      dispatch(otp_status_profile(false));
      dispatch(notificationSuccess("User Profile Updated Successfully"));
    } catch {
      dispatch(notificationFail("Something went wrong"));
    }
  }
);

export const sendOTPCodeThunk = createAsyncThunk(
  "sendOTPCode",
  async (_request: any, { dispatch }) => {
    try {
      const data = (await API.graphql({
        ...graphqlOperation(sendOTPCodeMutation, { sendCode: _request }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: any; errors: any[] };
      if (data.data.sendOTPCode.success === "true") {
        dispatch(notificationSuccess("Otp sent in your entered mobile number"));
      } else {
        dispatch(notificationFail("OTP sending issues"));
      }
    } catch {
      dispatch(notificationFail("Something went wrong"));
    }
  }
);

export const verifyOTPCodeThunk = createAsyncThunk(
  "verifyOTPCode",
  async (_request: any, { dispatch }) => {
    try {
      const data = (await API.graphql({
        ...graphqlOperation(verifyOTPCodeMutation, { verifyOtp: _request }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: any; errors: any[] };
      if (data.data.verifyOTPCode.success === "true") {
        dispatch(otp_status_profile(true));
        dispatch(notificationSuccess("OTP is verified success"));
      } else {
        dispatch(otp_status_profile(false));
        dispatch(notificationFail("OTP is Invalid"));
      }
    } catch {
      dispatch(notificationFail("Something went wrong"));
    }
  }
);

export const verifyOTPCodeMFAThunk = createAsyncThunk(
  "verifyOTPCode",
  async (_request: any, { dispatch }) => {
    try {
      const data = (await API.graphql({
        ...graphqlOperation(verifyOTPCodeMutation, { verifyOtp: _request }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: any; errors: any[] };
      if (data.data.verifyOTPCode.success === "true") {
        dispatch(otp_status_mfa(true));
        dispatch(notificationSuccess("OTP is verified success"));
      } else {
        dispatch(otp_status_mfa(false));
        dispatch(notificationFail("OTP is Invalid"));
      }
    } catch {
      dispatch(notificationFail("Something went wrong"));
    }
  }
);

