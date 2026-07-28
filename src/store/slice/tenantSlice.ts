import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

export type IntegrationListType = {
  date: string;
  source: string;
  type: string;
  count: number
}
interface InitialState {
  tenantDropDownList: any;
  tenantList: any;
  loading: boolean;
  eventloading: boolean;
  integrationList: IntegrationListType[]
}

const initialState: InitialState = {
  tenantDropDownList: [],
  tenantList: [],
  loading: false,
  eventloading: false,
  integrationList: [],
};

const tenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {
    tenantList: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
      ...state,
      tenantList: action.payload,
    }),
    setLoader: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
      ...state,
      loading: action.payload,
    }),
    setLoaderEvent: (
      state: Draft<InitialState>,
      action: PayloadAction<any>
    ) => ({
      ...state,
      eventloading: action.payload,
    }),
    tenantDropDownList: (
      state: Draft<InitialState>,
      action: PayloadAction<any>
    ) => ({
      ...state,
      tenantDropDownList: action.payload,
    }),
  },
  extraReducers(builder) {
    
  },
});

export const { tenantList, setLoader, setLoaderEvent, tenantDropDownList } =
  tenantSlice.actions;

export default tenantSlice.reducer;
