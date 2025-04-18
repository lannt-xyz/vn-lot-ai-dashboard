'use client';

import React from 'react';
import DatePicker from './DatePicker';
import { useDispatch } from 'react-redux';
import { setSelected } from '@/app/redux/slice/yearMonthSlice';

const DatePickerWrapper: React.FC = () => {
  const dispatch = useDispatch();

  const handleDateChange = (value: Date | null) => {
    dispatch(setSelected(value || new Date()));
  };

  return (
    <div className="flex flex-row justify-start">
      <DatePicker
        selected={new Date()}
        showMonthYearPicker={true}
        onChanged={handleDateChange}
        width="w-32"
      />
    </div>
  );
};

export default DatePickerWrapper;
