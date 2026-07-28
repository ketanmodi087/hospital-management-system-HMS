import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  roleList: any,
  loading: boolean;
}

const initialState: InitialState = {
  roleList: [],
  loading: false,
};

const rolePermissionSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {
    roleList: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
      ...state,
      roleList: action.payload,
    }),
    setLoader: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
      ...state,
      loading: action.payload,
    }),
  },
});

export const { roleList, setLoader } = rolePermissionSlice.actions;

export default rolePermissionSlice.reducer;
