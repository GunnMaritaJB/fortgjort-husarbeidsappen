import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
} from 'firebase/auth';
import { auth } from '@/firebaseConfig';

export const changeUserPassword = async (
    currentPassword: string,
    newPassword: string
): Promise<void> => {
    const user = auth.currentUser;

    if (!user) {
        throw new Error('Ingen bruker er logget inn.');
    }

    const credential = EmailAuthProvider.credential(user.email!, currentPassword);

    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
};
