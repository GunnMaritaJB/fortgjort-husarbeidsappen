// src/shared/contexts/AuthContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

type AuthContextType = {
    parentId: string | null;
    householdId: string | null;
    loading: boolean;
    setAuthData: (id: string, householdId: string | null) => void;
};

const AuthContext = createContext<AuthContextType>({
    parentId: null,
    householdId: null,
    loading: true,
    setAuthData: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [parentId, setParentId] = useState<string | null>(null);
    const [householdId, setHouseholdId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const setAuthData = (id: string, householdId: string | null) => {
        setParentId(id);
        setHouseholdId(householdId);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (user: User | null) => {
            if (user) {
                setParentId(user.uid);
            } else {
                setParentId(null);
                setHouseholdId(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider
            value={{
                parentId,
                householdId,
                loading,
                setAuthData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
