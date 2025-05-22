import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Typen du vil gjøre tilgjengelig overalt
interface AuthContextProps {
    parentId: string | null;
    householdId: string | null;
    setAuthData: (parentId: string, householdId: string) => void;
}

// Default verdier (bare for init)
const AuthContext = createContext<AuthContextProps>({
    parentId: null,
    householdId: null,
    setAuthData: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [parentId, setParentId] = useState<string | null>(null);
    const [householdId, setHouseholdId] = useState<string | null>(null);

    const setAuthData = (newParentId: string, newHouseholdId: string) => {
        setParentId(newParentId);
        setHouseholdId(newHouseholdId);
    };

    return (
        <AuthContext.Provider value={{ parentId, householdId, setAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};

// Dette hooket bruker du i komponenter:
export const useAuth = () => useContext(AuthContext);
