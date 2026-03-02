import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
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
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: t('todayIncome'),
      value: `₹${stats.todayIncome.toFixed(2)}`,
      icon: '💰',
      gradient: 'from-emerald-500 to-teal-600',
      bgPattern: 'bg-emerald-50'
    },
    {
      title: t('monthlyIncome'),
      value: `₹${stats.monthlyIncome.toFixed(2)}`,
      icon: '📊',
      gradient: 'from-blue-500 to-indigo-600',
      bgPattern: 'bg-blue-50'
    },
    {
      title: t('totalBills'),
      value: stats.totalBills,
      icon: '📋',
      gradient: 'from-purple-500 to-pink-600',
      bgPattern: 'bg-purple-50'
    },
    {
      title: t('totalCustomers'),
      value: stats.totalCustomers,
      icon: '👥',
      gradient: 'from-orange-500 to-red-600',
      bgPattern: 'bg-orange-50'
    }
  ];

  const quickActions = [
    { to: '/create-bill', label: t('createBill'), icon: '📝', color: 'emerald' },
    { to: '/customers', label: t('customers'), icon: '👥', color: 'blue' },
    { to: '/bills', label: t('bills'), icon: '📋', color: 'purple' },
    { to: '/reports', label: t('reports'), icon: '📈', color: 'orange' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center bg-white rounded-2xl shadow-xl p-8 border-t-4 border-emerald-500">
        <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          {t('welcome')}
        </h1>
        <p className="text-gray-600 text-lg">Arul Arasan Harvester Billing System</p>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
          <span>📅</span>
          <span>{new Date().toLocaleDateString('ta-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`${card.bgPattern} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden`}
          >
            <div className={`bg-gradient-to-br ${card.gradient} p-6 text-white`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-5xl">{card.icon}</span>
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-sm font-medium opacity-90 mb-2">{card.title}</h3>
              <p className="text-4xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
          <span>⚡</span>
          <span>Quick Actions</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.to}
              className={`group bg-gradient-to-br from-${action.color}-50 to-${action.color}-100 hover:from-${action.color}-100 hover:to-${action.color}-200 p-6 rounded-xl border-2 border-${action.color}-200 hover:border-${action.color}-400 transition-all duration-300 transform hover:scale-105`}
            >
              <div className="text-center">
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{action.icon}</div>
                <p className={`font-semibold text-${action.color}-700 group-hover:text-${action.color}-900`}>
                  {action.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>🎯</span>
            <span>Today's Summary</span>
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <span>Income</span>
              <span className="font-bold">₹{stats.todayIncome.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <span>Status</span>
              <span className="font-bold">Active</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>📈</span>
            <span>Monthly Overview</span>
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <span>Total Income</span>
              <span className="font-bold">₹{stats.monthlyIncome.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <span>Total Bills</span>
              <span className="font-bold">{stats.totalBills}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
