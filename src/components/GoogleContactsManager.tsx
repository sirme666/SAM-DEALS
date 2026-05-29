import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  Search, 
  MessageSquare, 
  Share2, 
  LogOut, 
  Check, 
  Sparkles, 
  RefreshCw, 
  AlertTriangle, 
  ArrowRight,
  Mail, 
  Phone,
  UserCheck,
  Plus
} from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { initAuth, googleSignIn, logout, getAccessToken } from '../lib/firebaseAuth';
import { User } from 'firebase/auth';

interface GoogleContact {
  resourceName: string;
  etag: string;
  names?: {
    displayName: string;
    familyName?: string;
    givenName?: string;
  }[];
  photos?: {
    url: string;
    primary?: boolean;
  }[];
  phoneNumbers?: {
    value: string;
    type?: string;
    formattedType?: string;
  }[];
  emailAddresses?: {
    value: string;
    type?: string;
  }[];
}

export default function GoogleContactsManager() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [contacts, setContacts] = useState<GoogleContact[]>([]);
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // UI Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  
  // Create Contact form state
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGivenName, setNewGivenName] = useState('');
  const [newFamilyName, setNewFamilyName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    name: string;
    phone: string;
    email: string;
  } | null>(null);

  // Sharing action modal state
  const [selectedContactForShare, setSelectedContactForShare] = useState<GoogleContact | null>(null);
  const [selectedProductId, setSelectedProductId] = useState(PRODUCTS[0]?.id || '');
  const [customReferralNote, setCustomReferralNote] = useState('Check out this amazing deal they currently have on!');

  // Listen to Auth State
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, cachedToken) => {
        setCurrentUser(user);
        setToken(cachedToken);
        setNeedsAuth(false);
        fetchContacts(cachedToken);
      },
      () => {
        setCurrentUser(null);
        setToken(null);
        setNeedsAuth(true);
        setContacts([]);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setErrorText('');
    try {
      const result = await googleSignIn();
      if (result) {
        setToken(result.accessToken);
        setCurrentUser(result.user);
        setNeedsAuth(false);
        fetchContacts(result.accessToken);
      }
    } catch (err: any) {
      console.error('Login failed', err);
      setErrorText('Authentication failed. Please accept Google permissions to view Contacts.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setCurrentUser(null);
      setToken(null);
      setNeedsAuth(true);
      setContacts([]);
      setSuccessMessage('Logged out successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const fetchContacts = async (accessToken: string) => {
    if (!accessToken) return;
    setIsLoadingContacts(true);
    setErrorText('');
    try {
      const response = await fetch(
        'https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers,photos&pageSize=100',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          setErrorText('Insufficient permissions or token expired. Please re-sign in to access Contacts.');
          setNeedsAuth(true);
        } else {
          throw new Error(`Google API returned status ${response.status}`);
        }
        return;
      }

      const data = await response.json();
      setContacts(data.connections || []);
    } catch (err: any) {
      console.error('Fetching contacts failed', err);
      setErrorText('Could not fetch contacts. Make sure you granted People API access.');
    } finally {
      setIsLoadingContacts(false);
    }
  };

  // Create New Contact after user modal confirmation (Explicit User Confirmation mandated by Workspace skill)
  const executeCreateContact = async () => {
    if (!token || !confirmModal) return;
    setIsCreating(true);
    setErrorText('');
    
    const requestBody = {
      names: [
        {
          givenName: confirmModal.name.split(' ')[0] || confirmModal.name,
          familyName: confirmModal.name.split(' ').slice(1).join(' ') || ''
        }
      ],
      phoneNumbers: confirmModal.phone ? [
        {
          value: confirmModal.phone,
          type: 'mobile'
        }
      ] : [],
      emailAddresses: confirmModal.email ? [
        {
          value: confirmModal.email,
          type: 'work'
        }
      ] : []
    };

    try {
      const response = await fetch('https://people.googleapis.com/v1/people:createContact', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Google API status ${response.status}`);
      }

      setSuccessMessage(`Successfully added ${confirmModal.name} to Google Contacts!`);
      // Reset form
      setNewGivenName('');
      setNewFamilyName('');
      setNewPhone('');
      setNewEmail('');
      setShowCreateForm(false);
      setConfirmModal(null);
      
      // Refresh listing
      fetchContacts(token);
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err: any) {
      console.error('Create contact failed', err);
      setErrorText(`Failed to create contact: ${err.message || err}`);
    } finally {
      setIsCreating(false);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGivenName.trim()) {
      setErrorText('Given Name is required');
      return;
    }

    // Trigger explicit confirmation modal
    setConfirmModal({
      isOpen: true,
      name: `${newGivenName.trim()} ${newFamilyName.trim()}`.trim(),
      phone: newPhone.trim(),
      email: newEmail.trim()
    });
  };

  // Filter contacts based on query
  const filteredContacts = contacts.filter((contact) => {
    const nameStr = contact.names?.[0]?.displayName || 'Unnamed Contact';
    const hasPhone = contact.phoneNumbers?.some(p => p.value.includes(searchQuery)) || false;
    const hasEmail = contact.emailAddresses?.some(e => e.value.toLowerCase().includes(searchQuery.toLowerCase())) || false;
    
    return nameStr.toLowerCase().includes(searchQuery.toLowerCase()) || hasPhone || hasEmail;
  });

  const getCleanContactPhone = (contact: GoogleContact): string | null => {
    if (!contact.phoneNumbers || contact.phoneNumbers.length === 0) return null;
    const rawVal = contact.phoneNumbers[0].value;
    // Keep numbers and '+' character only
    let clean = rawVal.replace(/[^0-9]/g, '');
    if (clean.startsWith('07') || clean.startsWith('01')) {
      clean = '254' + clean.substring(1);
    }
    return clean;
  };

  // Launch prefilled Whatsapp referral deal to that contact
  const handleLaunchWhatsAppReferral = (contact: GoogleContact) => {
    const phoneNum = getCleanContactPhone(contact);
    if (!phoneNum) return;
    
    const product = PRODUCTS.find(p => p.id === selectedProductId);
    if (!product) return;

    const nameStr = contact.names?.[0]?.displayName || 'Friend';
    const appUrl = (import.meta as any).env?.APP_URL || window.location.origin;

    const textMessage = `Hello ${nameStr}! 🔌 I came across this amazing tested and certified deal from *SAM DEALS AND SERVICES* inside Ruiru / CBD & thought you would love it:\n\n` +
      `🔥 *${product.title}*\n` +
      `🚀 Condition: ${product.condition}\n` +
      `💎 Price: *KES ${product.priceKes.toLocaleString()}* (Save KES ${(product.originalPriceKes - product.priceKes).toLocaleString()})\n` +
      `🛡️ Warranty: ${product.warranty}\n\n` +
      `💡 _${customReferralNote}_\n\n` +
      `Check out full diagnostic specs and verify yourself: ${appUrl}/#product-${product.id}`;

    window.open(`https://wa.me/${phoneNum}?text=${encodeURIComponent(textMessage)}`, '_blank');
    setSelectedContactForShare(null);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden p-6 md:p-8 space-y-6" id="google-contacts-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-blue-400 fill-current" /> Live CRM Connector
          </div>
          <h3 className="font-sans font-black text-xl text-white tracking-tight">
            Connect Google Contacts & Share Smart Deals 🔌
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Securely lookup your family or friends from your Google Account. Share verified laptops or phone deals instantly with them on WhatsApp, or easily save customers straight to Google Contacts!
          </p>
        </div>

        {/* Auth / Logging Action Button */}
        <div>
          {!needsAuth && currentUser ? (
            <div className="flex items-center gap-3">
              {currentUser.photoURL && (
                <img 
                  src={currentUser.photoURL} 
                  alt={currentUser.displayName || ''} 
                  className="w-8 h-8 rounded-full border border-slate-700"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="text-left hidden sm:block">
                <p className="text-[11px] font-bold text-white max-w-[130px] truncate">{currentUser.displayName || 'Authorized User'}</p>
                <p className="text-[9px] text-slate-500 font-mono truncate max-w-[130px]">{currentUser.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 bg-slate-800 hover:bg-red-500/20 border border-slate-700 hover:border-red-500/30 text-slate-400 hover:text-red-400 rounded-xl transition-all cursor-pointer"
                title="Disconnect Account"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="px-4 py-2 border border-slate-700 hover:border-slate-500 bg-slate-950 text-white hover:bg-slate-900 font-sans text-xs font-semibold rounded-xl flex items-center gap-3 transition-all cursor-pointer shadow-md disabled:opacity-50"
              id="google-signin-btn"
            >
              {isLoggingIn ? (
                <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
              ) : (
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                </svg>
              )}
              Sign-in with Google Contacts
            </button>
          )}
        </div>
      </div>

      {successMessage && (
        <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-2xl text-xs flex items-center gap-2 animate-fade-in font-sans">
          <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
          {successMessage}
        </div>
      )}

      {errorText && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-xs flex items-center gap-2 animate-fade-in font-sans">
          <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
          {errorText}
        </div>
      )}

      {needsAuth ? (
        <div className="border border-dashed border-slate-800 p-8 text-center rounded-2xl bg-slate-950/20 flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 text-lg">
            🔌
          </div>
          <div className="max-w-md space-y-2">
            <h4 className="text-sm font-bold text-slate-200">Google Contacts Listing is Locked</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              We require Google authentication to read your contact labels. Our app never saves or stores your contacts lists, we handle them completely in client-side memory.
            </p>
          </div>
          <button 
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold font-sans rounded-xl transition-all cursor-pointer shadow-md"
          >
            {isLoggingIn ? 'Connecting...' : 'Authorize Google Account'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          
          {/* SEARCH, CREATE PANEL & CONTROLS */}
          <div className="flex flex-col sm:flex-row gap-2 justify-between items-center bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <div className="relative w-full sm:max-w-xs">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                <Search className="w-3.5 h-3.5" />
              </span>
              <input 
                type="text"
                placeholder="Search contact by name or number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-xl pl-9 pr-3 py-1.5 focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>

            <div className="flex gap-2 w-full sm:w-auto justify-end">
              <button 
                onClick={() => fetchContacts(token || '')}
                disabled={isLoadingContacts}
                className="p-1.5 px-3 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-[11px] text-slate-400 hover:text-white flex items-center gap-1.5 font-mono cursor-pointer"
                title="Force Refresh Data"
              >
                <RefreshCw className={`w-3 h-3 ${isLoadingContacts ? 'animate-spin text-blue-400' : ''}`} />
                {isLoadingContacts ? 'Refreshing' : 'Reload'}
              </button>

              <button 
                onClick={() => setShowCreateForm(!showCreateForm)}
                className={`p-1.5 px-3 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer font-sans border ${
                  showCreateForm 
                    ? 'bg-blue-500/10 border-blue-500 text-blue-400' 
                    : 'bg-blue-600 hover:bg-blue-700 border-transparent text-white'
                }`}
              >
                {showCreateForm ? 'Cancel New Contact' : 'Add Contact To Google'}
                <UserPlus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ADD NEW CONTACT EXPANDED PANEL WITH INLINE FORM validation */}
          {showCreateForm && (
            <form onSubmit={handleCreateSubmit} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-4 animate-fade-in text-left">
              <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                <h4 className="text-xs font-bold font-mono tracking-wider text-blue-400 uppercase flex items-center gap-1.5">
                  <UserPlus className="w-4 h-4" />
                  Add Customer / Lead to Google Contacts
                </h4>
                <span className="text-[9px] text-slate-500 font-sans">Saves securely to your connected Google Account</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">First Name (Req)</label>
                  <input 
                    type="text" 
                    required
                    value={newGivenName} 
                    onChange={e => setNewGivenName(e.target.value)}
                    placeholder="Samuel"
                    className="w-full bg-slate-900 border border-slate-850 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-blue-500 font-sans"
                  />
                </div>
                <div className="sm:col-span-1 border-b sm:border-b-0 pb-1 sm:pb-0">
                  <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Last Name</label>
                  <input 
                    type="text" 
                    value={newFamilyName} 
                    onChange={e => setNewFamilyName(e.target.value)}
                    placeholder="Mbindyo"
                    className="w-full bg-slate-900 border border-slate-850 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-blue-500 font-sans"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Phone Number</label>
                  <input 
                    type="text" 
                    value={newPhone} 
                    onChange={e => setNewPhone(e.target.value)}
                    placeholder="0740334579"
                    className="w-full bg-slate-900 border border-slate-850 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Email address</label>
                  <input 
                    type="email" 
                    value={newEmail} 
                    onChange={e => setNewEmail(e.target.value)}
                    placeholder="sammy@gmail.com"
                    className="w-full bg-slate-900 border border-slate-850 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-blue-500 font-sans"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button 
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-400 text-xs rounded-xl font-mono cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  Save to Google Account
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* CONTACT LIST DATA CONTAINER */}
          {isLoadingContacts ? (
            <div className="text-center py-10 space-y-3">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-500 mx-auto" />
              <p className="text-xs text-slate-500 font-mono">Querying people.googleapis.com connections...</p>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="p-10 border border-dashed border-slate-850 text-center rounded-2xl bg-slate-950/10">
              <p className="text-xs text-slate-500 font-mono">No matching contacts found in your Google Account ({contacts.length} total).</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto max-h-[440px] pr-1.5" id="contacts-display-grid">
              {filteredContacts.map((contact) => {
                const nameStr = contact.names?.[0]?.displayName || 'Unnamed Contact';
                const phone = contact.phoneNumbers?.[0]?.value || '';
                const email = contact.emailAddresses?.[0]?.value || '';
                const photoUrl = contact.photos?.[0]?.url || '';
                const usablePhone = getCleanContactPhone(contact);

                return (
                  <div 
                    key={contact.resourceName}
                    className="bg-slate-950 border border-slate-850 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all text-left space-y-4"
                  >
                    <div className="flex gap-3">
                      {photoUrl ? (
                        <img 
                          src={photoUrl} 
                          alt={nameStr} 
                          className="w-10 h-10 rounded-full border border-slate-800 object-cover flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-sm uppercase flex-shrink-0 font-mono">
                          {nameStr.substring(0, 2)}
                        </div>
                      )}

                      <div className="space-y-1 overflow-hidden">
                        <h4 className="font-sans font-bold text-sm text-white truncate max-w-[180px]" title={nameStr}>
                          {nameStr}
                        </h4>
                        
                        {phone && (
                          <div className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                            <Phone className="w-3 h-3 text-slate-500 flex-shrink-0" />
                            <span className="truncate max-w-[160px]">{phone}</span>
                          </div>
                        )}

                        {email && (
                          <div className="text-[10px] text-slate-500 flex items-center gap-1 font-sans">
                            <Mail className="w-3 h-3 text-slate-600 flex-shrink-0" />
                            <span className="truncate max-w-[160px] text-slate-400" title={email}>{email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Shared Referral Deal button */}
                    <div className="pt-2 border-t border-slate-900 flex justify-end">
                      {usablePhone ? (
                        <button
                          onClick={() => setSelectedContactForShare(contact)}
                          className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-black rounded-xl text-[10.5px] font-bold font-sans flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          Share Hot Deal
                        </button>
                      ) : (
                        <span className="text-[9.5px] text-slate-600 italic font-sans flex items-center gap-1">
                          No WhatsApp Number
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* COMPONENT MODAL: REFERRAL SHARE MODAL SELECTOR */}
      {selectedContactForShare && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative text-left">
            <h4 className="font-sans font-bold text-base text-white flex items-center gap-2">
              <Share2 className="w-5 h-5 text-blue-400 animate-pulse" />
              Configure Deal to Share with {selectedContactForShare.names?.[0]?.displayName || 'Friend'}
            </h4>

            <p className="text-xs text-slate-400">
              Select any verified electronics item from SAM DEALS catalog. We'll pre-fill a personalized WhatsApp Web link targeting their contact number <strong className="font-mono text-white text-[11px] bg-slate-950 p-1 px-1.5 rounded border border-slate-800">+{getCleanContactPhone(selectedContactForShare)}</strong>.
            </p>

            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">1. Choose SAM DEALS Product</label>
                <select 
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  {PRODUCTS.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.title} (KES {p.priceKes.toLocaleString()}) - {p.condition}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">2. Customized Note</label>
                <input 
                  type="text"
                  value={customReferralNote}
                  onChange={(e) => setCustomReferralNote(e.target.value)}
                  placeholder="e.g. This comes highly tested with a full 1yr local warranty!"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-sans"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2 border-t border-slate-800">
              <button 
                onClick={() => setSelectedContactForShare(null)}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-slate-400 font-mono cursor-pointer"
              >
                Close
              </button>
              <button 
                onClick={() => handleLaunchWhatsAppReferral(selectedContactForShare)}
                className="px-5 py-2 bg-green-600 hover:bg-green-700 font-bold rounded-xl text-xs text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
              >
                Launch Trade referral via WhatsApp
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMPONENT MODAL: EXPLICIT CONFIRMATION FOR CONTACT CREATION (Workspace Mandate) */}
      {confirmModal?.isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-950 border-2 border-blue-500/30 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative text-left">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center text-lg animate-pulse mb-1">
              <UserCheck className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h4 className="font-sans font-black text-base text-white">Save Contact to Google Account?</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                You are about to save the following client connection data directly into your connected Google Contacts account:
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-850 rounded-2xl p-3.5 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-mono text-[10px] uppercase">Name:</span>
                <strong className="text-white font-sans">{confirmModal.name}</strong>
              </div>
              {confirmModal.phone && (
                <div className="flex justify-between">
                  <span className="text-slate-500 font-mono text-[10px] uppercase">Phone:</span>
                  <strong className="text-white font-mono">{confirmModal.phone}</strong>
                </div>
              )}
              {confirmModal.email && (
                <div className="flex justify-between">
                  <span className="text-slate-500 font-mono text-[10px] uppercase">Email:</span>
                  <strong className="text-white font-sans">{confirmModal.email}</strong>
                </div>
              )}
            </div>

            <p className="text-[10px] text-slate-500 font-mono">
              * This is a live write operation requesting contact authorization.
            </p>

            <div className="flex gap-2 justify-end pt-2">
              <button 
                type="button"
                disabled={isCreating}
                onClick={() => setConfirmModal(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-850 rounded-xl text-xs text-slate-400 font-mono cursor-pointer"
              >
                No, Go Back
              </button>
              <button 
                type="button"
                disabled={isCreating}
                onClick={executeCreateContact}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 font-bold rounded-xl text-xs text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md disabled:opacity-50"
              >
                {isCreating ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                {isCreating ? 'Saving' : 'Yes, Save Contact'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
