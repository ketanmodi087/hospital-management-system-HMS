import { createSlice, current, Draft, PayloadAction } from "@reduxjs/toolkit";

interface PageTime {
  [page: string]: number;
}
interface TimeTrackerState {
  totalTime: number;
  pageTimes: PageTime;
  startTime: number | null;
  currentPage: string | null;
}
const initialState: TimeTrackerState = {
  totalTime: 0,
  pageTimes: {},
  startTime: null,
  currentPage: null,
};

const timeTrackerSlice = createSlice({
  name: "timeTracker",
  initialState,
  reducers: {
    startTracking: (state, action: PayloadAction<string>) => {
      state.startTime = Math.ceil(Date.now() / 1000);
      state.currentPage = action.payload;
    },
    stopTracking: (state) => {
      if (state.startTime && state.currentPage) {
        const timeSpent = Math.ceil(Date.now() / 1000 - state.startTime);
        state.totalTime = timeSpent;
        if (state.pageTimes[state.currentPage]) {
          state.pageTimes[state.currentPage] += timeSpent;
        } else {
          state.pageTimes[state.currentPage] = timeSpent;
        }
        state.startTime = null;
        state.currentPage = null;
      }
    },
  },
});

export const { startTracking, stopTracking } = timeTrackerSlice.actions;
export default timeTrackerSlice.reducer;
