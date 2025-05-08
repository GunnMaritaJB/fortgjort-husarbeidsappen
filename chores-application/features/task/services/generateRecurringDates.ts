import { eachDayOfInterval } from 'date-fns';

const weekdayMap = {
    'SØ': 0,
    'MA': 1,
    'TI': 2,
    'ON': 3,
    'TO': 4,
    'FR': 5,
    'LØ': 6,
};

export const getRecurringDates = (
    repeatDays: string[],
    start: Date,
    end: Date
): Date[] => {
    return eachDayOfInterval({ start, end }).filter(date =>
        repeatDays.includes(
            Object.keys(weekdayMap).find((key) =>
                weekdayMap[key as keyof typeof weekdayMap] === date.getDay()
            )!
        )
    );
};
