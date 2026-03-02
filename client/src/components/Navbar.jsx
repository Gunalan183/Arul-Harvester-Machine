import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ta' ? 'en' : 'ta';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 dark:bg-gray-800 text-white shadow-lg no-print">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold">
            {t('appTitle')}
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-blue-200 transition">
              {t('dashboard')}
            </Link>
            <Link to="/customers" className="hover:text-blue-200 transition">
              {t('customers')}
            </Link>
            <Link to="/create-bill" className="hover:text-blue-200 transition">
              {t('createBill')}
            </Link>
            <Link to="/bills" className="hover:text-blue-200 transition">
              {t('bills')}
            </Link>
            <Link to="/reports" className="hover:text-blue-200 transition">
              {t('reports')}
            </Link>
            
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 bg-white text-blue-600 rounded hover:bg-blue-50 transition"
            >
              {i18n.language === 'ta' ? 'English' : 'தமிழ்'}
            </button>
            
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition"
            >
              {t('logout')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
