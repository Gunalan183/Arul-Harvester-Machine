import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import api from '../utils/api';

const Dashboard = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    todayIncome: 0,
    monthlyIncome: 0,
    totalBills: 0,
    totalCustomers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await api.get('/reports/dashboard');
      setStats(data);
    } catch (error) {
      toast.error(t('error'));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-xl">{t('loading')}</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        {t('welcome')}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-400 to-green-600 p-6 rounded-lg shadow-lg text-white">
          <h3 className="text-lg mb-2">{t('todayIncome')}</h3>
          <p className="text-3xl font-bold">₹{stats.todayIncome.toFixed(2)}</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-lg shadow-lg text-white">
          <h3 className="text-lg mb-2">{t('monthlyIncome')}</h3>
          <p className="text-3xl font-bold">₹{stats.monthlyIncome.toFixed(2)}</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-6 rounded-lg shadow-lg text-white">
          <h3 className="text-lg mb-2">{t('totalBills')}</h3>
          <p className="text-3xl font-bold">{stats.totalBills}</p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-6 rounded-lg shadow-lg text-white">
          <h3 className="text-lg mb-2">{t('totalCustomers')}</h3>
          <p className="text-3xl font-bold">{stats.totalCustomers}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
