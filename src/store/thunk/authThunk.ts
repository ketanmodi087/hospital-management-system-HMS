import { createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";

import {
  notificationSuccess,
  notificationFail,
} from "../slice/notificationSlice";
import { setUserData, setLoader } from "../slice/authSlice";

import { ChangeServiceRequest } from "./commonThunk";

import {
  resetPasswordMutation,
  getUserDataMutation,
  getUserDetailsMutation,
} from "../../graphql/mutations";

import { apiSetting } from "../../aws-export";
import { updateUserHistoryData } from "./tenantReport";

export const userAuthDetails = createAsyncThunk(
  "userAuthDetails",
  async (_request: any, { dispatch }) => {
    dispatch(setLoader(true));

    let request = {
      email: "",
      username: _request.user.username,
      tenantId: _request.user.attributes.family_name
        ? _request.user.attributes.family_name
        : "",
    };

    if (_request?.email == true) {
      request.email = _request.user.attributes.email;
    }

    const userData: any = await API.graphql({
      ...graphqlOperation(getUserDetailsMutation, { userDetail: request }),
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    const items = JSON.parse(localStorage.getItem("tenantId") || "{}");
    if (!items?.tenantId) {
      dispatch(setLoader(false));
    }

    dispatch(
      setUserData({
        ..._request.user,
        ...userData.data.getUserDetails,
      })
    );
  }
);

export const resetUserPassword = createAsyncThunk(
  "resetPassword",
  async (_request: any, { dispatch }) => {
    dispatch(setLoader(true));
    try {
      const resetPassword: any = await API.graphql({
        ...graphqlOperation(resetPasswordMutation, { reset: _request.request }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      if (resetPassword.data.resetUserPassword.success === "true") {
        dispatch(notificationSuccess("Password Reset Successfully"));
        if (_request.userData?.group !== "admin") {
          const request = {
            tenant_id: _request.userData.tenantId,
            username: _request.userData.username,
            event_type: "reset_click",
          };
          dispatch(updateUserHistoryData(request));
          if (_request.callback) {
            _request.callback();
          }
        }
      } else {
        dispatch(notificationFail("Please check you entered password."));
      }
      dispatch(setLoader(false));
    } catch (err: any) {
      dispatch(notificationFail("Please check you entered password."));
    }
  }
);

export const getUserData = createAsyncThunk(
  "getUserData",
  async (_request: any, { dispatch }) => {
    dispatch(setLoader(true));
    const loginwithtype = localStorage.getItem("loginwith") || "";

    try {
      dispatch(
        ChangeServiceRequest({
          request: apiSetting,
        })
      );
      const userData: any = await API.graphql({
        ...graphqlOperation(getUserDataMutation, {
          accessToken: { userToken: _request.userToken },
        }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      if (userData.data.getUserData.success === "true") {
      } else {
        dispatch(notificationFail("Your session has expired, please login"));
        setTimeout(() => {
          localStorage.clear();
          window.location.href = "/sessionExpired";
        }, 500);
      }
      const items = JSON.parse(localStorage.getItem("tenantId") || "{}");
      if (
        window.location.pathname !== "/dashboard" &&
        window.location.pathname !== "/dashboard/"
      ) {
        dispatch(setLoader(false));
      } else if (
        _request?.previousRoute?.length > 1 &&
        !_request?.previousRoute?.includes("/redirect-dashboard") &&
        _request?.previousRoute?.[0] === "/dashboard"
      ) {
        dispatch(setLoader(false));
      } else if (
        !items?.tenantCode &&
        _request?.allUserData?.group === "admin"
      ) {
        dispatch(setLoader(false));
      } else if (
        !JSON.parse(
          userData.permission !== null ? userData.permission : "[]"
        ).includes("29")
      ) {
        dispatch(setLoader(false));
      }
    } catch (err: any) {
      dispatch(notificationFail("Something is wrong"));
      dispatch(setLoader(false));
    }
  }
);

export const authThunk = () => {};
