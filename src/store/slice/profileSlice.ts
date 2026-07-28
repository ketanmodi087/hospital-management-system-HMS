import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  otp_status: boolean;
  otp_loading: boolean;
}

const initialState: InitialState = {
  otp_status: false,
  otp_loading: false,
};

const profileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    otp_status_profile: (
      state: Draft<InitialState>,
      action: PayloadAction<any>
    ) => ({
      ...state,
      otp_status_profile: action.payload,
    }),
    otp_status_mfa: (
      state: Draft<InitialState>,
      action: PayloadAction<any>
    ) => ({
      ...state,
      otp_status_mfa: action.payload,
    }),
  },
});

export const { otp_status_mfa, otp_status_profile } = profileSlice.actions;

export default profileSlice.reducer;
