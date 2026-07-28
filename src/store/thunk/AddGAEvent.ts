import { createAsyncThunk } from "@reduxjs/toolkit";
import ReactGA from "react-ga4";

export const sendGAEvent = createAsyncThunk(
  "add/ga-event",
  async (payload: any, { dispatch }) => {
    const { category, action, label, value } = payload;
    try {
      // ReactGA.send({ hitType: action, page: "/landingpage", title: category });
      ReactGA.event({
        category,
        action,
        label,
        value,
      });
    } catch (error) {
      console.log("errorerror", error);
    }
    try {
      ReactGA.set({ userId: label, userType: "premium" });
    } catch (error) {
      console.log("ReactGA set Error", error);
    }
  }
);
