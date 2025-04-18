import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ApiError = {
  api: string | null;
  httpStatusCode: number | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  detail: any | null;
}
const initialState = {
  api: null,
  httpStatusCode: null,
  detail: null,
};

const apiErrorSlice = createSlice({
  name: 'apiError',
  initialState: initialState,
  reducers: {
    setAPIError: (state, { payload }: PayloadAction<ApiError>) => {
      Object.assign(state, { ...payload });
    },

    clearError: state => {
      Object.assign(state, initialState);
    },
  },
})

export const { setAPIError, clearError } = apiErrorSlice.actions;
export default apiErrorSlice.reducer;