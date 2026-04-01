// components/common/ProtectedRoute.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from './auth';
import { UnauthorizedModal } from './Unauthorized.modal';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'seller' | 'admin' | string[];
  requireAuth?: boolean;
  requireSellerTools?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  requireAuth = true,
  requireSellerTools = false,
}) => {
  const { isAuthenticated, user, isLoading, checkAuth } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // All Hooks at the top level
  useEffect(() => {
    let isMounted = true;
    const verifyAuth = async () => {
      await checkAuth();
      if (isMounted) setAuthChecked(true);
    };
    verifyAuth();
    return () => { isMounted = false; };
  }, [checkAuth]);

  const roleCheck = useMemo(() => {
    if (!isAuthenticated || !user) {
      return { hasAccess: false, message: null };
    }

    const userRoles = (() => {
      const roles: string[] = [];
      if (user.roles && Array.isArray(user.roles)) roles.push(...user.roles);
      else if (user.roles) roles.push(user.roles);
      if (roles.length === 0) roles.push('user');
      return roles;
    })();

    const hasSellerAccess = userRoles.includes('seller') || userRoles.includes('admin');
    const hasAdminAccess = userRoles.includes('admin');

    if (requireSellerTools && !hasSellerAccess) {
      return { hasAccess: false, message: "You need seller privileges to access these tools." };
    }

    if (requiredRole) {
      if (Array.isArray(requiredRole)) {
        const hasAccess = requiredRole.some(role => 
          role === 'seller' ? hasSellerAccess :
          role === 'admin' ? hasAdminAccess :
          role === 'user' ? true : userRoles.includes(role)
        );
        if (!hasAccess) {
          return { hasAccess: false, message: `You need ${requiredRole.join(' or ')} privileges.` };
        }
      } else {
        const roleMap = { seller: hasSellerAccess, admin: hasAdminAccess, user: true };
        const hasAccess = roleMap[requiredRole as keyof typeof roleMap] ?? userRoles.includes(requiredRole);
        if (!hasAccess) {
          return { hasAccess: false, message: `You need ${requiredRole} privileges.` };
        }
      }
    }
    return { hasAccess: true, message: null };
  }, [isAuthenticated, user, requiredRole, requireSellerTools]);

  useEffect(() => {
    if (!authChecked) return;
    setShowModal((requireAuth && !isAuthenticated) || (isAuthenticated && !roleCheck.hasAccess));
  }, [authChecked, requireAuth, isAuthenticated, roleCheck.hasAccess]);

  // Early returns after all Hooks are called
  if (isLoading || !authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-soft-white to-warm-gray">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-sky-500 animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-text">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return (
      <UnauthorizedModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message="Please sign in to access this page."
      />
    );
  }

  if (isAuthenticated && !roleCheck.hasAccess) {
    return (
      <UnauthorizedModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message={roleCheck.message || "You don't have permission."}
      />
    );
  }

  return <>{children}</>;
};