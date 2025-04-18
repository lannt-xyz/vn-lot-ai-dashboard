import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  // Number of loading requests
  queue: 0,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialState,
  reducers: {
    showLoading: state => {
      state.queue += 1;
      state.show = true;
    },

    hideLoading: state => {
      if (state.queue > 0) {
        state.queue -= 1;
      }
      state.show = state.queue > 0;
    },
  },
})

export const { showLoading, hideLoading } = loadingSlice.actions;
export default loadingSlice.reducer;