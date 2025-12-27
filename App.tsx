
import React, { useState, useEffect, createContext, useContext } from 'react';
import LandingPage from './views/LandingPage';
import Dashboard from './views/Dashboard';
import LoginPage from './views/LoginPage';
import { User } from './types';

type View = 'landing' | 'login' | 'dashboard';

interface AppContextType {
  view: View;
  setView: (view: View) => void;
  isAuthenticated: boolean;
  currentUser: User;
  loginWithIdentity: (name: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User>({
    name: 'Ghost Operator',
    wallet: '0x0000...0000',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ghost'
  });

  useEffect(() => {
    const token = sessionStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('current_user');
    if (token && storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
      setView('dashboard');
    }
  }, []);

  const loginWithIdentity = (name: string) => {
    const identity: User = {
      name: name,
      wallet: '0x' + Math.random().toString(16).substr(2, 8) + '...' + Math.random().toString(16).substr(2, 4),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      email: `${name.toLowerCase().replace(' ', '.')}@guardian.io`
    };
    
    sessionStorage.setItem('auth_token', 'qie_guardian_jwt_' + Math.random().toString(36).substr(2));
    localStorage.setItem('current_user', JSON.stringify(identity));
    
    setCurrentUser(identity);
    setIsAuthenticated(true);
    setView('dashboard');
  };

  const logout = () => {
    sessionStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    setIsAuthenticated(false);
    setView('landing');
  };

  const renderView = () => {
    if (view === 'landing') return <LandingPage />;
    if (view === 'login') return <LoginPage />;
    if (view === 'dashboard') return <Dashboard />;
    return <LandingPage />;
  };

  return (
    <AppContext.Provider value={{ view, setView, isAuthenticated, currentUser, loginWithIdentity, logout }}>
      <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-950">
        {renderView()}
      </div>
    </AppContext.Provider>
  );
};

export default App;
