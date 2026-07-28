import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  autherise: boolean;
  ssoenabled: boolean;
  userHierarchy:any;
}

const initialState: InitialState = {
  autherise: false,
  ssoenabled: true,
  userHierarchy:[]
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setAutherise: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
      ...state,
      autherise: action.payload,
    }),
    setSSOisEnable: (
      state: Draft<InitialState>,
      action: PayloadAction<any>
    ) => ({
      ...state,
      ssoenabled: action.payload,
    }),
    setuserHierarchy:(
      state: Draft<InitialState>,
      action: PayloadAction<any>
    ) => ({
      ...state,
      userHierarchy: action.payload,
    })
  },
});

export const { setAutherise, setSSOisEnable , setuserHierarchy } = commonSlice.actions;

export default commonSlice.reducer;
