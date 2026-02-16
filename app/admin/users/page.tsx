'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { UserPlus, User, Shield, Trash2, Loader2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function UserManagementPage() {
  const supabase = createClient();

  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('contributor');
  const [showForm, setShowForm] = useState(false);

  const [currentUserProfile, setCurrentUserProfile] = useState<any>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setCurrentUserProfile(profile);
    }
    await fetchProfiles();
  };

  const fetchProfiles = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProfiles(data);
    }

    setLoading(false);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('create_user', {
        body: {
          email,
          password,
          full_name: fullName,
          role,
          can_post_direct: role === 'admin',
        },
      });

      if (error) throw error;

      alert('User created successfully!');
      setShowForm(false);
      setEmail('');
      setPassword('');
      setFullName('');
      setRole('contributor');

      fetchProfiles();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  if (currentUserProfile?.role !== 'admin') {
    return (
      <div className="p-8 bg-red-50 text-red-700 rounded-2xl border border-red-100 flex items-center gap-3">
        <Shield size={24} />
        <p className="font-bold">Access Denied: Only administrators can manage users.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            User Management
          </h1>
          <p className="text-slate-500 mt-1">
            Manage admin and contributor access levels.
          </p>
        </div>

        {currentUserProfile?.role === 'admin' && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-blue-100 transition-all active:scale-95"
          >
            <UserPlus size={20} />
            Add New User
          </button>
        )}
      </header>

      {showForm && (
        <section className="bg-white p-8 rounded-2xl border border-blue-100 shadow-xl">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Create New Account
          </h2>

          <form onSubmit={handleCreateUser} className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Full Name
              </label>
              <input
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Email Address
              </label>
              <input
                required
                type="email"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Password
              </label>
              <input
                required
                type="password"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Role
              </label>
              <select
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="contributor">
                  Contributor (Review Required)
                </option>
                <option value="admin">Admin (Full Access)</option>
              </select>
            </div>

            <div className="md:col-span-2 pt-4 flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                {submitting ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Check size={20} />
                )}
                Create User
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-8 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase">
                User Profile
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase">Role</th>
              <th className="px-6 py-4 text-xs font-bold uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase">Joined</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={4} className="p-12 text-center text-slate-400">
                  Loading users...
                </td>
              </tr>
            ) : (
              profiles.map((profile) => (
                <tr key={profile.id}>
                  <td className="px-6 py-4 font-bold">
                    {profile.full_name}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 font-bold uppercase text-[10px] px-2.5 py-1 rounded-full',
                        profile.role === 'admin'
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'bg-slate-100 text-slate-600'
                      )}
                    >
                      <Shield size={10} />
                      {profile.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {profile.is_active ? 'Active' : 'Disabled'}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}