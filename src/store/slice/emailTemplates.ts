import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    emailTemplateList: any;
    sendEmailHistoryList: any;
    loadingEmailTemplate: boolean;
    sendEmailHistoryLoader: boolean;
}

const initialState: InitialState = {
    emailTemplateList: [],
    sendEmailHistoryList: [],
    loadingEmailTemplate: false,
    sendEmailHistoryLoader: false,
};

const emailTemplateSlice = createSlice({
    name: "EmailTemplates",
    initialState,
    reducers: {
        emailTemplateList: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
            ...state,
            emailTemplateList: action.payload,
        }),
        getSendEmailHistoryList: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
            ...state,
            sendEmailHistoryList: action.payload,
        }),
        getSendEmailHistoryLoader: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
            ...state,
            sendEmailHistoryLoader: action.payload,
        }),
        setGetEmailTemplatesloading: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
            ...state,
            emailTemplatesloading: action.payload,
        }),
        setCreateEmailTemplatesloading: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
            ...state,
            createEmailTemplatesloading: action.payload,
        }),
    }
})

export const { emailTemplateList, setGetEmailTemplatesloading, setCreateEmailTemplatesloading, getSendEmailHistoryList, getSendEmailHistoryLoader } = emailTemplateSlice.actions;
export default emailTemplateSlice.reducer;

  