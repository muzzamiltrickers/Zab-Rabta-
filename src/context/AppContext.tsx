import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  MedicineReminder,
  HIVCenter,
  District,
  Camp,
  AwarenessArticle,
  AppSettings,
  ScreenId,
} from '../types';
import { storageService } from '../services/storage';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  reminders: MedicineReminder[];
  centers: HIVCenter[];
  districts: District[];
  camps: Camp[];
  articles: AwarenessArticle[];
  settings: AppSettings;
  currentScreen: ScreenId;
  previousScreen: ScreenId | null;
  selectedDistrict: string | null;
  selectedArticleId: string | null;
  isDrawerOpen: boolean;
  isMobileFrame: boolean;
  toastMessage: string | null;
  navigateTo: (screen: ScreenId, extra?: { district?: string; articleId?: string }) => void;
  goBack: () => void;
  setIsDrawerOpen: (open: boolean) => void;
  toggleMobileFrame: () => void;
  showToast: (message: string) => void;

  // Auth actions
  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (name: string, email: string) => void;
  deleteAccount: () => void;

  // Medicine Reminders
  addReminder: (reminder: Omit<MedicineReminder, 'reminderId' | 'userId' | 'createdAt'>) => void;
  updateReminder: (reminder: MedicineReminder) => void;
  deleteReminder: (reminderId: string) => void;
  toggleReminderTaken: (reminderId: string) => void;
  triggerSoundAlert: (medicineName: string) => void;

  // Admin actions
  addCenter: (center: Omit<HIVCenter, 'centerId'>) => void;
  updateCenter: (center: HIVCenter) => void;
  deleteCenter: (centerId: string) => void;

  updateDistrictCoordinator: (districtId: string, coordinatorContact: string, description?: string) => void;

  addCamp: (camp: Omit<Camp, 'campId'>) => void;
  updateCamp: (camp: Camp) => void;
  deleteCamp: (campId: string) => void;

  updateSettings: (settings: Partial<AppSettings>) => void;
  addArticle: (article: Omit<AwarenessArticle, 'articleId'>) => void;
  updateArticle: (article: AwarenessArticle) => void;
  deleteArticle: (articleId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => storageService.getCurrentUser());
  const [users, setUsers] = useState<User[]>(() => storageService.getUsers());
  const [reminders, setReminders] = useState<MedicineReminder[]>([]);
  const [centers, setCenters] = useState<HIVCenter[]>(() => storageService.getCenters());
  const [districts, setDistricts] = useState<District[]>(() => storageService.getDistricts());
  const [camps, setCamps] = useState<Camp[]>(() => storageService.getCamps());
  const [articles, setArticles] = useState<AwarenessArticle[]>(() => storageService.getAwareness());
  const [settings, setSettings] = useState<AppSettings>(() => storageService.getSettings());

  const [currentScreen, setCurrentScreen] = useState<ScreenId>('splash');
  const [previousScreen, setPreviousScreen] = useState<ScreenId | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileFrame, setIsMobileFrame] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load reminders when user changes
  useEffect(() => {
    if (currentUser) {
      const userReminders = storageService.getUserReminders(currentUser.userId);
      setReminders(userReminders);
    } else {
      setReminders([]);
    }
  }, [currentUser]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const navigateTo = (screen: ScreenId, extra?: { district?: string; articleId?: string }) => {
    setPreviousScreen(currentScreen);
    if (extra?.district) setSelectedDistrict(extra.district);
    if (extra?.articleId) setSelectedArticleId(extra.articleId);
    setCurrentScreen(screen);
    setIsDrawerOpen(false);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (previousScreen) {
      setCurrentScreen(previousScreen);
    } else {
      setCurrentScreen('home');
    }
    setIsDrawerOpen(false);
  };

  const toggleMobileFrame = () => {
    setIsMobileFrame((prev) => !prev);
  };

  // --- Auth Handlers ---
  const login = async (email: string): Promise<{ success: boolean; message?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      setCurrentUser(existing);
      storageService.setCurrentUser(existing);
      showToast(`Welcome back, ${existing.name}!`);
      return { success: true };
    }

    // Auto support admin credentials test
    if (cleanEmail === 'admin@zabrabta.org') {
      const adminUser: User = {
        userId: 'admin-001',
        name: 'ZAB-Rabta Administrator',
        email: 'admin@zabrabta.org',
        role: 'admin',
        createdAt: new Date().toISOString(),
      };
      const updated = [...users, adminUser];
      setUsers(updated);
      storageService.saveUsers(updated);
      setCurrentUser(adminUser);
      storageService.setCurrentUser(adminUser);
      showToast('Welcome, Administrator!');
      return { success: true };
    }

    return { success: false, message: 'No account found with this email. Please Sign Up.' };
  };

  const register = async (name: string, email: string): Promise<{ success: boolean; message?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanName || !cleanEmail) {
      return { success: false, message: 'Please fill in all required fields.' };
    }

    const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, message: 'An account with this email already exists. Please Log in.' };
    }

    const newUser: User = {
      userId: `user-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      role: 'user', // Default is always user
      createdAt: new Date().toISOString(),
    };

    const updated = [...users, newUser];
    setUsers(updated);
    storageService.saveUsers(updated);
    setCurrentUser(newUser);
    storageService.setCurrentUser(newUser);
    showToast(`Account created successfully! Welcome, ${cleanName}.`);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    storageService.setCurrentUser(null);
    setReminders([]);
    showToast('Logged out securely.');
    navigateTo('splash');
  };

  const updateProfile = (name: string, email: string) => {
    if (!currentUser) return;
    const updatedUser: User = {
      ...currentUser,
      name: name.trim() || currentUser.name,
      email: email.trim().toLowerCase() || currentUser.email,
    };
    setCurrentUser(updatedUser);
    storageService.setCurrentUser(updatedUser);

    const allUsers = users.map((u) => (u.userId === updatedUser.userId ? updatedUser : u));
    setUsers(allUsers);
    storageService.saveUsers(allUsers);
    showToast('Profile updated.');
  };

  const deleteAccount = () => {
    if (!currentUser) return;
    const uid = currentUser.userId;
    // Wipe strictly all private reminders
    storageService.deleteAllUserReminders(uid);
    // Remove user
    const remaining = users.filter((u) => u.userId !== uid);
    setUsers(remaining);
    storageService.saveUsers(remaining);
    setCurrentUser(null);
    storageService.setCurrentUser(null);
    setReminders([]);
    showToast('Your account and private data have been completely deleted.');
    navigateTo('splash');
  };

  // --- Medicine Reminders (Private) ---
  const addReminder = (data: Omit<MedicineReminder, 'reminderId' | 'userId' | 'createdAt'>) => {
    if (!currentUser) return;
    const newReminder: MedicineReminder = {
      ...data,
      reminderId: `rem-${Date.now()}`,
      userId: currentUser.userId,
      createdAt: new Date().toISOString(),
      takenToday: false,
    };
    const saved = storageService.saveUserReminder(newReminder);
    setReminders((prev) => [saved, ...prev]);
    showToast('Medicine reminder created securely.');
  };

  const updateReminder = (reminder: MedicineReminder) => {
    if (!currentUser || reminder.userId !== currentUser.userId) return;
    const saved = storageService.saveUserReminder(reminder);
    setReminders((prev) => prev.map((r) => (r.reminderId === reminder.reminderId ? saved : r)));
    showToast('Reminder schedule updated.');
  };

  const deleteReminder = (reminderId: string) => {
    if (!currentUser) return;
    storageService.deleteUserReminder(reminderId, currentUser.userId);
    setReminders((prev) => prev.filter((r) => r.reminderId !== reminderId));
    showToast('Reminder deleted.');
  };

  const toggleReminderTaken = (reminderId: string) => {
    if (!currentUser) return;
    const target = reminders.find((r) => r.reminderId === reminderId);
    if (!target) return;
    const updated: MedicineReminder = {
      ...target,
      takenToday: !target.takenToday,
      lastTakenDate: !target.takenToday ? new Date().toISOString() : target.lastTakenDate,
    };
    const saved = storageService.saveUserReminder(updated);
    setReminders((prev) => prev.map((r) => (r.reminderId === reminderId ? saved : r)));
    showToast(updated.takenToday ? 'Marked as taken! Good adherence.' : 'Marked as pending.');
  };

  const triggerSoundAlert = (medicineName: string) => {
    // Play synthetic chime via Web Audio API
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch {
      // AudioContext fallback
    }

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('ZAB-Rabta Medicine Reminder', {
        body: `It is time for your prescribed ${medicineName}. Stay healthy and keep up your daily adherence.`,
        icon: '/favicon.ico',
      });
    }

    showToast(`🔔 Reminder Alert: Time for "${medicineName}"!`);
  };

  // --- Admin: Centers ---
  const addCenter = (centerData: Omit<HIVCenter, 'centerId'>) => {
    const newCenter: HIVCenter = {
      ...centerData,
      centerId: `center-${Date.now()}`,
    };
    const updated = [newCenter, ...centers];
    setCenters(updated);
    storageService.saveCenters(updated);
    showToast('Health center added successfully.');
  };

  const updateCenter = (center: HIVCenter) => {
    const updated = centers.map((c) => (c.centerId === center.centerId ? center : c));
    setCenters(updated);
    storageService.saveCenters(updated);
    showToast('Health center updated.');
  };

  const deleteCenter = (centerId: string) => {
    const updated = centers.filter((c) => c.centerId !== centerId);
    setCenters(updated);
    storageService.saveCenters(updated);
    showToast('Health center removed.');
  };

  // --- Admin: Districts ---
  const updateDistrictCoordinator = (districtId: string, coordinatorContact: string, description?: string) => {
    const updated = districts.map((d) =>
      d.districtId === districtId
        ? {
            ...d,
            coordinatorContact: coordinatorContact.trim() || 'Coming Soon',
            description: description !== undefined ? description : d.description,
          }
        : d
    );
    setDistricts(updated);
    storageService.saveDistricts(updated);
    showToast('District details updated.');
  };

  // --- Admin: Camps ---
  const addCamp = (campData: Omit<Camp, 'campId'>) => {
    const newCamp: Camp = {
      ...campData,
      campId: `camp-${Date.now()}`,
    };
    const updated = [newCamp, ...camps];
    setCamps(updated);
    storageService.saveCamps(updated);
    showToast('Awareness camp post created.');
  };

  const updateCamp = (camp: Camp) => {
    const updated = camps.map((c) => (c.campId === camp.campId ? camp : c));
    setCamps(updated);
    storageService.saveCamps(updated);
    showToast('Camp post updated.');
  };

  const deleteCamp = (campId: string) => {
    const updated = camps.filter((c) => c.campId !== campId);
    setCamps(updated);
    storageService.saveCamps(updated);
    showToast('Camp post deleted.');
  };

  // --- Admin: Settings ---
  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    storageService.saveSettings(updated);
    showToast('Application settings updated.');
  };

  // --- Admin: Awareness Articles ---
  const addArticle = (data: Omit<AwarenessArticle, 'articleId'>) => {
    const newArt: AwarenessArticle = {
      ...data,
      articleId: `art-${Date.now()}`,
    };
    const updated = [newArt, ...articles];
    setArticles(updated);
    storageService.saveAwareness(updated);
    showToast('Educational article added.');
  };

  const updateArticle = (article: AwarenessArticle) => {
    const updated = articles.map((a) => (a.articleId === article.articleId ? article : a));
    setArticles(updated);
    storageService.saveAwareness(updated);
    showToast('Article content updated.');
  };

  const deleteArticle = (articleId: string) => {
    const updated = articles.filter((a) => a.articleId !== articleId);
    setArticles(updated);
    storageService.saveAwareness(updated);
    showToast('Article removed.');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        reminders,
        centers,
        districts,
        camps,
        articles,
        settings,
        currentScreen,
        previousScreen,
        selectedDistrict,
        selectedArticleId,
        isDrawerOpen,
        isMobileFrame,
        toastMessage,
        navigateTo,
        goBack,
        setIsDrawerOpen,
        toggleMobileFrame,
        showToast,
        login,
        register,
        logout,
        updateProfile,
        deleteAccount,
        addReminder,
        updateReminder,
        deleteReminder,
        toggleReminderTaken,
        triggerSoundAlert,
        addCenter,
        updateCenter,
        deleteCenter,
        updateDistrictCoordinator,
        addCamp,
        updateCamp,
        deleteCamp,
        updateSettings,
        addArticle,
        updateArticle,
        deleteArticle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
