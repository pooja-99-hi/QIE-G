
import React, { useState, useEffect, createContext, useContext } from 'react';
import LandingPage from './views/LandingPage';
import Dashboard from './views/Dashboard';
import LoginPage from './views/LoginPage';
import { MOCK_PERSONAS } from './constants';
import { User } from './types';

type View = 'landing' | 'login' | 'dashboard';

interface AppContextType {
  view: View;
  setView: (view: View) => void;
  isAuthenticated: boolean;
  currentUser: User;
  login: () => void;
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
  const [currentUser, setCurrentUser] = useState<User>(MOCK_PERSONAS[0]);

  useEffect(() => {
    const token = sessionStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('current_user');
    if (token && storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
      setView('dashboard');
    }
  }, []);

  const login = () => {
    // Determine persona based on current rotation
    const lastIndex = parseInt(localStorage.getItem('persona_index') || '0');
    const nextIndex = (lastIndex + 1) % MOCK_PERSONAS.length;
    const persona = MOCK_PERSONAS[nextIndex];
    
    // Simulate professional auth flow
    sessionStorage.setItem('auth_token', 'qie_guardian_secure_jwt_' + Math.random().toString(36).substr(2));
    localStorage.setItem('persona_index', nextIndex.toString());
    localStorage.setItem('current_user', JSON.stringify(persona));
    
    setCurrentUser(persona);
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
    <AppContext.Provider value={{ view, setView, isAuthenticated, currentUser, login, logout }}>
      <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-950">
        {renderView()}
      </div>
    </AppContext.Provider>
  );
};

export default App;
