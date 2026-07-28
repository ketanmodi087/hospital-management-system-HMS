import { createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";

import {
  setTenantReportList,
  setLoader,
  setTenantReportListWithUser,
} from "../slice/tenantReportSlice";

import {
  getTenantReportNodeQuery,
  getTenantReportQuery,
} from "../../graphql/queries";
import { saveTenantAnalysisData } from "graphql/mutations";

export const getTenantReportThunk = createAsyncThunk(
  "getTenantReport",
  async (_request: any, { dispatch }) => {
    dispatch(setLoader(true));
    dispatch(setTenantReportList([]));
    try {
      const postData = (await API.graphql(
        graphqlOperation(getTenantReportQuery, _request)
      )) as { data: any; errors: any[] };
      if (postData.data.getTenantReport) {
        dispatch(setTenantReportList(postData.data.getTenantReport));
      }
      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
    }
  }
);

//Save User clicks History and logins timess
export const updateUserHistoryData = createAsyncThunk(
  "updateUserHistory",
  async (_request: any, { dispatch }) => {
    try {
      const userHistoryData = (await API.graphql(
        graphqlOperation(saveTenantAnalysisData, { reportData: _request })
      )) as { data: any; errors: any[] };
    } catch (error) {
      console.log("error", error);
    }
  }
);
// Get Tenants Report with user history
export const getTenantReportNodeThunk = createAsyncThunk(
  "updateUserHistory",
  async (_request: any, { dispatch }) => {
    try {
      const getHistorydata = (await API.graphql(
        graphqlOperation(getTenantReportNodeQuery, _request)
      )) as { data: any; errors: any[] };
      if (getHistorydata.data.getTenantReportDataList) {
        dispatch(
          setTenantReportListWithUser(
            getHistorydata.data.getTenantReportDataList
          )
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  }
);
