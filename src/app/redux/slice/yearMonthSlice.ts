'use client';

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const yearMonthSlice = createSlice({
  name: 'yearMonth',
  initialState: new Date(),
  reducers: {
    setSelected: (state, { payload }: PayloadAction<Date>) => {
      // Replace the entire state with a new Date object
      return new Date(payload.getFullYear(), payload.getMonth(), payload.getDate());
    },

    getSelected: (state) => {
      return new Date(state.getFullYear(), state.getMonth(), state.getDate());
    }
  },
})


export const { setSelected } = yearMonthSlice.actions;

// Selector to get the selected date from the Redux state
export const selectSelectedDate = (state: { yearMonth: Date }) => state.yearMonth;


export default yearMonthSlice.reducer;