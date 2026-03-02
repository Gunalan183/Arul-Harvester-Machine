import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import api from '../utils/api';
import BillPrint from '../components/BillPrint';

const Bills = () => {
  const { t } = useTranslation();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedBill, setSelectedBill] = useState(null);

  useEffect(() => {
    fetchBills();
  }, [search, startDate, endDate]);

  const fetchBills = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      
      const { data } = await api.get('/bills', { params });
      setBills(data);
    } catch (error) {
      toast.error(t('error'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('confirmDelete'))) {
      try {
        await api.delete(`/bills/${id}`);
        toast.success(t('success'));
        fetchBills();
      } catch (error) {
        toast.error(t('error'));
      }
    }
  };

  const handlePrint = (bill) => {
    setSelectedBill(bill);
    setTimeout(() => window.print(), 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-emerald-500 no-print">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <span>📋</span>
          <span>{t('bills')}</span>
        </h1>
        <p className="text-gray-600 mt-1">View and manage all billing records</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 no-print">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder={`${t('search')} by customer...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">🔍</span>
          </div>
          
          <div className="relative">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-5 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">📅</span>
          </div>
          
          <div className="relative">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-5 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">📅</span>
          </div>
        </div>
      </div>

      {/* Bills Grid */}
      <div className="grid grid-cols-1 gap-4 no-print">
        {bills.map((bill) => (
          <div
            key={bill._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-emerald-300"
          >
            <div className="flex flex-col md:flex-row">
              {/* Left Side - Bill Info */}
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">🧾</span>
                      <h3 className="text-2xl font-bold text-gray-800">
                        Bill #{bill.billNumber}
                      </h3>
                    </div>
                    <p className="text-gray-600 flex items-center gap-2">
                      <span>📅</span>
                      <span>{new Date(bill.date).toLocaleDateString()}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">{t('totalAmount')}</p>
                    <p className="text-3xl font-bold text-emerald-600">
                      ₹{bill.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-xl p-3">
                    <p className="text-xs text-gray-600 mb-1">👤 Customer</p>
                    <p className="font-semibold text-gray-800 truncate">{bill.customer?.name}</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-3">
                    <p className="text-xs text-gray-600 mb-1">🌾 Acres</p>
                    <p className="font-semibold text-gray-800">{bill.acres}</p>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-3">
                    <p className="text-xs text-gray-600 mb-1">⏱️ Duration</p>
                    <p className="font-semibold text-gray-800">{bill.totalMinutes} min</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-3">
                    <p className="text-xs text-gray-600 mb-1">💰 Rate/hr</p>
                    <p className="font-semibold text-gray-800">₹{bill.ratePerHour}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handlePrint(bill)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition font-semibold"
                  >
                    <span>🖨️</span>
                    <span>{t('print')}</span>
                  </button>
                  <button
                    onClick={() => handleDelete(bill._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition font-semibold"
                  >
                    <span>🗑️</span>
                    <span>{t('delete')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {bills.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl shadow-lg no-print">
          <span className="text-6xl mb-4 block">📋</span>
          <p className="text-gray-600 text-lg">{t('noBills')}</p>
        </div>
      )}

      {selectedBill && <BillPrint bill={selectedBill} />}
    </div>
  );
};

export default Bills;
