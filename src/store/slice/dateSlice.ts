import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment-timezone";

interface DateState {
    fromDate: string;
    toDate: string;
}

const today = moment().startOf('day'); 
const oneMonthAgo = today.clone().subtract(1, 'months'); 

const initialState: DateState = {
    fromDate: oneMonthAgo.format("YYYY-MM-DD"), 
    toDate: today.format("YYYY-MM-DD"), 
};

const dateSlice = createSlice({
  name: "dates",
  initialState,
  reducers: {
    updateFromDate: (state, action: PayloadAction<string>) => {
        const newFromDate = moment(action.payload).startOf('day');
        state.fromDate = newFromDate.format("YYYY-MM-DD"); 
      },
      updateToDate: (state, action: PayloadAction<string>) => {
        const newToDate = moment(action.payload).startOf('day');
        state.toDate = newToDate.format("YYYY-MM-DD");
      },
  },
});

export const { updateFromDate, updateToDate } = dateSlice.actions;
export default dateSlice.reducer;
