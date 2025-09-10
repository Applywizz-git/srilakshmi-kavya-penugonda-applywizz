import { motion } from 'framer-motion';
import { personalInfo } from '../data/profile';
import { Button } from './ui/button';
import { useThemeStore } from '../store/theme';
import { Github, Linkedin, Mail, ChevronUp, Palette, Sun, Moon } from 'lucide-react';

const socialLinks = [
  // {
  //   icon: Github,
  //   href: personalInfo.github,
  //   label: 'GitHub',
  //   color: 'hover:text-purple-500'
  // },
  {
    icon: Linkedin,
    href: personalInfo.linkedin,
    label: 'LinkedIn',
    color: 'hover:text-blue-500'
  },
  {
    icon: Mail,
    href: `mailto:${personalInfo.email}`,
    label: 'Email',
    color: 'hover:text-green-500'
  }
];

export default function Footer() {
  const { theme, toggleTheme, accentPreset, setAccentPreset } = useThemeStore();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const accentPresets = [
    { name: 'Default', key: 'default' },
    { name: 'Cyan Pulse', key: 'cyan' },
    { name: 'Indigo Lime', key: 'indigo' },
    { name: 'Ruby Slate', key: 'ruby' }
  ];

  return (
    <footer className="relative bg-background border-t border-border/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand & Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gradient mb-2">
              {personalInfo.name}
            </h3>
            <p className="text-muted-foreground text-sm">
              {personalInfo.title}
            </p>
            <p className="text-muted-foreground text-sm">
              {personalInfo.location}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground transition-all duration-300 ${social.color} hover:scale-110 hover:bg-muted`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>

          {/* Theme Controls */}
          <div className="flex justify-center md:justify-end gap-2">
            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="w-10 h-10 p-0"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            {/* Accent Preset Selector */}
            <div className="relative group">
              <Button
                variant="outline"
                size="sm"
                className="w-10 h-10 p-0"
                aria-label="Change accent color"
              >
                <Palette className="w-4 h-4" />
              </Button>
              
              {/* Dropdown */}
              <div className="absolute bottom-12 right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-background border border-border rounded-lg p-2 shadow-lg min-w-32">
                {accentPresets.map((preset) => (
                  <button
                    key={preset.key}
                    onClick={() => setAccentPreset(preset.key as any)}
                    className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-muted transition-colors ${
                      accentPreset === preset.key ? 'bg-primary text-primary-foreground' : ''
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>
            
            <p className="text-muted-foreground text-sm">
              Built with React, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top FAB */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5 mx-auto" />
      </motion.button>
    </footer>
  );
}