'use client';

import 'react-datepicker/dist/react-datepicker.css';

import { format } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import ReactDatePicker, { registerLocale } from 'react-datepicker';

import { DATE_FORMATS, DEFAULT_VALUES } from '@/app/utils/constant';
import React, { useEffect, useRef, useState } from 'react';
import IconButton from './IconButton';

registerLocale(DEFAULT_VALUES.LOCALE, enUS);

interface DatePickerProps {
    selected?: Date | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerValidation?: () => any;
    width?: string;
    minDate?: Date;
    maxDate?: Date;
    showMonthYearPicker?: boolean;
    onChanged?: (date: Date | null) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
    selected = null,
    registerValidation,
    width = 'w-52',
    minDate,
    maxDate,
    showMonthYearPicker = false,
    onChanged = () => { },
}) => {
    const datePickerRef = useRef<ReactDatePicker>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { ref, onChange, ...registerField } = registerValidation?.() || { ref: () => {}, onChange: () => {} };
    const [selectedDate, setSelectedDate] = useState<Date | null>(selected);

    const handleIconClick = () => {
        if (datePickerRef.current) {
            datePickerRef.current.setOpen(true);
        }
    };

    const [dateFormat, setDateFormat] = useState<string>(DATE_FORMATS.YYYYMMDD_SLASH);
    useEffect(() => {
        setDateFormat(showMonthYearPicker ? DATE_FORMATS.YYYYMM_SLASH : DATE_FORMATS.YYYYMMDD_SLASH);
    }, [showMonthYearPicker]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = selectedDate ? format(selectedDate, dateFormat) : '';
        }
    }, [selectedDate, dateFormat]);

    const handleChange = (date: Date | null) => {
        setSelectedDate(date);
        if (inputRef.current) {
            inputRef.current.value = date ? format(date, dateFormat) : '';
            onChange?.({ target: inputRef.current });
        }
        if (onChanged) {
            onChanged(date);
        }
    };

    return (
        <div className="relative font-light">
            <ReactDatePicker
                ref={datePickerRef}
                selected={selectedDate}
                onChange={handleChange}
                className={`p-2 pl-8 border-2 border-gray-300 dark:bg-gray-600 rounded-md h-8 ${width}`}
                dateFormat={dateFormat}
                placeholderText='Select date'
                locale={DEFAULT_VALUES.LOCALE}
                autoComplete='off'
                minDate={minDate}
                maxDate={maxDate}
                showMonthYearPicker={showMonthYearPicker}
            />
            <IconButton
                icon="/icons/calendar.svg"
                className="absolute w-4 h-4 left-2 transform top-4 -translate-y-1/2 cursor-pointer"
                onClick={handleIconClick}
            />
            <input
                type='hidden'
                {...registerField}
                ref={(e) => {
                    ref(e);
                    inputRef.current = e
                }}
            />
        </div>
    );
};

export default DatePicker;