import { createContext, useState } from "react";

export const DateContext = createContext({});

const DateProvider = ({ children }) => {
    const now = new Date()
    const currentDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    ).toISOString().substr(0, 10);
    const aMonthAgo = new Date(
        now.getFullYear(), 
        now.getMonth() -1,
        now.getDate()
    ).toISOString().substr(0, 10);

    const [initialDate, setInitialDate] = useState(aMonthAgo);
    const [finalDate, setFinalDate] = useState(currentDate);

    return (
        <DateContext.Provider value={{ initialDate, setInitialDate, finalDate, setFinalDate }}>
            { children }
        </DateContext.Provider>
    );
};

export default DateProvider