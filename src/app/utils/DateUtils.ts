function getMonthStartEndFromDate(targetDate: Date) {
    const monthStartDate = targetDate ? new Date(targetDate) : new Date();
    monthStartDate.setDate(1);

    const monthEndDate = targetDate ? new Date(targetDate) : new Date();
    monthEndDate.setMonth(monthEndDate.getMonth() + 1);
    monthEndDate.setDate(0);
    // if the monthEndDate is greater than the current date, set it to the current date
    if (monthEndDate > new Date()) {
        monthEndDate.setDate(new Date().getDate());
    }
    return { monthStartDate, monthEndDate };
}

export { getMonthStartEndFromDate };