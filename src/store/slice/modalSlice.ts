import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isVisible: boolean;
  isLoading: boolean;
  content: React.ReactNode | null;
}

const initialState: ModalState = {
  isVisible: false,
  content: null,
  isLoading: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<React.ReactNode>) => {
      state.isVisible = true;
      state.content = action.payload;
      state.isLoading = false;
    },
    hideModal: (state) => {
      state.isVisible = false;
      state.content = null;
      state.isLoading = false;
    },
    modalLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { showModal, hideModal, modalLoading } = modalSlice.actions;

export default modalSlice.reducer;
