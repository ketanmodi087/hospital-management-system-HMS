import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  adminList: any;
  loadingAdmin: boolean;
  dashboardInterval: any;
  summaryInterval: any;
  detailInterval: any;
  detailPageAPIInterval: any;
  relatedSubstanceInterval: any;
}

const initialState: InitialState = {
  adminList: [],
  loadingAdmin: false,
  dashboardInterval: null,
  summaryInterval: null,
  detailInterval: null,
  detailPageAPIInterval: null,
  relatedSubstanceInterval: null,
};
const adminSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    adminList: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
      ...state,
      adminList: action.payload,
    }),
    setLoaderAdmin: (
      state: Draft<InitialState>,
      action: PayloadAction<any>
    ) => ({
      ...state,
      loadingAdmin: action.payload,
    }),
    setDashboardInterval: (
      state: Draft<InitialState>,
      action: PayloadAction<any>
    ) => ({
      ...state,
      dashboardInterval: action.payload,
    }),
    setSummaryInterval: (
      state: Draft<InitialState>,
      action: PayloadAction<any>
    ) => ({
      ...state,
      summaryInterval: action.payload,
    }),
    setDetailInterval: (
      state: Draft<InitialState>,
      action: PayloadAction<any>
    ) => ({
      ...state,
      detailInterval: action.payload,
    }),
    setDetailPageAPIInterval: (
      state: Draft<InitialState>,
      action: PayloadAction<any>
    ) => ({
      ...state,
      detailPageAPIInterval: action.payload,
    }),
    setRelatedSubstanceInterval: (
      state: Draft<InitialState>,
      action: PayloadAction<any>
    ) => ({
      ...state,
      relatedSubstanceInterval: action.payload,
    }),
  },
});

export const {
  adminList,
  setLoaderAdmin,
  setDashboardInterval,
  setSummaryInterval,
  setDetailInterval,
  setDetailPageAPIInterval,
  setRelatedSubstanceInterval,
} = adminSlice.actions;

export default adminSlice.reducer;
