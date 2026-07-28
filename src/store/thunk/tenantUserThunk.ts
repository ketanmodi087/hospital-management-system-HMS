import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  notificationFail,
  notificationSuccess,
} from "../slice/notificationSlice";
import {
  tenantUserList,
  setLoader,
  setCreateTenantUserLoader,
} from "../slice/tenantUserSlice";
import { API, graphqlOperation } from "aws-amplify";
import {
  deleteTenantUserMutation,
  enableDisableUserMutation,
  recoverTenantUserMutation,
  createUserCallProfileMutation,
  updateUserCallProfileMutation,
  deleteUserProfileMutation,
  recoverUserProfileMutation
} from "../../graphql/mutations";
import {
  getTenantUsersQuery,
} from "../../graphql/queries";

export const getTenantUserList = createAsyncThunk(
  "tenantUserList",
  async (_request: any, { dispatch }) => {
    dispatch(setLoader(true));
    try {
      const userList = (await API.graphql({
        ...graphqlOperation(getTenantUsersQuery, {
          tenantId: _request.tenantId,
          is_deleted: _request.isDeleted || false,
          userName: _request?.userName
        }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: any; errors: any[] };
      dispatch(tenantUserList(userList.data));
      dispatch(setLoader(false));
    } catch (err: any) { }
    dispatch(setLoader(false));
  }
);


export const createUserCallProfile = createAsyncThunk(
  "createUserCallProfile",
  async (_request: any, { dispatch }) => {
    try {
      dispatch(setCreateTenantUserLoader(true));
      const data = (await API.graphql({
        ...graphqlOperation(createUserCallProfileMutation, {
          userCallProfile: _request.request,
        }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: any; errors: any[] };

      console.log("createUserCallProfile ::", data, data.data.createUserCallProfile.success);

      if (data.data.createUserCallProfile.success === "false") {
        dispatch(notificationFail(data.data.createUserCallProfile.message));
        dispatch(setCreateTenantUserLoader(false));
      } else {
        dispatch(notificationSuccess(data.data.createUserCallProfile.message));
        dispatch(setCreateTenantUserLoader(false));
        dispatch(getTenantUserList(_request.request));
        if (_request.callback) {
          _request.callback();
        }
      }


    } catch (err: any) {
      dispatch(setCreateTenantUserLoader(false));
    }
  }
);


export const updateUserCallProfile = createAsyncThunk(
  "updateUserCallProfile",
  async (_request: any, { dispatch }) => {
    try {
      dispatch(setCreateTenantUserLoader(true));
      const data = (await API.graphql({
        ...graphqlOperation(updateUserCallProfileMutation, {
          updateUserCallProfile: _request.request,
        }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: any; errors: any[] };
      console.log("updateUserCallProfile ::", data, _request);
      if (data.data.updateUserCallProfile.success === "false") {
        dispatch(notificationFail(data.data.updateUserCallProfile.message));
        dispatch(setCreateTenantUserLoader(false));
      } else {
        dispatch(notificationSuccess(data.data.updateUserCallProfile.message));
        dispatch(setCreateTenantUserLoader(false));
        dispatch(getTenantUserList(_request.request));
      }
      dispatch(setCreateTenantUserLoader(false));

      if (_request.callback) {
        _request.callback();
      }
    } catch (err: any) {
      console.log("updateUserCallProfile err::", err);

      dispatch(setCreateTenantUserLoader(false));
    }
  }
);


export const deleteUserProfile = createAsyncThunk(
  "deleteUserProfile",
  async (_request: any, { dispatch }) => {
    try {
      console.log("deleteUserProfile ::_request", _request);
      const data = (await API.graphql({
        ...graphqlOperation(deleteUserProfileMutation, {
          deleteUserProfileData: [..._request.request],
        }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: any; errors: any[] };
      console.log("deleteUserProfile ::data", data);

      if (data.data.deleteUserProfile.success === "true") {
        if (_request.callback) {
          _request.callback();
        }
        dispatch(notificationSuccess("User Deleted Successfully"));
      } else {
        dispatch(notificationFail("Something went wrong"));
      }
    } catch (err: any) {
      dispatch(notificationFail("Something went wrong"));
    }
  }
);

export const deleteTenantUser = createAsyncThunk(
  "deleteTenantUser",
  async (_request: any, { dispatch }) => {
    try {
      const data = (await API.graphql({
        ...graphqlOperation(deleteTenantUserMutation, {
          userId: _request.request.userId,
        }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: any; errors: any[] };
      if (data.data.deleteTenantUser.success === "true") {
        setTimeout(() => {
          dispatch(getTenantUserList(_request.request));
          if (_request.callback) {
            _request.callback();
          }
        }, 1000);
        dispatch(notificationSuccess("User Deleted Successfully"));
      } else {
        dispatch(notificationFail("Something went wrong"));
      }
    } catch (err: any) {
      dispatch(notificationFail("Something went wrong"));
    }
  }
);

export const recoverUserProfile = createAsyncThunk(
  "recoverUserProfile",
  async (_request: any, { dispatch }) => {
    try {
      console.log("recoverUserProfile ::0", _request);
      const data = (await API.graphql({
        ...graphqlOperation(recoverUserProfileMutation, {
          recoverUserProfileData: [..._request.request]
        }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: any; errors: any[] };

      console.log("recoverUserProfile ::1", data);

      if (data.data.recoverUserProfile.success === "true") {
        dispatch(notificationSuccess("User Recovered Successfully"));
        if (_request.callback) {
          _request.callback();
        }
      } else {
        dispatch(notificationFail("Something went wrong"));
      }
    } catch (err: any) {
      dispatch(notificationFail("Something went wrong"));
    }
  }
);

export const recoverTenantUser = createAsyncThunk(
  "recoverTenantUser",
  async (_request: any, { dispatch }) => {
    try {
      const data = (await API.graphql({
        ...graphqlOperation(recoverTenantUserMutation, {
          userId: _request.request.userId,
        }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: any; errors: any[] };
      if (data.data.recoverTenantUser.success === "true") {
        dispatch(notificationSuccess("User Recovered Successfully"));
        setTimeout(() => {
          dispatch(getTenantUserList(_request.tenantRequest));
          if (_request.callback) {
            _request.callback();
          }
        }, 1000);
      } else {
        dispatch(notificationFail("Something went wrong"));
      }
    } catch (err: any) {
      dispatch(notificationFail("Something went wrong"));
    }
  }
);

export const changeUserStatus = createAsyncThunk(
  "changeUserStatus",
  async (_request: any, { dispatch }) => {
    try {
      const data = (await API.graphql({
        ...graphqlOperation(enableDisableUserMutation, {
          statusRequest: {
            status: _request.status ? "true" : "false",
            userId: _request.userId,
          },
        }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: any; errors: any[] };

      if (data.data.enableDisableUser.success === "true") {
        dispatch(getTenantUserList(_request));
        dispatch(
          notificationSuccess(
            _request.status
              ? "User Enabled successfully"
              : "User Disabled successfully"
          )
        );
      } else {
        dispatch(notificationFail("Something went wrong"));
      }
    } catch (err: any) {
      dispatch(notificationFail("Something went wrong"));
    }
  }
);



