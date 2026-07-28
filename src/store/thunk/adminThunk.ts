import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  notificationFail,
  notificationSuccess,
} from "../slice/notificationSlice";
import { adminList, setLoaderAdmin } from "../slice/adminSlice";
import { API, graphqlOperation } from "aws-amplify";
import {
  createNewCreateNewAdminMutation,
  deleteTenantUserMutation,
  enableDisableUserMutation,
  recoverTenantUserMutation,
  resetUserPasswordMutation,
} from "../../graphql/mutations";
import { getAdminQuery } from "../../graphql/queries";
import { modalLoading } from "store/slice/modalSlice";

export const getAdminList = createAsyncThunk(
  "adminList",
  async (_request: any, { dispatch }) => {
    dispatch(setLoaderAdmin(true));
    try {
      const userList = (await API.graphql({
        ...graphqlOperation(getAdminQuery, {
          is_deleted: _request.is_deleted,
          tenantId: _request.tenantId,
          is_scoring: _request.is_scoring,
          roleName: _request.roleName,
        }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: any; errors: any[] };
      dispatch(adminList(userList.data));
      dispatch(setLoaderAdmin(false));
    } catch (err: any) {
      dispatch(setLoaderAdmin(false));
    }
  }
);

export const createAdmin = createAsyncThunk(
  "createAdmin",
  async (_request: any, { dispatch }) => {
    try {
      const data = (await API.graphql({
        ...graphqlOperation(createNewCreateNewAdminMutation, {
          admin: _request.request,
        }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: any; errors: any[] };

      if (data.data.createNewAdmin.success === "false") {
        dispatch(
          notificationFail(
            _request.request.userName
              ? "Opps! Tenant Admin Not Update"
              : "Opps! Tenant Admin Not Create"
          )
        );
      } else {
        dispatch(
          notificationSuccess(
            _request.request.userName
              ? "Admin Updated Successfully"
              : "Admin Create Successfully"
          )
        );
        dispatch(adminList(_request.request));
      }

      if (_request.callback) {
        _request.callback();
      }
    } catch (err: any) {
      dispatch(
        notificationFail(
          _request.request.userName
            ? "Opps! Tenant Admin Not Update"
            : "Opps! Tenant Admin Not Create"
        )
      );
    }
  }
);

export const deleteAdminThunk = createAsyncThunk(
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
        dispatch(notificationSuccess("Admin Deleted Successfully"));
      } else {
        dispatch(notificationFail("Something went wrong"));
      }
      if (_request.callback) {
        _request.callback();
      }
    } catch (err: any) {
      dispatch(notificationFail("Something went wrong"));
    }
  }
);

export const recoverAdminThunk = createAsyncThunk(
  "recoverTenantUser",
  async (_request: any, { dispatch }) => {
    try {
      const data = (await API.graphql({
        ...graphqlOperation(recoverTenantUserMutation, {
          userId: _request.request.username,
        }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: any; errors: any[] };
      if (data.data.recoverTenantUser.success === "true") {
        dispatch(notificationSuccess("Admin Recovered Successfully"));
      } else {
        dispatch(notificationFail("Something went wrong"));
      }
      if (_request.callback) {
        _request.callback();
      }
    } catch (err: any) {
      dispatch(notificationFail("Something went wrong"));
    }
  }
);

export const resetPasswordThunk = createAsyncThunk(
  "resetPasswordThunk",
  async (_request: any, { dispatch }) => {
    try {
      const data = (await API.graphql({
        ...graphqlOperation(resetUserPasswordMutation, {
          adminChangePassword: _request.request,
        }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: any; errors: any[] };
      if (data.data.changeTenantPasswordAdmin.success === "true") {
        dispatch(
          notificationSuccess(data.data.changeTenantPasswordAdmin.message)
        );
        if (_request.callback) {
          _request.callback();
        }
      } else {
        const mess = JSON.parse(data.data.changeTenantPasswordAdmin.message);
        dispatch(modalLoading(false));
        switch (mess.code) {
          case "InvalidPasswordException":
            dispatch(
              notificationFail(
                "Passwords must has at least 14 character that include at least 1 lowercase, 1 uppercase,1 number and 1 special character."
              )
            );
            break;
          case "LimitExceededException":
            dispatch(
              notificationFail(
                "Attempt limit exceeded, Please try after some time"
              )
            );
            break;
          case "UserNotFoundException":
            dispatch(notificationFail("User Email does not exist."));
            break;
          default:
            dispatch(
              notificationFail("User Password Not Valid. Please try again!")
            );
            break;
        }
      }
    } catch (err: any) {
      dispatch(notificationFail("Something went wrong"));
    }
  }
);
