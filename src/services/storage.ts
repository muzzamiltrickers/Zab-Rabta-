import {
  User,
  MedicineReminder,
  HIVCenter,
  District,
  Camp,
  AwarenessArticle,
  AppSettings,
} from '../types';
import {
  INITIAL_SETTINGS,
  INITIAL_CENTERS,
  INITIAL_DISTRICTS,
  INITIAL_CAMPS,
  INITIAL_AWARENESS,
} from '../data/initialData';

const STORAGE_KEYS = {
  USERS: 'zab_rabta_users_v1',
  CURRENT_USER: 'zab_rabta_current_user_v1',
  REMINDERS: 'zab_rabta_medicine_reminders_v1',
  CENTERS: 'zab_rabta_centers_v1',
  DISTRICTS: 'zab_rabta_districts_v1',
  CAMPS: 'zab_rabta_camps_v1',
  AWARENESS: 'zab_rabta_awareness_v1',
  SETTINGS: 'zab_rabta_settings_v1',
};

// Seed default admin account
const DEFAULT_ADMIN: User = {
  userId: 'admin-001',
  name: 'ZAB-Rabta Administrator',
  email: 'admin@zabrabta.org',
  role: 'admin',
  createdAt: new Date().toISOString(),
};

// Seed sample demo citizen user for instant test drive
const DEFAULT_USER: User = {
  userId: 'user-001',
  name: 'Karachi Community Member',
  email: 'citizen@zabrabta.org',
  role: 'user',
  createdAt: new Date().toISOString(),
};

export const storageService = {
  // --- USERS & AUTH ---
  getUsers(): User[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      if (!data) {
        const initial = [DEFAULT_ADMIN, DEFAULT_USER];
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(data);
    } catch {
      return [DEFAULT_ADMIN, DEFAULT_USER];
    }
  },

  saveUsers(users: User[]) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  getCurrentUser(): User | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (!data) return null;
      return JSON.parse(data);
    } catch {
      return null;
    }
  },

  setCurrentUser(user: User | null) {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },

  // --- MEDICINE REMINDERS (Strictly Private per User) ---
  getUserReminders(userId: string): MedicineReminder[] {
    if (!userId) return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REMINDERS);
      if (!data) {
        // Seed initial sample reminder only for the demo citizen user
        if (userId === 'user-001') {
          const sample: MedicineReminder[] = [
            {
              reminderId: 'rem-1',
              userId: 'user-001',
              medicineName: 'Doctor-Prescribed Multivitamin / Mineral',
              time: '09:00',
              frequency: 'Once Daily',
              startDate: new Date().toISOString().split('T')[0],
              notes: 'Take with morning breakfast and water as advised by doctor.',
              takenToday: true,
              createdAt: new Date().toISOString(),
            },
            {
              reminderId: 'rem-2',
              userId: 'user-001',
              medicineName: 'Prescribed Routine Health Tablet',
              time: '21:00',
              frequency: 'Once Daily',
              startDate: new Date().toISOString().split('T')[0],
              notes: 'Evening post-dinner dose. Do not skip.',
              takenToday: false,
              createdAt: new Date().toISOString(),
            },
          ];
          localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(sample));
          return sample;
        }
        return [];
      }
      const all: MedicineReminder[] = JSON.parse(data);
      // Strictly filter ONLY reminders belonging to this authenticated user
      return all.filter((r) => r.userId === userId);
    } catch {
      return [];
    }
  },

  saveUserReminder(reminder: MedicineReminder): MedicineReminder {
    const data = localStorage.getItem(STORAGE_KEYS.REMINDERS);
    let all: MedicineReminder[] = data ? JSON.parse(data) : [];
    const index = all.findIndex((r) => r.reminderId === reminder.reminderId);
    if (index >= 0) {
      all[index] = reminder;
    } else {
      all.unshift(reminder);
    }
    localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(all));
    return reminder;
  },

  deleteUserReminder(reminderId: string, userId: string) {
    const data = localStorage.getItem(STORAGE_KEYS.REMINDERS);
    if (!data) return;
    let all: MedicineReminder[] = JSON.parse(data);
    // Only delete if it belongs to this user
    all = all.filter((r) => !(r.reminderId === reminderId && r.userId === userId));
    localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(all));
  },

  deleteAllUserReminders(userId: string) {
    const data = localStorage.getItem(STORAGE_KEYS.REMINDERS);
    if (!data) return;
    let all: MedicineReminder[] = JSON.parse(data);
    all = all.filter((r) => r.userId !== userId);
    localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(all));
  },

  // --- HIV CENTERS (Admin Editable) ---
  getCenters(): HIVCenter[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CENTERS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.CENTERS, JSON.stringify(INITIAL_CENTERS));
        return INITIAL_CENTERS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_CENTERS;
    }
  },

  saveCenters(centers: HIVCenter[]) {
    localStorage.setItem(STORAGE_KEYS.CENTERS, JSON.stringify(centers));
  },

  // --- KARACHI DISTRICTS (Admin Editable Coordinator Contact) ---
  getDistricts(): District[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DISTRICTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.DISTRICTS, JSON.stringify(INITIAL_DISTRICTS));
        return INITIAL_DISTRICTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_DISTRICTS;
    }
  },

  saveDistricts(districts: District[]) {
    localStorage.setItem(STORAGE_KEYS.DISTRICTS, JSON.stringify(districts));
  },

  // --- CAMPS (Admin Editable) ---
  getCamps(): Camp[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CAMPS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.CAMPS, JSON.stringify(INITIAL_CAMPS));
        return INITIAL_CAMPS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_CAMPS;
    }
  },

  saveCamps(camps: Camp[]) {
    localStorage.setItem(STORAGE_KEYS.CAMPS, JSON.stringify(camps));
  },

  // --- AWARENESS ARTICLES (Admin Editable) ---
  getAwareness(): AwarenessArticle[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AWARENESS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.AWARENESS, JSON.stringify(INITIAL_AWARENESS));
        return INITIAL_AWARENESS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_AWARENESS;
    }
  },

  saveAwareness(articles: AwarenessArticle[]) {
    localStorage.setItem(STORAGE_KEYS.AWARENESS, JSON.stringify(articles));
  },

  // --- APP SETTINGS (Admin Editable) ---
  getSettings(): AppSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
        return INITIAL_SETTINGS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_SETTINGS;
    }
  },

  saveSettings(settings: AppSettings) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },
};
