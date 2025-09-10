import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon, Palette } from 'lucide-react';
import { useThemeStore } from '../store/theme';

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Certification', href: '#certifications' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

const accentPresets = [
  { name: 'Teal', value: 'default' as const },
  { name: 'Cyan Pulse', value: 'cyan-pulse' as const },
  { name: 'Indigo Lime', value: 'indigo-lime' as const },
  { name: 'Ruby Slate', value: 'ruby-slate' as const },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, accentPreset, toggleTheme, setAccentPreset } = useThemeStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Update active section based on scroll position
      const sections = navigation.map(nav => nav.href.slice(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'glass shadow-lg' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="text-xl font-bold text-gradient"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}>
                Sri Lakshmi 
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className={`nav-link ${activeSection === item.href.slice(1) ? 'active' : ''}`}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* Theme Controls */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Accent Preset Selector */}
              <div className="relative group">
                <motion.button
                  className="p-2 rounded-lg glass hover:bg-primary/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Palette className="w-5 h-5" />
                </motion.button>
                
                <div className="absolute right-0 top-full mt-2 w-32 glass rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {accentPresets.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => setAccentPreset(preset.value)}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-primary/10 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        accentPreset === preset.value ? 'text-primary font-medium' : ''
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-lg glass hover:bg-primary/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Switch to ${theme === 'light' ? 'light' : 'dark'} theme`}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </motion.button>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg glass hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed inset-0 z-30 md:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Menu Panel */}
        <motion.div
          className="absolute top-0 right-0 h-full w-80 max-w-full glass shadow-2xl"
          initial={{ x: '100%' }}
          animate={{ x: isOpen ? 0 : '100%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <span className="text-lg font-semibold">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 p-6">
              <nav className="space-y-4">
                {navigation.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                    className={`block py-3 px-4 rounded-lg transition-colors ${
                      activeSection === item.href.slice(1)
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted/50'
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* Theme Controls */}
            <div className="p-6 border-t border-border">
              <div className="space-y-4">
                {/* Accent Presets */}
                <div>
                  <p className="text-sm font-medium mb-2">Color Theme</p>
                  <div className="grid grid-cols-2 gap-2">
                    {accentPresets.map((preset) => (
                      <button
                        key={preset.value}
                        onClick={() => setAccentPreset(preset.value)}
                        className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                          accentPreset === preset.value
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted/50 hover:bg-muted'
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  {theme === 'light' ? (
                    <>
                      <Sun className="w-5 h-5" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}