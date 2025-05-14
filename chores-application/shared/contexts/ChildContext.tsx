import React, { createContext, useContext, useState, ReactNode } from 'react';

type ChildContextType = {
    childId: string | null;
    householdId: string | null;
    setChild: (childId: string, householdId: string) => void;
    clearChild: () => void;
};

const ChildContext = createContext<ChildContextType | undefined>(undefined);

export const ChildProvider = ({ children }: { children: ReactNode }) => {
    const [childId, setChildId] = useState<string | null>(null);
    const [householdId, setHouseholdId] = useState<string | null>(null);

    const setChild = (id: string, household: string) => {
        setChildId(id);
        setHouseholdId(household);
    };

    const clearChild = () => {
        setChildId(null);
        setHouseholdId(null);
    };

    return (
        <ChildContext.Provider value={{ childId, householdId, setChild, clearChild }}>
            {children}
        </ChildContext.Provider>
    );
};

export const useChild = () => {
    const context = useContext(ChildContext);
    if (!context) {
        throw new Error('useChild must be used within a ChildProvider');
    }
    return context;
};
