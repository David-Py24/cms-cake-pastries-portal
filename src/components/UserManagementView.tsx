import React, { useState } from 'react';
import { Search, UserPlus, Filter, ShieldCheck, CheckCircle2, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { StaffUser } from '../types';

const INITIAL_STAFF: StaffUser[] = [
  {
    id: '#USR-001',
    name: 'Baritua David',
    email: 'db2556940@gmail.com',
    role: 'admin',
    accessLevel: 'Owner / Full Access',
    isActive: true,
  },
  {
    id: '#USR-002',
    name: 'Maria Santos',
    email: 'maria.santos@cmcakes.com',
    role: 'manager',
    accessLevel: 'Manager (Reports & Inventory)',
    isActive: true,
  },
  {
    id: '#USR-003',
    name: 'Juan Dela Cruz',
    email: 'juan.pos@cmcakes.com',
    role: 'cashier',
    accessLevel: 'Cashier (POS & Orders)',
    isActive: true,
  },
  {
    id: '#USR-004',
    name: 'Elena Ramos',
    email: 'elena.pastry@cmcakes.com',
    role: 'baker',
    accessLevel: 'Baker (Kitchen & Catalog)',
    isActive: true,
  },
  {
    id: '#USR-005',
    name: 'Carlos Mendoza',
    email: 'carlos.kitchen@cmcakes.com',
    role: 'kitchen',
    accessLevel: 'Kitchen Staff (Order Display)',
    isActive: true,
  }
];

export const UserManagementView: React.FC = () => {
  const [users, setUsers] = useState<StaffUser[]>(INITIAL_STAFF);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = users.filter((u) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q) && !u.id.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    return true;
  });

  return (
    <div className="main-viewport" aria-labelledby="userManagementTitle">
      <div className="content-fade-slide w-full flex flex-col flex-1">
        {/* Header */}
      <header className="page-header">
        <div className="title-group">
          <h1 className="page-title" id="userManagementTitle">User Accounts &amp; Access Control</h1>
          <p className="page-subtitle">Manage staff permissions, access levels, and account status across your team.</p>
        </div>

        <div className="header-actions">
          <button 
            type="button" 
            className="btn-header-add"
            onClick={() => alert('Add Staff Account dialog')}
          >
            <UserPlus size={16} />
            <span>+ Add New User</span>
          </button>
        </div>
      </header>

      {/* Stat Chips matching Admin_22f9ab40.html */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-xs font-semibold text-stone-500 uppercase block">Total Users</span>
          <strong className="text-2xl font-bold text-stone-900 mt-1 block">{users.length}</strong>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-xs font-semibold text-stone-500 uppercase block">Active Staff</span>
          <strong className="text-2xl font-bold text-emerald-700 mt-1 block">{users.filter(u => u.isActive).length}</strong>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-xs font-semibold text-stone-500 uppercase block">Configured Roles</span>
          <strong className="text-2xl font-bold text-stone-900 mt-1 block">5</strong>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-xs font-semibold text-stone-500 uppercase block">Shop Owner</span>
          <strong className="text-2xl font-bold text-[#ff772e] mt-1 block">Active</strong>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="bg-white border border-stone-200 rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg text-sm outline-none focus:border-[#ff772e]"
            placeholder="Search users, roles, or email addresses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={15} className="text-stone-500" />
          <select
            className="border border-stone-300 rounded-lg px-3 py-2 text-sm bg-white font-medium"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Owner / Admin</option>
            <option value="manager">Manager</option>
            <option value="cashier">Cashier</option>
            <option value="baker">Baker</option>
            <option value="kitchen">Kitchen Staff</option>
          </select>
        </div>
      </section>

      {/* Table */}
      <section className="table-card-container">
        <table className="inventory-table-styled">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Staff Member</th>
              <th>Role</th>
              <th>Access Level</th>
              <th>Status</th>
              <th className="text-right pr-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td className="font-mono text-xs font-bold text-stone-600">{u.id}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#ff772e]/20 text-[#ff772e] flex items-center justify-center font-bold text-xs">
                      {u.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-bold text-stone-900 text-sm">{u.name}</div>
                      <div className="text-xs text-stone-500">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="capitalize font-medium text-xs px-2.5 py-1 rounded-md bg-stone-100 text-stone-700">
                    {u.role}
                  </span>
                </td>
                <td className="text-xs text-stone-600">{u.accessLevel}</td>
                <td>
                  <span className="pill-badge pill-available">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Active</span>
                  </span>
                </td>
                <td className="text-right pr-6">
                  <div className="inline-flex gap-2">
                    <button type="button" className="p-1.5 text-stone-400 hover:text-stone-700 rounded">
                      <Edit2 size={15} />
                    </button>
                    <button type="button" className="p-1.5 text-stone-400 hover:text-rose-600 rounded">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      </div>
    </div>
  );
};
