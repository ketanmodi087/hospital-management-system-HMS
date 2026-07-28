import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  notificationSuccess,
  notificationFail,
} from "../slice/notificationSlice";
import { roleList, setLoader } from "../slice/rolePermissionSlice";
import { API, graphqlOperation } from "aws-amplify";
import {
  changeRolePermissionMutation,
  udpateRoleMutation,
  deleteRoleMutation,
  addNewRoleMutation,
  recoverRoleMutation,
} from "../../graphql/mutations";
import {
  getAllRollListQuery,
} from "../../graphql/queries";

export const getAllRoles = createAsyncThunk(
  "getAllRoles",
  async (_request: any, { dispatch }) => {
    dispatch(setLoader(true));
    try {
      const postData = (await API.graphql(
        graphqlOperation(getAllRollListQuery, _request)
      )) as { data: any; errors: any[] };
      dispatch(roleList(postData.data));
    } catch {
      dispatch(notificationFail("Something went wrong"));
    }
    dispatch(setLoader(false));
  }
);

export const changeRolePermission = createAsyncThunk(
  "changeRolePermission",
  async (_request: any, { dispatch }) => {
    await API.graphql({
      ...graphqlOperation(changeRolePermissionMutation, {
        rolePermission: _request.request,
      }),
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    if (_request.callback) {
      _request.callback();
    }

    dispatch(notificationSuccess("Permission Updated Successfully"));
  }
);

export const updateUserRole = createAsyncThunk(
  "updateUserRole",
  async (_request: any, { dispatch }) => {
    await API.graphql({
      ...graphqlOperation(udpateRoleMutation, { roleUpdate: _request.request }),
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    if (_request.callback) {
      _request.callback();
    }

    dispatch(notificationSuccess("User Role Updated Successfully"));
  }
);

export const deleteUserRole = createAsyncThunk(
  "deleteUserRole",
  async (_request: any, { dispatch }) => {
    await API.graphql({
      ...graphqlOperation(deleteRoleMutation, { roleDelete: _request.request }),
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    if (_request.callback) {
      _request.callback();
    }

    dispatch(notificationSuccess("User Role deleted Successfully"));
  }
);

export const addNewUserRole = createAsyncThunk(
  "addNewUserRole",
  async (_request: any, { dispatch }) => {
    await API.graphql({
      ...graphqlOperation(addNewRoleMutation, {
        role: _request.request,
      }),
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    if (_request.callback) {
      _request.callback();
    }

    dispatch(notificationSuccess("User Role Added Successfully"));
  }
);

export const recoverUserRole = createAsyncThunk(
  "addNewUserRole",
  async (_request: any, { dispatch }) => {
    await API.graphql({
      ...graphqlOperation(recoverRoleMutation, {
        roleRecover: _request.request,
      }),
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    if (_request.callback) {
      _request.callback();
    }
    dispatch(notificationSuccess("Role recovered Successfully"));
  }
);
