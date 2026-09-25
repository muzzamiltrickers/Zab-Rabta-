import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Drawer } from './components/Drawer';
import { NotificationModal } from './components/NotificationModal';

import { SplashScreen } from './screens/SplashScreen';
import { AuthScreen } from './screens/AuthScreen';
import { HomeScreen } from './screens/HomeScreen';
import { AwarenessScreen } from './screens/AwarenessScreen';
import { TestingScreen } from './screens/TestingScreen';
import { TreatmentScreen } from './screens/TreatmentScreen';
import { CentersScreen } from './screens/CentersScreen';
import { DistrictsScreen } from './screens/DistrictsScreen';
import { CampsScreen } from './screens/CampsScreen';
import { RemindersScreen } from './screens/RemindersScreen';
import { GetHelpScreen } from './screens/GetHelpScreen';
import { ContactScreen } from './screens/ContactScreen';
import { InstagramScreen } from './screens/InstagramScreen';
import { AccountScreen } from './screens/AccountScreen';
import { PrivacyScreen } from './screens/PrivacyScreen';
import { AdminScreen } from './screens/AdminScreen';

const MainContent: React.FC = () => {
  const { currentScreen, isMobileFrame, toastMessage } = useApp();
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'auth':
        return <AuthScreen />;
      case 'home':
        return <HomeScreen />;
      case 'awareness':
        return <AwarenessScreen />;
      case 'testing':
        return <TestingScreen />;
      case 'treatment':
        return <TreatmentScreen />;
      case 'centers':
        return <CentersScreen />;
      case 'districts':
        return <DistrictsScreen />;
      case 'camps':
        return <CampsScreen />;
      case 'reminders':
        return <RemindersScreen />;
      case 'get_help':
        return <GetHelpScreen />;
      case 'contact':
        return <ContactScreen />;
      case 'instagram':
        return <InstagramScreen />;
      case 'account':
        return <AccountScreen />;
      case 'privacy':
        return <PrivacyScreen />;
      case 'admin':
        return <AdminScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const isSplashScreen = currentScreen === 'splash';

  return (
    <div
      className={`min-h-screen bg-slate-900 flex items-center justify-center font-sans antialiased text-slate-800 ${
        isMobileFrame ? 'p-0 sm:py-6 sm:px-4' : 'p-0'
      }`}
    >
      {/* Mobile Shell Frame */}
      <div
        className={`w-full bg-slate-50 relative flex flex-col overflow-hidden transition-all duration-300 ${
          isMobileFrame
            ? 'max-w-[440px] h-[100dvh] sm:h-[890px] sm:rounded-[42px] sm:shadow-2xl sm:border-[8px] sm:border-slate-800'
            : 'max-w-4xl min-h-screen'
        }`}
      >
        {/* Android Notch / Speaker Bezel (Visible only in desktop preview mode) */}
        {isMobileFrame && (
          <div className="hidden sm:flex absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-slate-800 rounded-b-2xl z-50 items-center justify-center">
            <div className="w-10 h-1 bg-slate-700 rounded-full mb-1" />
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full ml-2 border border-slate-700/60" />
          </div>
        )}

        {/* Global Slide-out Drawer */}
        <Drawer />

        {/* Global Notifications Modal */}
        <NotificationModal isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />

        {/* Global Toast Alert */}
        {toastMessage && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 max-w-[90vw] animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="bg-slate-900/95 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700/80 backdrop-blur-md flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        {/* Top Header Bar */}
        {!isSplashScreen && <Header onOpenNotifications={() => setIsNotifOpen(true)} />}

        {/* Screen Viewport */}
        <main className="flex-1 overflow-y-auto relative no-scrollbar bg-slate-50/60">
          {renderScreen()}
        </main>

        {/* Bottom Navigation */}
        {!isSplashScreen && <BottomNav />}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
