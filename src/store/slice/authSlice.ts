import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  checkUser: any;
  loading: boolean;
  userData: any;
  isInitialLogin: boolean;
  userAlreadyLogged:boolean
  routesHistory: any;
}

const initialState: InitialState = {
  checkUser: null,
  loading: false,
  userData: null,
  isInitialLogin: false,
  userAlreadyLogged:false,
  routesHistory: [],
};

const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUserData: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
      ...state,
      userData: action.payload,
      loading: false,
    }),
    setLoader: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
      ...state,
      loading: action.payload,
    }),
    setInitialLogin: (
      state: Draft<InitialState>,
      action: PayloadAction<any>
    ) => ({
      ...state,
      isInitialLogin: action.payload,
    }),
    setRouteHistory: (
      state: Draft<InitialState>,
      action: PayloadAction<any>
    ) => ({
      ...state,
      routesHistory: action.payload,
    }),
     setUserAlreadyLogged: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
        ...state,
        userAlreadyLogged: action.payload,
      }),
  },
});

export const { setLoader, setUserData, setInitialLogin, setRouteHistory, setUserAlreadyLogged } =
  authSlice.actions;

export default authSlice.reducer;
