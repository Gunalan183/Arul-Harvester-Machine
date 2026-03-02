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

  useEffect(() => {
    fetchCustomers();
    fetchNextBillNumber();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await api.post('/bills', formData);
      toast.success(t('success'));
      navigate('/bills');
    } catch (error) {
      toast.error(error.response?.data?.message || t('error'));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        {t('createBill')}
      </h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="mb-4 text-xl font-bold text-blue-600">
          {t('billNumber')}: {billNumber}
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">{t('date')} *</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 text-lg"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2">{t('selectCustomer')} *</label>
            <select
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 text-lg"
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
          
          <div>
            <label className="block mb-2">{t('acres')} *</label>
            <input
              type="number"
              step="0.01"
              value={formData.acres}
              onChange={(e) => setFormData({ ...formData, acres: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 text-lg"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">{t('startTime')} *</label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 text-lg"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2">{t('endTime')} *</label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 text-lg"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block mb-2">{t('ratePerHour')} *</label>
            <input
              type="number"
              step="0.01"
              value={formData.ratePerHour}
              onChange={(e) => setFormData({ ...formData, ratePerHour: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 text-lg"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition text-xl font-semibold"
          >
            {t('save')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBill;
