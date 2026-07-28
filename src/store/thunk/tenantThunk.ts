import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  notificationFail,
  notificationSuccess,
} from "../slice/notificationSlice";
import {
  tenantList,
  setLoader,
  tenantDropDownList,
  setLoaderEvent,
} from "../slice/tenantSlice";
import { API, graphqlOperation } from "aws-amplify";
import {
  createTenantMutation,
  changeTenantStatusMutation,
  deleteTenantMutation,
  recoverTenantMutation,
  updateUserConfigMutation,
  enableMFAMutation,
} from "../../graphql/mutations";
import {
  getTenantsQuery,
  getTenantsDropDownQuery,
} from "../../graphql/queries";
import { ChangeServiceRequest, addLogToAws } from "./commonThunk";
import { otp_status_mfa } from "../slice/profileSlice";
import { setUserData } from "../slice/authSlice";

import { apiSetting } from "../../aws-export";
import { modalLoading } from "store/slice/modalSlice";

export const getTenantList = createAsyncThunk(
  "tenantList",
  async (_request: any, { dispatch }) => {
    try {
      dispatch(setLoader(true));
      const postData = (await API.graphql(
        graphqlOperation(getTenantsQuery, _request)
      )) as { data: any; errors: any[] };
      dispatch(tenantList(postData.data));
      let logData = {
        userData: "",
        apiName: "getTenantList",
        request: JSON.stringify(_request),
        response: JSON.stringify(postData.data),
        type: "frontend",
      };
      dispatch(addLogToAws(logData));
    } catch (error) {
      dispatch(notificationFail("Something went wrong"));
      let logData = {
        userData: "",
        apiName: "getTenantList",
        request: JSON.stringify(_request),
        response: JSON.stringify(error),
        type: "frontend",
      };
      dispatch(addLogToAws(logData));
    }
    dispatch(setLoader(false));
  }
);

export const getTenantDropDownList = createAsyncThunk(
  "tenantDropDownList",
  async (_request: any, { dispatch }) => {
    try {
      dispatch(setLoaderEvent(true));
      const postData = (await API.graphql(
        graphqlOperation(getTenantsDropDownQuery, { all: "true" })
      )) as { data: any; errors: any[] };
      dispatch(tenantDropDownList(postData.data));      
    } catch {
      dispatch(notificationFail("Something went wrong"));
    }
    dispatch(setLoaderEvent(false));
  }
);

export const createNewTenant = createAsyncThunk(
  "createNewTenant",
  async (_request: any, { dispatch }) => {
    dispatch(setLoader(true));

    try {
      const data = (await API.graphql({
        ...graphqlOperation(createTenantMutation, { tenant: _request.request }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: any; errors: any[] };

      if (data.data.createTenant.success === "false") {
        dispatch(notificationFail(data.data.createTenant.message));
      } else {
        dispatch(notificationSuccess(data.data.createTenant.message));
      }
      if (_request.callback) {
        _request.callback(data.data.createTenant.success);
      }
    } catch {
      dispatch(notificationFail("Found Error While creating Tenant"));
    }
    dispatch(modalLoading(false));
    dispatch(setLoader(false));
  }
);

export const changeTenantStatus = createAsyncThunk(
  "changeTenantStatus",
  async (_request: any, { dispatch }) => {
    try {
      const data = (await API.graphql({
        ...graphqlOperation(changeTenantStatusMutation, {
          changeStatus: _request.request,
        }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: any; errors: any[] };

      if (data.data.changeTenantStatus.success === "true") {
        dispatch(
          notificationSuccess(
            _request.request.status
              ? "Tenant Actived successfully"
              : "Tenant Freeze successfully"
          )
        );
      } else {
        dispatch(notificationFail("Something went wrong"));
      }

      if (_request.callback) {
        _request.callback();
      }
    } catch {
      dispatch(notificationFail("Something went wrong"));
    }
  }
);

export const deleteSingleTenant = createAsyncThunk(
  "changeTenantStatus",
  async (_request: any, { dispatch }) => {
    try {
      await API.graphql({
        ...graphqlOperation(deleteTenantMutation, {
          deleteTenant: _request.request,
        }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      dispatch(notificationSuccess("Tenant Deleted Successfully"));
      const items = JSON.parse(localStorage.getItem("tenantId") || "{}");
      if (items.tenantId === _request.request.tenantId) {
        localStorage.removeItem("tenantId");
      }
      if (_request.callback) {
        _request.callback();
      }
    } catch {
      dispatch(notificationFail("Something went wrong"));
    }
  }
);

export const recoverDeletedTenant = createAsyncThunk(
  "recoverDeletedTenant",
  async (_request: any, { dispatch }) => {
    try {
      await API.graphql({
        ...graphqlOperation(recoverTenantMutation, {
          recoverId: _request.request,
        }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      dispatch(notificationSuccess("Tenant Recovered Successfully"));
      const items = JSON.parse(localStorage.getItem("tenantId") || "{}");
      if (items.tenantId === _request.request.tenantId) {
        localStorage.removeItem("tenantId");
      }
      if (_request.callback) {
        _request.callback();
      }
    } catch {
      dispatch(notificationFail("Something went wrong"));
    }
  }
);

export const updateUserDetailsThunk = createAsyncThunk(
  "updateUser",
  async (_request: any, { dispatch }) => {
    try {
      await API.graphql({
        ...graphqlOperation(updateUserConfigMutation, {
          userConfig: _request.request,
        }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      dispatch(notificationSuccess("User Details Updated Successfully"));
      if (_request.callback) {
        _request.callback();
      }
    } catch {
      dispatch(notificationFail("Something went wrong"));
    }
  }
);

export const enableMFAThunk = createAsyncThunk(
  "enableMFAThunk",
  async (_request: any, { dispatch }) => {
    try {
      const data = (await API.graphql({
        ...graphqlOperation(enableMFAMutation, { userEnableMFA: _request }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: any; errors: any[] };
      if (data.data.userEnableMFA.success == "true") {
        dispatch(otp_status_mfa(false));
        dispatch(
          notificationSuccess(
            _request.enableMFA
              ? `MFA enabled successfully`
              : `MFA disabled successfully`
          )
        );
      } else {
        dispatch(
          notificationFail("MFA not enable, Please update phone number")
        );
      }
    } catch (err) {
      dispatch(notificationFail("Something went wrong"));
    }
  }
);
