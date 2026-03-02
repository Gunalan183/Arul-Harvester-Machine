import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ta' ? 'en' : 'ta';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: t('dashboard'), icon: '📊' },
    { path: '/customers', label: t('customers'), icon: '👥' },
    { path: '/create-bill', label: t('createBill'), icon: '📝' },
    { path: '/bills', label: t('bills'), icon: '📋' },
    { path: '/reports', label: t('reports'), icon: '📈' },
  ];

  return (
    <nav className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 shadow-xl no-print sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-white p-2 rounded-lg shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-3xl">🚜</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-white">{t('appTitle')}</h1>
              <p className="text-xs text-emerald-100">Harvester Billing System</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isActive(link.path)
                    ? 'bg-white text-emerald-600 shadow-lg font-semibold'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <span>{link.icon}</span>
                <span className="text-sm">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50 transition font-semibold shadow-md"
            >
              {i18n.language === 'ta' ? '🇬🇧 English' : '🇮🇳 தமிழ்'}
            </button>
            
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md"
            >
              <span>🚪</span>
              <span>{t('logout')}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(link.path)
                    ? 'bg-white text-emerald-600 shadow-lg font-semibold'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <span className="text-xl">🚪</span>
              <span>{t('logout')}</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
