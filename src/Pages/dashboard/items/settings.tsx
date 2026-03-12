// pages/dashboard/settings.tsx
import React, { useState } from 'react';
import { 
  User,
  Mail,
  Phone,
  Lock,
  Bell,
  Globe,
  Moon,
  Sun,
  Shield,
  Smartphone,
  Camera,
  Save,
  CheckCircle
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'privacy' | 'preferences'>('profile');
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '254712345678',
    language: 'English',
    currency: 'KES',
    timezone: 'Africa/Nairobi',
    darkMode: false,
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
  });

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
            Account Settings
          </h1>
          <p className="text-slate-text mt-1">
            Manage your account preferences and security
          </p>
        </div>
        <button
          onClick={handleSave}
          className="bg-redbull-blue text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-redbull-blue/90 flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 animate-slide-down">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-sm text-green-700">Settings saved successfully!</p>
        </div>
      )}

      {/* Settings Tabs (Mobile Friendly) */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
        {[
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'privacy', label: 'Privacy & Security', icon: Shield },
          { id: 'preferences', label: 'Preferences', icon: Globe },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-redbull-blue text-white shadow-md'
                  : 'bg-white border border-sky-200 text-slate-text hover:border-redbull-blue'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-xl border border-sky-100 p-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="text-center sm:text-left">
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-redbull-blue-light to-redbull-blue/30 flex items-center justify-center">
                  <User className="w-12 h-12 text-redbull-blue" />
                </div>
                <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full border border-sky-200 hover:bg-sky-50">
                  <Camera className="w-4 h-4 text-slate-text" />
                </button>
              </div>
              <p className="text-xs text-slate-text mt-2">Click to change photo</p>
            </div>

            {/* Profile Form */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-text mb-1 block">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm focus:outline-none focus:border-redbull-blue"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-text mb-1 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 border border-sky-200 rounded-lg text-sm focus:outline-none focus:border-redbull-blue"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-text mb-1 block">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => setUserData({...userData, phone: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 border border-sky-200 rounded-lg text-sm focus:outline-none focus:border-redbull-blue"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-sky-100">
                <h3 className="text-sm font-medium text-charcoal mb-3">Change Password</h3>
                <div className="space-y-3">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full pl-10 pr-4 py-2 border border-sky-200 rounded-lg text-sm"
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full pl-10 pr-4 py-2 border border-sky-200 rounded-lg text-sm"
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      className="w-full pl-10 pr-4 py-2 border border-sky-200 rounded-lg text-sm"
                    />
                  </div>
                  <p className="text-xs text-slate-text/70">
                    Password must be at least 8 characters
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-xl border border-sky-100 p-6 space-y-4">
          <h3 className="text-lg font-display font-semibold text-charcoal mb-2">
            Notification Preferences
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-sky-50/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-redbull-blue" />
                <div>
                  <p className="text-sm font-medium text-charcoal">Email Notifications</p>
                  <p className="text-xs text-slate-text">Receive order updates and promotions</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={userData.emailNotifications}
                  onChange={(e) => setUserData({...userData, emailNotifications: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-redbull-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-redbull-blue"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-sky-50/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-redbull-blue" />
                <div>
                  <p className="text-sm font-medium text-charcoal">Push Notifications</p>
                  <p className="text-xs text-slate-text">Get alerts on your device</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={userData.pushNotifications}
                  onChange={(e) => setUserData({...userData, pushNotifications: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-redbull-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-redbull-blue"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-sky-50/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-redbull-blue" />
                <div>
                  <p className="text-sm font-medium text-charcoal">SMS Notifications</p>
                  <p className="text-xs text-slate-text">Order updates via text message</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={userData.smsNotifications}
                  onChange={(e) => setUserData({...userData, smsNotifications: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-redbull-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-redbull-blue"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-sky-50/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-redbull-blue" />
                <div>
                  <p className="text-sm font-medium text-charcoal">Marketing Emails</p>
                  <p className="text-xs text-slate-text">Receive deals and promotions</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={userData.marketingEmails}
                  onChange={(e) => setUserData({...userData, marketingEmails: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-redbull-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-redbull-blue"></div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Privacy & Security Tab */}
      {activeTab === 'privacy' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-sky-100 p-6">
            <h3 className="text-lg font-display font-semibold text-charcoal mb-4">
              Two-Factor Authentication
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-redbull-blue" />
                <div>
                  <p className="text-sm font-medium text-charcoal">Enable 2FA</p>
                  <p className="text-xs text-slate-text">Add extra security to your account</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-redbull-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-redbull-blue"></div>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-sky-100 p-6">
            <h3 className="text-lg font-display font-semibold text-charcoal mb-4">
              Login Sessions
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-sky-50/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-charcoal">Current Session</p>
                  <p className="text-xs text-slate-text">Chrome on Windows · Nairobi, Kenya</p>
                </div>
                <span className="text-xs text-green-600">Active Now</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-sky-50/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-charcoal">Mobile App</p>
                  <p className="text-xs text-slate-text">iPhone 13 · Last active 2 hours ago</p>
                </div>
                <button className="text-xs text-red-600">Revoke</button>
              </div>
            </div>
            <button className="mt-4 text-sm text-red-600 hover:text-red-700">
              Log out all devices
            </button>
          </div>

          <div className="bg-white rounded-xl border border-sky-100 p-6">
            <h3 className="text-lg font-display font-semibold text-charcoal mb-4">
              Delete Account
            </h3>
            <p className="text-sm text-slate-text mb-4">
              Once you delete your account, there's no going back. Please be certain.
            </p>
            <button className="text-sm text-red-600 hover:text-red-700">
              Request Account Deletion
            </button>
          </div>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div className="bg-white rounded-xl border border-sky-100 p-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-text mb-1 block">
              Language
            </label>
            <select
              value={userData.language}
              onChange={(e) => setUserData({...userData, language: e.target.value})}
              className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm"
            >
              <option value="English">English</option>
              <option value="Swahili">Swahili</option>
              <option value="Kamba">Kamba</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-text mb-1 block">
              Currency
            </label>
            <select
              value={userData.currency}
              onChange={(e) => setUserData({...userData, currency: e.target.value})}
              className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm"
            >
              <option value="KES">KES - Kenyan Shilling</option>
              <option value="USD">USD - US Dollar</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-text mb-1 block">
              Timezone
            </label>
            <select
              value={userData.timezone}
              onChange={(e) => setUserData({...userData, timezone: e.target.value})}
              className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm"
            >
              <option value="Africa/Nairobi">Africa/Nairobi (GMT+3)</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-3 bg-sky-50/50 rounded-lg">
            <div className="flex items-center gap-3">
              {userData.darkMode ? <Moon className="w-5 h-5 text-redbull-blue" /> : <Sun className="w-5 h-5 text-redbull-blue" />}
              <div>
                <p className="text-sm font-medium text-charcoal">Dark Mode</p>
                <p className="text-xs text-slate-text">Switch between light and dark themes</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={userData.darkMode}
                onChange={(e) => setUserData({...userData, darkMode: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-redbull-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-redbull-blue"></div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;