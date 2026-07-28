import { createAsyncThunk } from "@reduxjs/toolkit";
import { Amplify, API, graphqlOperation, Auth } from "aws-amplify";

import { notificationClear } from "../slice/notificationSlice";
import { setAutherise } from "../slice/commonSlice";

import { userAuthDetails } from "./authThunk";
import { addLogsAws } from "../../graphql/mutations";

// import {getFilterDropdownData} from "../../graphql/queries";
export const cleatNotification = createAsyncThunk(
  "cleatNotification",
  async (_request: any, { dispatch }) => {
    dispatch(notificationClear());
  }
);

export const setTenantId = createAsyncThunk(
  "setTenantId",
  async (_request: any, { dispatch }) => {
    localStorage.setItem("tenantId", JSON.stringify(_request));
    localStorage.removeItem("overview");
    localStorage.removeItem("query");
    localStorage.removeItem("threshold");
    localStorage.removeItem("downloaddashboard");
    localStorage.removeItem("onLoadOverview");
  }
);

export const setLoginwithtype = createAsyncThunk(
  "setLoginwith",
  async (_request: any, { dispatch }) => {
    localStorage.setItem("loginwith", _request);
  }
);



export const checkAuth = createAsyncThunk(
  "checkAuth",
  async (_request: any, { dispatch }) => {
    Auth.currentAuthenticatedUser()
      .then(async (user: any) => {
        dispatch(userAuthDetails({ user: user, email: true }));
        dispatch(setAutherise(true));
      })
      .catch((err: any) => {
        dispatch(setAutherise(false));
      });
  }
);

export const ChangeServiceRequest = createAsyncThunk(
  "changeservice",
  async (_request: any, { dispatch }) => {
    Amplify.configure(_request.request);
  }
);

export const addLogToAws = createAsyncThunk(
  "addLogToAws",
  async (_request: any, { dispatch }) => {
    const list = (await API.graphql({
      ...graphqlOperation(addLogsAws, { addLogs: _request }),
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as { data: any; errors: any[] };
  }
);

// export const getFilterDropdown = createAsyncThunk(
//   "getFilterDropdown",
//   async (_request: any, { dispatch }) => {
//     try {
//       const filterData = (await API.graphql(
//         graphqlOperation(getFilterDropdownData, _request)
//       )) as { data: any; errors: any[] };
//       // Handle `postData` if needed, e.g., dispatch an action with the data
//       console.log("FilterDropdown ::", filterData);
//       return filterData?.data?.getFilterDropdown;
//     } catch (err: any) {
//       console.log("error ::", err);
//     }
//   }
// );

