// hooks/useSessionTimeout.ts
import { useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../../contexts/auth/auth';

export const useSessionTimeout = (timeoutSeconds: number = 60) => {
  const { logout, isAuthenticated } = useAuth();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const warningRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningRef.current) clearTimeout(warningRef.current);

    if (isAuthenticated) {
      // Show warning 10 seconds before timeout (for testing)
      const warningTime = Math.max(10, timeoutSeconds - 10);
      warningRef.current = setTimeout(() => {
        console.log('Session expiring soon...');
        window.dispatchEvent(new CustomEvent('session-expiring', {
          detail: { secondsLeft: 10 }
        }));
      }, warningTime * 1000);

      // Logout after timeout
      timeoutRef.current = setTimeout(async () => {
        await logout();
        window.dispatchEvent(new CustomEvent('session-expired'));
      }, timeoutSeconds * 1000);
    }
  }, [isAuthenticated, logout, timeoutSeconds]);

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
    };
  }, [resetTimer]);

  return { resetTimer };
};