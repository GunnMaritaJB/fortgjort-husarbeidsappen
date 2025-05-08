import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { sendVerificationEmail } from '../services/authService';

export function useEmailVerification(onVerified: () => void) {
  const auth = getAuth();
  const [cooldown, setCooldown] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(60);

  // Nedtelling på cooldown
  useEffect(() => {
    let countdown: NodeJS.Timeout;

    if (cooldown) {
      countdown = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 1) {
            clearInterval(countdown);
            setCooldown(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [cooldown]);

  // Sjekker om epost er bekreftet hvert 5. sekund
  useEffect(() => {
    const interval = setInterval(async () => {
      const user = auth.currentUser;
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          clearInterval(interval);
          onVerified();
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [auth.currentUser, onVerified]);

  const resendVerification = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Ingen bruker logget inn');
      return;
    }

    try {
      await sendVerificationEmail(user);
      Alert.alert('Link sendt', 'Sjekk e-posten din!');
      setCooldown(true);
    } catch (error: any) {
      Alert.alert('Feil', error.message);
    }
  };

  return {
    cooldown,
    secondsLeft,
    resendVerification,
  };
}
