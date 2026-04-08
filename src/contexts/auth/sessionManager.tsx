// components/common/SessionManager.tsx
import React, { useState, useEffect } from 'react';

import { useAuth } from '../../contexts/auth/auth';
import { useSessionTimeout } from '../../hooks/auth/useSessionTimeout';
import { SessionExpiryModal } from './expiryModal';

export const SessionManager: React.FC = () => {
  const { checkAuth, isAuthenticated } = useAuth();
  const [showExpiryWarning, setShowExpiryWarning] = useState(false);
  const { resetTimer } = useSessionTimeout(120); // 120 seconds for testing

  useEffect(() => {
    const handleSessionExpiring = (event: CustomEvent) => {
      if (isAuthenticated) {
        setShowExpiryWarning(true);
        console.log(`Session expiring in ${event.detail.secondsLeft} seconds`);
      }
    };

    const handleSessionExpired = () => {
      setShowExpiryWarning(false);
    };

    window.addEventListener('session-expiring', handleSessionExpiring as EventListener);
    window.addEventListener('session-expired', handleSessionExpired);

    return () => {
      window.removeEventListener('session-expiring', handleSessionExpiring as EventListener);
      window.removeEventListener('session-expired', handleSessionExpired);
    };
  }, [isAuthenticated]);

  const handleExtendSession = async () => {
    // Refresh token or just reset timer
    await checkAuth();
    resetTimer();
    setShowExpiryWarning(false);
  };

  return (
    <SessionExpiryModal
      isOpen={showExpiryWarning}
      onClose={() => setShowExpiryWarning(false)}
      onExtend={handleExtendSession}
      secondsLeft={60}
    />
  );
};