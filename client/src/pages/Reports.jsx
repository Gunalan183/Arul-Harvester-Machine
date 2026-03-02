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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        {t('reports')}
      </h1>
      
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setReportType('daily')}
          className={`px-6 py-3 rounded-lg text-lg ${
            reportType === 'daily'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          {t('dailyReport')}
        </button>
        <button
          onClick={() => setReportType('monthly')}
          className={`px-6 py-3 rounded-lg text-lg ${
            reportType === 'monthly'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          {t('monthlyReport')}
        </button>
      </div>

      {reportType === 'daily' ? (
        <div className="mb-6">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-3 border rounded-lg dark:bg-gray-700 text-lg"
          />
        </div>
      ) : (
        <div className="mb-6 flex gap-4">
          <select
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
            className="px-4 py-3 border rounded-lg dark:bg-gray-700 text-lg"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(2000, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="px-4 py-3 border rounded-lg dark:bg-gray-700 text-lg"
          />
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-xl">{t('loading')}</div>
      ) : reportData ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg mb-2">{t('income')}</h3>
              <p className="text-3xl font-bold">₹{reportData.totalIncome.toFixed(2)}</p>
            </div>
            <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg mb-2">{t('billCount')}</h3>
              <p className="text-3xl font-bold">{reportData.billCount}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left">{t('billNumber')}</th>
                  <th className="px-6 py-3 text-left">{t('customerName')}</th>
                  <th className="px-6 py-3 text-left">{t('acres')}</th>
                  <th className="px-6 py-3 text-left">{t('totalAmount')}</th>
                </tr>
              </thead>
              <tbody>
                {reportData.bills.map((bill) => (
                  <tr key={bill._id} className="border-t dark:border-gray-700">
                    <td className="px-6 py-4">{bill.billNumber}</td>
                    <td className="px-6 py-4">{bill.customer?.name}</td>
                    <td className="px-6 py-4">{bill.acres}</td>
                    <td className="px-6 py-4">₹{bill.totalAmount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Reports;
