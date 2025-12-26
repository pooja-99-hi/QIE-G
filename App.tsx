
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
      if (view === 'landing' || view === 'login') {
        setView('dashboard');
      }
    }
  }, []);

  const login = () => {
    // Cycle through personas for demo
    const lastIndex = parseInt(localStorage.getItem('persona_index') || '0');
    const nextIndex = (lastIndex + 1) % MOCK_PERSONAS.length;
    const persona = MOCK_PERSONAS[nextIndex];
    
    sessionStorage.setItem('auth_token', 'demo_jwt_token_' + Date.now());
    localStorage.setItem('demo_visited', 'true');
    localStorage.setItem('persona_index', nextIndex.toString());
    localStorage.setItem('current_user', JSON.stringify(persona));
    
    setCurrentUser(persona);
    setIsAuthenticated(true);
    setView('dashboard');
  };

  const logout = () => {
    sessionStorage.removeItem('auth_token');
    setIsAuthenticated(false);
    setView('landing');
  };

  const renderView = () => {
    switch (view) {
      case 'landing': return <LandingPage />;
      case 'login': return <LoginPage />;
      case 'dashboard': return isAuthenticated ? <Dashboard /> : <LoginPage />;
      default: return <LandingPage />;
    }
  };

  return (
    <AppContext.Provider value={{ view, setView, isAuthenticated, currentUser, login, logout }}>
      <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30">
        {renderView()}
      </div>
    </AppContext.Provider>
  );
};

export default App;
