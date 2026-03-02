import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import api from '../utils/api';

const Reports = () => {
  const { t } = useTranslation();
  const [reportType, setReportType] = useState('daily');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReport();
  }, [reportType, date, year, month]);

  const fetchReport = async () => {
    setLoading(true);
    try {
      if (reportType === 'daily') {
        const { data } = await api.get('/reports/daily', { params: { date } });
        setReportData(data);
      } else {
        const { data } = await api.get('/reports/monthly', { params: { year, month } });
        setReportData(data);
      }
    } catch (error) {
      toast.error(t('error'));
    } finally {
      setLoading(false);
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-emerald-500">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <span>📈</span>
          <span>{t('reports')}</span>
        </h1>
        <p className="text-gray-600 mt-1">Business analytics and insights</p>
      </div>

      {/* Report Type Selector */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setReportType('daily')}
            className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl transition-all font-bold text-lg ${
              reportType === 'daily'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>📅</span>
            <span>{t('dailyReport')}</span>
          </button>
          <button
            onClick={() => setReportType('monthly')}
            className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl transition-all font-bold text-lg ${
              reportType === 'monthly'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>📊</span>
            <span>{t('monthlyReport')}</span>
          </button>
        </div>

        {/* Date Selectors */}
        {reportType === 'daily' ? (
          <div className="relative">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-5 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none text-lg"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">📅</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <select
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
              className="px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none text-lg"
            >
              {months.map((m, i) => (
                <option key={i} value={i}>{m}</option>
              ))}
            </select>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none text-lg"
            />
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-600"></div>
        </div>
      ) : reportData ? (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl p-8 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-emerald-100 text-sm mb-2">{t('income')}</p>
                  <p className="text-5xl font-bold">₹{reportData.totalIncome.toFixed(2)}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <span className="text-5xl">💰</span>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 mt-4">
                <p className="text-sm text-emerald-100">Total Revenue</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-blue-100 text-sm mb-2">{t('billCount')}</p>
                  <p className="text-5xl font-bold">{reportData.billCount}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <span className="text-5xl">📋</span>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 mt-4">
                <p className="text-sm text-blue-100">Total Bills Generated</p>
              </div>
            </div>
          </div>

          {/* Bills Table */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span>📋</span>
                <span>Detailed Bills</span>
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Bill #</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Acres</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reportData.bills.map((bill) => (
                    <tr key={bill._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-emerald-600">#{bill.billNumber}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span>👤</span>
                          <span className="font-medium">{bill.customer?.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span>🌾</span>
                          <span>{bill.acres}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-emerald-600">₹{bill.totalAmount.toFixed(2)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {reportData.bills.length === 0 && (
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">📋</span>
                <p className="text-gray-600 text-lg">No bills found for this period</p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Reports;
