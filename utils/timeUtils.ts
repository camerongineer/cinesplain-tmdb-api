export const getSubtractedDate = (originalDate: Date, years: number = 0, months: number = 0, days: number = 0) => {
    const newDate = new Date(originalDate);
    if (years) newDate.setFullYear(newDate.getFullYear() - years);
    if (months) newDate.setMonth(newDate.getMonth() - months);
    if (days) newDate.setDate(newDate.getDate() - days);
    return newDate;
};
