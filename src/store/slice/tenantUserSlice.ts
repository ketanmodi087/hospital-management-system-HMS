import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  tenantUserList: any;
  tenantUserListForEmail: any;
  loading: boolean;
  usercreateloading: boolean;
}

const initialState: InitialState = {
  tenantUserList: [],
  tenantUserListForEmail: [],
  loading: false,
  usercreateloading: false,
};

const tenantUserSlice = createSlice({
  name: "tenantUsers",
  initialState,
  reducers: {
    tenantUserList: (
      state: Draft<InitialState>,
      action: PayloadAction<any>
    ) => ({
      ...state,
      tenantUserList: action.payload,
    }),
    tenantUserListForEmail: (
      state: Draft<InitialState>,
      action: PayloadAction<any>
    ) => ({
      ...state,
      tenantUserListForEmail: action.payload,
    }),
    setLoader: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
      ...state,
      loading: action.payload,
    }),
    setCreateTenantUserLoader: (
      state: Draft<InitialState>,
      action: PayloadAction<any>
    ) => ({
      ...state,
      usercreateloading: action.payload,
    }),
  },
});

export const {
  tenantUserList,
  tenantUserListForEmail,
  setLoader,
  setCreateTenantUserLoader,
} = tenantUserSlice.actions;

export default tenantUserSlice.reducer;
