/* Role-aware page access and portal boundary guard for Customer vs. Staff/Admin portals. */
(function () {
  'use strict';

  function isCustomerPortal() {
    const urlParams = new URLSearchParams(window.location.search);
    const p = (urlParams.get('portal') || '').toLowerCase();
    if (p === 'customer') return true;
    if (p === 'staff') return false;
    try {
      const saved = sessionStorage.getItem('cm_portal_type');
      if (saved === 'customer') return true;
      if (saved === 'staff') return false;
    } catch (_e) { /* ignore */ }
    if (window.location.port === '5174') return false;
    if (window.location.port === '5173') return true;
    return false;
  }

  function pagePaths() {
    const isPos = window.location.pathname.includes('/Assets/Dine-in/');
    return isPos ? {
      login: '../Admin panel/Log-in/Log-in.html',
      admin: '../Admin panel/Admin.html#reports',
      cashier: 'Dine-in.html',
      kitchen: '../Admin panel/Admin.html#kitchen',
    } : {
      login: '../Log-in/Log-in.html',
      admin: '../Admin.html#reports',
      cashier: '../../Dine-in/Dine-in.html',
      kitchen: '../Admin.html#kitchen',
    };
  }

  function redirectFor(role) {
    const paths = pagePaths();
    const homes = { admin: paths.admin, manager: paths.admin, cashier: paths.cashier, kitchen: paths.kitchen, baker: paths.kitchen };
    window.location.replace(homes[role] || paths.login);
  }

  async function protectPage() {
    const isPos = window.location.pathname.includes('/Assets/Dine-in/');
    const isAdminSurface = window.location.pathname.includes('/Assets/Admin') || window.location.pathname.includes('/Assets/Admin%20panel/');
    const urlParams = new URLSearchParams(window.location.search);
    const customerPortalActive = isCustomerPortal();

    // If someone on the Customer Portal (:5173) tries to open an Admin Panel screen, redirect back to Customer Home
    if (customerPortalActive && isAdminSurface) {
      window.location.replace('/src/Opening.html?portal=customer');
      return;
    }

    const isPublicPreorder = isPos && (customerPortalActive || urlParams.get('mode') === 'preorder' || localStorage.getItem('cm_pos_flow_mode') === 'preorder');

    const allowedRoles = (document.body.dataset.allowedRoles || '')
      .split(',')
      .map((role) => role.trim())
      .filter(Boolean);

    try {
      const response = await fetch('/api/auth/me', { credentials: 'include', cache: 'no-store' });
      if (!response.ok) throw new Error('Unauthenticated');
      const { user } = await response.json();
      if (!user || !allowedRoles.includes(user.role)) {
        if (isPublicPreorder) return;
        redirectFor(user && user.role);
        return;
      }
      if (customerPortalActive) {
        // Keep customer portal strictly in public customer mode even if a staff cookie exists in the same browser
        return;
      }
      try { localStorage.setItem('cm_admin_session', JSON.stringify(user)); } catch (_e) { /* ignore */ }
      document.documentElement.classList.add('staff-authorized');
      document.dispatchEvent(new window.CustomEvent('cm:staff-authorized', { detail: { user } }));
    } catch (_error) {
      if (isPublicPreorder) return;
      window.location.replace(pagePaths().login);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', protectPage, { once: true });
  } else {
    protectPage();
  }
})();
