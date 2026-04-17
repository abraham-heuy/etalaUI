import { useEffect, useRef, useCallback, useState } from 'react';
import { useAuth } from '../../contexts/auth/auth';

export const useSessionTimeout = (timeoutSeconds: number = 600, warningBeforeSeconds: number = 60) => {
  const { logout, isAuthenticated } = useAuth();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const warningRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const [remainingSeconds, setRemainingSeconds] = useState(timeoutSeconds);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningRef.current) clearTimeout(warningRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (isAuthenticated) {
      setRemainingSeconds(timeoutSeconds);

      // Countdown interval
      intervalRef.current = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Show warning at warningBeforeSeconds before expiry
      const warningTime = Math.max(0, timeoutSeconds - warningBeforeSeconds);
      if (warningTime > 0) {
        warningRef.current = setTimeout(() => {
          console.log('Session expiring soon...');
          window.dispatchEvent(new CustomEvent('session-expiring', {
            detail: { secondsLeft: warningBeforeSeconds }
          }));
        }, warningTime * 1000);
      }

      // Logout after timeout
      timeoutRef.current = setTimeout(async () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        await logout();
        window.dispatchEvent(new CustomEvent('session-expired'));
      }, timeoutSeconds * 1000);
    }
  }, [isAuthenticated, logout, timeoutSeconds, warningBeforeSeconds]);

  useEffect(() => {
    resetTimer();

    // Reset timer on user activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    const handleActivity = () => resetTimer();

    events.forEach(event => window.addEventListener(event, handleActivity));

    return () => {
      events.forEach(event => window.removeEventListener(event, handleActivity));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (warningRef.current) clearTimeout(warningRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetTimer]);

  return { resetTimer, remainingSeconds };
};