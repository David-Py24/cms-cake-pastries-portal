import React from 'react';
import { 
  Users, 
  Package, 
  Tv, 
  ClipboardList, 
  BarChart2, 
  X,
  UserCheck,
  ChevronRight
} from 'lucide-react';
import { ViewMode } from '../types';

interface SidebarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  isOpenMobile: boolean;
  onToggleMobile: () => void;
  onOpenPos?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onViewChange,
  isOpenMobile,
  onToggleMobile,
  onOpenPos
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-xs"
          onClick={onToggleMobile}
        />
      )}

      {/* Persistent Admin Sidebar (286px) matching image_9ec75e63.png */}
      <aside 
        className={`sidebar opening-admin-shell ${
          isOpenMobile ? '!flex fixed inset-y-0 left-0 z-40' : 'hidden md:flex'
        }`}
        aria-label="Staff Navigation"
      >
        {/* Brand Header */}
        <div className="admin-shell-header">
          <div className="admin-avatar">CM</div>
          <div className="flex-1 min-w-0">
            <strong>CM&apos;s Cake &amp; Pastries</strong>
            <span>STAFF PORTAL</span>
          </div>
          <button 
            type="button"
            className="md:hidden text-stone-400 hover:text-white p-1"
            onClick={onToggleMobile}
          >
            <X size={20} />
          </button>
        </div>

        {/* Admin Navigation List */}
        <nav className="admin-nav-list" aria-label="Admin pages">
          <button
            type="button"
            onClick={() => {
              onViewChange('users');
              if (isOpenMobile) onToggleMobile();
            }}
            className={`admin-nav-item ${currentView === 'users' ? 'active' : ''}`}
          >
            <Users size={19} />
            <span>User Management</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onViewChange('inventory');
              if (isOpenMobile) onToggleMobile();
            }}
            className={`admin-nav-item ${currentView === 'inventory' ? 'active' : ''}`}
          >
            <Package size={19} />
            <span>Inventory Management</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onViewChange('kitchen');
              if (isOpenMobile) onToggleMobile();
            }}
            className={`admin-nav-item ${currentView === 'kitchen' ? 'active' : ''}`}
          >
            <Tv size={19} />
            <span>Kitchen Display</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onViewChange('orders');
              if (isOpenMobile) onToggleMobile();
            }}
            className={`admin-nav-item ${currentView === 'orders' ? 'active' : ''}`}
          >
            <ClipboardList size={19} />
            <span>Live Orders Queue</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onViewChange('reports');
              if (isOpenMobile) onToggleMobile();
            }}
            className={`admin-nav-item ${currentView === 'reports' ? 'active' : ''}`}
          >
            <BarChart2 size={19} />
            <span>Reports &amp; Analytics</span>
          </button>
        </nav>

        {/* User Account Footer: Navigates to User Account Settings (Sign Out is inside) */}
        <div className="admin-account-footer">
          <button
            type="button"
            onClick={() => {
              onViewChange('settings');
              if (isOpenMobile) onToggleMobile();
            }}
            className={`admin-user-card w-full text-left transition-all cursor-pointer group ${
              currentView === 'settings' 
                ? 'bg-[rgba(255,119,46,0.16)] border-[#ff772e]/50 ring-1 ring-[#ff772e]/30' 
                : 'hover:bg-white/[0.08] hover:border-white/10'
            }`}
            title="Open User Account Settings"
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <strong className={`group-hover:text-[#ff772e] transition-colors ${currentView === 'settings' ? 'text-[#ff772e]' : ''}`}>
                  BARITUA DAVID
                </strong>
                <span className="block truncate">db2556940@gmail.com</span>
              </div>
              <ChevronRight 
                size={16} 
                className={`text-stone-400 group-hover:text-[#ff772e] group-hover:translate-x-0.5 transition-all ${
                  currentView === 'settings' ? 'text-[#ff772e]' : ''
                }`} 
              />
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-[10px] text-amber-500 font-semibold tracking-wide uppercase">
              <UserCheck size={11} />
              <span>Admin Profile &amp; Settings</span>
            </div>
          </button>

          <div className="admin-signout-row">
            <button
              type="button"
              onClick={onOpenPos}
              className="admin-signout-text"
            >
              POS Register
            </button>
            <span className="text-[11px] text-stone-500 font-medium">
              v2.4 Active
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
