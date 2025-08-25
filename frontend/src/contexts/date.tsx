import { createContext, useState } from "react";

export type tDate = string;

interface IDateProviderProps {
    children: React.ReactNode;
};

export interface IDateContext {
    initialDate: string;
    setInitialDate: React.Dispatch<React.SetStateAction<tDate>>;
    finalDate: string;
    setFinalDate: React.Dispatch<React.SetStateAction<tDate>>;
};

export const DateContext = createContext({} as IDateContext);

const DateProvider = ({ children }: IDateProviderProps) => {
    const now = new Date();
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

    const [initialDate, setInitialDate] = useState<tDate>(aMonthAgo);
    const [finalDate, setFinalDate] = useState<tDate>(currentDate);

    return (
        <DateContext.Provider value={{ initialDate, setInitialDate, finalDate, setFinalDate }}>
            { children }
        </DateContext.Provider>
    );
};

export default DateProvider;