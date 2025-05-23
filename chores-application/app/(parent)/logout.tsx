import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/shared/contexts/AuthContext';

export default function LogoutScreen() {
    const router = useRouter();
    const { setAuthData } = useAuth();

    useEffect(() => {
        setAuthData('', '');
        router.replace('/(household)/home');
    }, []);

    return null;
}
