import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  KeyRound, 
  LogOut, 
  Save, 
  Camera, 
  CheckCircle2, 
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

interface UserSettingsViewProps {
  onSignOut: () => void;
  onSaveNotification: (msg: string) => void;
}

export const UserSettingsView: React.FC<UserSettingsViewProps> = ({
  onSignOut,
  onSaveNotification
}) => {
  const [name, setName] = useState('Baritua David');
  const [email] = useState('db2556940@gmail.com');
  const [phone, setPhone] = useState('+63 917 888 2345');
  const [title, setTitle] = useState('Store Owner & Executive Baker');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [showSignoutConfirm, setShowSignoutConfirm] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      alert('New password and confirmation do not match.');
      return;
    }
    onSaveNotification('Profile and account settings saved successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="main-viewport" aria-labelledby="settingsTitle">
      <div className="content-fade-slide w-full flex flex-col flex-1">
        {/* Page Header matching Admin Panel pages */}
        <header className="page-header">
        <div className="title-group">
          <h1 className="page-title" id="settingsTitle">User Account Settings</h1>
          <p className="page-subtitle">Manage staff profile details, security preferences, and portal session</p>
        </div>

        <div className="header-actions">
          {/* Sign Out Button kept cleanly inside User Account Settings */}
          <button 
            type="button" 
            className="btn-header-default hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50 transition-colors" 
            id="accountSignoutBtn"
            title="Sign out of your active staff session"
            onClick={() => setShowSignoutConfirm(true)}
          >
            <LogOut size={16} className="text-rose-500" />
            <span>Sign Out</span>
          </button>

          {/* Save Changes Button */}
          <button 
            type="button" 
            className="btn-header-add" 
            id="saveAccountBtn" 
            title="Save changes to your account"
            onClick={handleSaveProfile}
          >
            <Save size={16} />
            <span>Save Changes</span>
          </button>
        </div>
      </header>

      {/* Metrics / Overview Row (Same layout as Inventory & User Management) */}
      <section className="metrics-grid" aria-label="Account Overview">
        <div className="metric-card">
          <span className="metric-label">STAFF ROLE</span>
          <span className="metric-value text-stone-900 text-xl font-extrabold mt-1">
            Owner / Admin
          </span>
          <span className="metric-tag flex items-center justify-between">
            <span>Full System Access</span>
            <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded">All Permissions</span>
          </span>
        </div>

        <div className="metric-card">
          <span className="metric-label">ACCOUNT STATUS</span>
          <span className="metric-value text-emerald-700 text-xl font-extrabold mt-1">
            Active &bull; Online
          </span>
          <span className="metric-tag flex items-center gap-1.5 text-emerald-700 font-semibold">
            <CheckCircle2 size={13} />
            <span>Authenticated Staff Session</span>
          </span>
        </div>

        <div className="metric-card">
          <span className="metric-label">SECURITY LEVEL</span>
          <span className="metric-value text-[#ff772e] text-xl font-extrabold mt-1">
            Protected
          </span>
          <span className="metric-tag flex items-center justify-between text-[#ff772e] font-semibold">
            <span>Two-Factor Auth Active</span>
            <span className="text-[10px] bg-orange-100 text-orange-900 font-bold px-1.5 py-0.5 rounded">2FA</span>
          </span>
        </div>

        <div className="metric-card">
          <span className="metric-label">SESSION IDENTIFIER</span>
          <span className="metric-value text-stone-800 text-base font-mono font-bold mt-1 truncate" title={email}>
            {email}
          </span>
          <span className="metric-tag">Primary staff email ID</span>
        </div>
      </section>

      {/* Two Column Layout matching Admin Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Left 2 Columns: Profile & Credentials Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Personal Profile Details */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-2xs">
            <h2 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
              <User size={18} className="text-[#ff772e]" />
              <span>Personal Information</span>
            </h2>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Staff Member Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-sm font-semibold text-stone-900 outline-none focus:border-[#ff772e] focus:ring-2 focus:ring-[#ff772e]/10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Official Email (Login ID)
                  </label>
                  <input
                    type="email"
                    className="w-full px-3.5 py-2.5 border border-stone-200 bg-stone-50 rounded-xl text-sm font-mono text-stone-500 cursor-not-allowed"
                    value={email}
                    readOnly
                    title="Managed by store domain administrator"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Contact Phone Number
                  </label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-sm font-medium text-stone-900 outline-none focus:border-[#ff772e]"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Job Title / Department
                  </label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-sm font-medium text-stone-900 outline-none focus:border-[#ff772e]"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Card 2: Security & Password Update */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-2xs">
            <h2 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
              <KeyRound size={18} className="text-[#ff772e]" />
              <span>Password &amp; Security</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-sm outline-none focus:border-[#ff772e]"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Min. 12 characters"
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-sm outline-none focus:border-[#ff772e]"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="Repeat new password"
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-sm outline-none focus:border-[#ff772e]"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            {/* 2FA Toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-3">
                <ShieldCheck size={22} className="text-emerald-600" />
                <div>
                  <strong className="text-sm text-stone-900 block font-bold">Two-Factor Authentication (2FA)</strong>
                  <span className="text-xs text-stone-500">Require an authenticator code when logging in from new devices</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={is2FAEnabled} 
                  onChange={(e) => setIs2FAEnabled(e.target.checked)} 
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff772e]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Avatar & Account Actions */}
        <div className="space-y-6">
          {/* Card: Avatar & Brand Badge */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-2xs text-center flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#ff772e] to-[#ff5500] text-white flex items-center justify-center font-extrabold text-3xl shadow-lg border-4 border-white">
                BD
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 p-2 rounded-full bg-stone-900 text-white hover:bg-stone-800 shadow-md transition-transform hover:scale-105"
                title="Upload custom photo"
                onClick={() => alert('Photo upload dialog')}
              >
                <Camera size={14} />
              </button>
            </div>

            <h3 className="font-extrabold text-lg text-stone-900">{name}</h3>
            <p className="text-xs font-semibold text-[#ff772e] uppercase tracking-wider mt-0.5">CM&apos;s Cake &amp; Pastries Admin</p>
            <span className="text-xs text-stone-500 font-mono mt-1">{email}</span>

            <div className="w-full mt-6 pt-4 border-t border-stone-100 flex gap-2">
              <button
                type="button"
                onClick={() => alert('Photo reset to default initials')}
                className="flex-1 py-2 px-3 border border-stone-200 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-50 flex items-center justify-center gap-1.5"
              >
                <RotateCcw size={13} />
                <span>Reset Avatar</span>
              </button>
              <button
                type="button"
                onClick={handleSaveProfile}
                className="flex-1 py-2 px-3 bg-[#ff772e] hover:bg-[#ea580c] text-white rounded-xl text-xs font-bold shadow-2xs"
              >
                Save Profile
              </button>
            </div>
          </div>

          {/* Card: Session & Sign Out Action (Danger Zone) */}
          <div className="bg-white border border-rose-200 rounded-2xl p-6 shadow-2xs">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm mb-2">
              <LogOut size={17} />
              <span>Session &amp; Logout</span>
            </div>
            <p className="text-xs text-stone-500 mb-4 leading-relaxed">
              Terminating your staff session clears local active cache and logs your profile out of the CM&apos;s Cake &amp; Pastries Staff Portal.
            </p>

            <button
              type="button"
              onClick={() => setShowSignoutConfirm(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut size={15} />
              <span>Sign Out of Staff Portal</span>
            </button>
          </div>
        </div>

      </div>

      {/* Confirmation Modal for Sign Out */}
      {showSignoutConfirm && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-stone-200 animate-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-600 mb-3">
              <div className="p-2.5 bg-rose-50 rounded-xl">
                <LogOut size={22} />
              </div>
              <h3 className="text-lg font-bold text-stone-900">Sign Out</h3>
            </div>
            <p className="text-sm text-stone-600 mb-6 leading-relaxed">
              Are you sure you want to end your active session for <strong>Baritua David</strong> ({email})?
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowSignoutConfirm(false)}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-sm font-bold hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSignoutConfirm(false);
                  onSignOut();
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 text-white text-sm font-bold hover:bg-rose-700 shadow-xs"
              >
                Confirm Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
