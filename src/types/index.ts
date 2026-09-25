export type UserRole = 'user' | 'admin';

export interface User {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface MedicineReminder {
  reminderId: string;
  userId: string;
  medicineName: string;
  time: string; // e.g. "09:00"
  frequency: string; // "Once Daily", "Twice Daily", "Every 8 Hours", "Custom"
  startDate: string;
  endDate?: string;
  notes?: string;
  takenToday?: boolean;
  lastTakenDate?: string;
  createdAt: string;
}

export interface HIVCenter {
  centerId: string;
  name: string;
  address: string;
  phone: string;
  services: string[];
  openingHours: string;
  district: string;
  latitude: number;
  longitude: number;
  isGovernment?: boolean;
}

export interface District {
  districtId: string;
  name: string;
  coordinatorContact: string; // Default: "Coming Soon"
  description: string;
  focalCenters: string[];
}

export interface Camp {
  campId: string;
  title: string;
  date: string;
  time: string;
  district: string;
  location: string;
  description: string;
  imageUrl: string;
  testingAvailable: boolean;
  contact: string;
  isPast?: boolean;
}

export interface AwarenessArticle {
  articleId: string;
  title: string;
  category: 'general' | 'transmission' | 'prevention' | 'testing' | 'myths' | 'stigma';
  summary: string;
  content: string;
  keyPoints: string[];
  imageUrl?: string;
}

export interface AppSettings {
  appName: string;
  contactNumber: string;
  whatsappNumber: string;
  instagramUrl: string;
  announcement: string;
  tagline: string;
}

export type ScreenId =
  | 'splash'
  | 'auth'
  | 'home'
  | 'awareness'
  | 'testing'
  | 'treatment'
  | 'centers'
  | 'districts'
  | 'camps'
  | 'reminders'
  | 'get_help'
  | 'contact'
  | 'instagram'
  | 'account'
  | 'privacy'
  | 'admin';
