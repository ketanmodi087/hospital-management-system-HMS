import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
interface InitialState {
    tenantReportList: any;    
    tenantUserReportList: any;    
    loading: boolean;    
}

const initialState: InitialState = {
    tenantReportList: [],
    tenantUserReportList: [],
    loading: false,
};
const tenantReportSlice = createSlice({
    name: "tenantReport",
    initialState,
    reducers: {
        setTenantReportList: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
            ...state,
            tenantReportList: action.payload,
        }),
        setTenantReportListWithUser: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
            ...state,
            tenantUserReportList: action.payload,
        }),
        setLoader: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
            ...state,
            loading: action.payload,
        }),
    }
})
export const { setTenantReportList, setTenantReportListWithUser, setLoader } = tenantReportSlice.actions;
export default tenantReportSlice.reducer;


