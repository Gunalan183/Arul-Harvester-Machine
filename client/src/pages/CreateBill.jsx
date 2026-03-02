import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import api from '../utils/api';

const CreateBill = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [billNumber, setBillNumber] = useState(0);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    customer: '',
    acres: '',
    startTime: '',
    endTime: '',
    ratePerHour: ''
  });
  const [calculatedAmount, setCalculatedAmount] = useState(0);
  const [calculatedMinutes, setCalculatedMinutes] = useState(0);

  useEffect(() => {
    fetchCustomers();
    fetchNextBillNumber();
  }, []);

  useEffect(() => {
    calculateAmount();
  }, [formData.startTime, formData.endTime, formData.ratePerHour]);

  const fetchCustomers = async () => {
    try {
      const { data } = await api.get('/customers');
      setCustomers(data);
    } catch (error) {
      toast.error(t('error'));
    }
  };

  const fetchNextBillNumber = async () => {
    try {
      const { data } = await api.get('/bills/next-number');
      setBillNumber(data.billNumber);
    } catch (error) {
      toast.error(t('error'));
    }
  };

  const calculateAmount = () => {
    if (formData.startTime && formData.endTime && formData.ratePerHour) {
      const [startHour, startMin] = formData.startTime.split(':').map(Number);
      const [endHour, endMin] = formData.endTime.split(':').map(Number);
      
      const startTotalMin = startHour * 60 + startMin;
      const endTotalMin = endHour * 60 + endMin;
      const totalMinutes = endTotalMin - startTotalMin;
      
      if (totalMinutes > 0) {
        const amount = (totalMinutes / 60) * parseFloat(formData.ratePerHour);
        setCalculatedMinutes(totalMinutes);
        setCalculatedAmount(amount);
      } else {
        setCalculatedMinutes(0);
        setCalculatedAmount(0);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await api.post('/bills', formData);
      toast.success(t('success'));
      navigate('/bills');
    } catch (error) {
      toast.error(error.response?.data?.message || t('error'));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-emerald-500">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <span>📝</span>
          <span>{t('createBill')}</span>
        </h1>
        <p className="text-gray-600 mt-1">Generate new billing record</p>
      </div>

      {/* Bill Number Card */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-100 text-sm mb-1">{t('billNumber')}</p>
            <p className="text-4xl font-bold">#{billNumber}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <span className="text-5xl">🧾</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
              <span>📅</span>
              <span>{t('date')} *</span>
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
              required
            />
          </div>

          {/* Customer */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
              <span>👤</span>
              <span>{t('selectCustomer')} *</span>
            </label>
            <select
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
              required
            >
              <option value="">{t('selectCustomer')}</option>
              {customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name} - {customer.village}
                </option>
              ))}
            </select>
          </div>

          {/* Acres */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
              <span>🌾</span>
              <span>{t('acres')} *</span>
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.acres}
              onChange={(e) => setFormData({ ...formData, acres: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
              placeholder="Enter acres"
              required
            />
          </div>

          {/* Rate per Hour */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
              <span>💰</span>
              <span>{t('ratePerHour')} *</span>
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.ratePerHour}
              onChange={(e) => setFormData({ ...formData, ratePerHour: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
              placeholder="Enter rate"
              required
            />
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
              <span>⏰</span>
              <span>{t('startTime')} *</span>
            </label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
              required
            />
          </div>

          {/* End Time */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
              <span>⏱️</span>
              <span>{t('endTime')} *</span>
            </label>
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
              required
            />
          </div>
        </div>

        {/* Calculation Display */}
        {calculatedAmount > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>🧮</span>
              <span>Auto Calculation</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 shadow">
                <p className="text-sm text-gray-600 mb-1">{t('totalMinutes')}</p>
                <p className="text-3xl font-bold text-blue-600">{calculatedMinutes} min</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow">
                <p className="text-sm text-gray-600 mb-1">{t('totalAmount')}</p>
                <p className="text-3xl font-bold text-emerald-600">₹{calculatedAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition text-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
        >
          <span>💾</span>
          <span>{t('save')}</span>
        </button>
      </form>
    </div>
  );
};

export default CreateBill;
