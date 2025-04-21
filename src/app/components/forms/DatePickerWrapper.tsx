'use client';

import React, { useEffect, useState } from 'react';
import DatePicker from './DatePicker';
import { useDispatch } from 'react-redux';
import { setSelected } from '@/app/redux/slice/yearMonthSlice';

const DatePickerWrapper: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedDate) {
      dispatch(setSelected(selectedDate ?? new Date()));
    }
  }, [dispatch, selectedDate]);

  return (
    <div className="flex flex-row justify-start">
      <DatePicker
        selected={selectedDate}
        showMonthYearPicker={true}
        onChanged={setSelectedDate}
        width="w-32"
      />
    </div>
  );
};

export default DatePickerWrapper;
