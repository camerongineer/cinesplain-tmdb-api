export const getFormattedDisplayedDate = (dateString: string | undefined) => {
    if (!dateString) {
        return "";
    }
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("en-us", {
        dateStyle: "long"
    });
    return formatter.format(date);
};

export const getFormattedDate = (date: Date, format: string = "YYYY-MM-DD") => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    
    return format.replace("YYYY", year).replace("MM", month).replace("DD", day);
};

export const getFormattedCurrencyAmount = (dollarAmount: number) => {
    return dollarAmount.toLocaleString("en-us", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
};

export const getFormattedRuntime = (runtimeMinutes: number) => {
    const hours = Math.floor(runtimeMinutes / 60);
    const minutes = runtimeMinutes % 60;
    return `${hours > 0 ? `${hours}h ` : ""}${minutes}m`;
};