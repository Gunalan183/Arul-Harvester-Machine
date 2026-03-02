import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import api from '../utils/api';

const Customers = () => {
  const { t } = useTranslation();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    village: ''
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data } = await api.get('/customers');
      setCustomers(data);
    } catch (error) {
      toast.error(t('error'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingCustomer) {
        await api.put(`/customers/${editingCustomer._id}`, formData);
        toast.success(t('success'));
      } else {
        await api.post('/customers', formData);
        toast.success(t('success'));
      }
      
      setShowModal(false);
      setFormData({ name: '', phone: '', village: '' });
      setEditingCustomer(null);
      fetchCustomers();
    } catch (error) {
      toast.error(error.response?.data?.message || t('error'));
    }
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      phone: customer.phone || '',
      village: customer.village || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('confirmDelete'))) {
      try {
        await api.delete(`/customers/${id}`);
        toast.success(t('success'));
        fetchCustomers();
      } catch (error) {
        toast.error(t('error'));
      }
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.village?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm)
  );

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
      <div className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-emerald-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <span>👥</span>
              <span>{t('customers')}</span>
            </h1>
            <p className="text-gray-600 mt-1">Manage your customer database</p>
          </div>
          <button
            onClick={() => {
              setEditingCustomer(null);
              setFormData({ name: '', phone: '', village: '' });
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
          >
            <span>➕</span>
            <span>{t('addCustomer')}</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <div className="relative">
          <input
            type="text"
            placeholder={`${t('search')} customers...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">🔍</span>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div
            key={customer._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border-2 border-gray-100 hover:border-emerald-300"
          >
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <span className="text-2xl">👤</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg truncate">{customer.name}</h3>
                  <p className="text-sm text-emerald-100">Customer</p>
                </div>
              </div>
            </div>
            
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-xl">📞</span>
                <span className="text-sm">{customer.phone || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-xl">📍</span>
                <span className="text-sm">{customer.village || 'N/A'}</span>
              </div>
              
              <div className="flex gap-2 pt-3 border-t">
                <button
                  onClick={() => handleEdit(customer)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition font-semibold"
                >
                  <span>✏️</span>
                  <span>{t('edit')}</span>
                </button>
                <button
                  onClick={() => handleDelete(customer._id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition font-semibold"
                >
                  <span>🗑️</span>
                  <span>{t('delete')}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
          <span className="text-6xl mb-4 block">😔</span>
          <p className="text-gray-600 text-lg">{t('noCustomers')}</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl transform transition-all">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span>{editingCustomer ? '✏️' : '➕'}</span>
                <span>{editingCustomer ? t('edit') : t('addCustomer')}</span>
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <span>👤</span>
                  <span>{t('customerName')} *</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <span>📞</span>
                  <span>{t('phone')}</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <span>📍</span>
                  <span>{t('village')}</span>
                </label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition font-bold shadow-lg"
                >
                  {t('save')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingCustomer(null);
                    setFormData({ name: '', phone: '', village: '' });
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl hover:bg-gray-300 transition font-bold"
                >
                  {t('cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
