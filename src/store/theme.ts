import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Theme = 'light' | 'dark';
type AccentPreset = 'default' | 'cyan-pulse' | 'indigo-lime' | 'ruby-slate';

interface ThemeState {
  theme: Theme;
  accentPreset: AccentPreset;
  setTheme: (theme: Theme) => void;
  setAccentPreset: (preset: AccentPreset) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      accentPreset: 'default',
      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme, get().accentPreset);
      },
      setAccentPreset: (preset) => {
        set({ accentPreset: preset });
        applyTheme(get().theme, preset);
      },
      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        get().setTheme(newTheme);
      },
    }),
    {
      name: 'skillverse-theme',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme, state.accentPreset);
        }
      },
    }
  )
);

function applyTheme(theme: Theme, accent: AccentPreset) {
  const html = document.documentElement;
  
  // Remove existing theme attributes
  html.removeAttribute('data-theme');
  html.removeAttribute('data-accent');
  
  // Apply new theme
  if (theme === 'dark') {
    html.setAttribute('data-theme', 'dark');
  }
  
  if (accent !== 'default') {
    html.setAttribute('data-accent', accent);
  }
}

// Initialize theme on module load
if (typeof window !== 'undefined') {
  // Check for system preference on first load
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const stored = localStorage.getItem('skillverse-theme');
  
  if (!stored && prefersDark) {
    useThemeStore.getState().setTheme('dark');
  }
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const stored = localStorage.getItem('skillverse-theme');
    if (!stored) {
      useThemeStore.getState().setTheme(e.matches ? 'dark' : 'light');
    }
  });
}