import { createContext, useContext, useState, type ReactNode } from 'react';
import type { GameSettings } from '../types';

interface SettingsContextType extends GameSettings {
  toggleCardinalDirections: () => void;
  toggleSound: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<GameSettings>({
    useCardinalDirections: false,
    soundEnabled: true,
  });

  const toggleCardinalDirections = () => {
    setSettings(prev => ({ ...prev, useCardinalDirections: !prev.useCardinalDirections }));
  };

  const toggleSound = () => {
    setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  return (
    <SettingsContext.Provider value={{ ...settings, toggleCardinalDirections, toggleSound }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
