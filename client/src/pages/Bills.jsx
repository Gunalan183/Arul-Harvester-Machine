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
    return <div className="text-center py-20 text-xl">{t('loading')}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white no-print">
        {t('bills')}
      </h1>

      <div className="mb-6 no-print">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder={t('search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-3 border rounded-lg dark:bg-gray-700 text-lg"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-4 py-3 border rounded-lg dark:bg-gray-700 text-lg"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-4 py-3 border rounded-lg dark:bg-gray-700 text-lg"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto no-print">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">{t('billNumber')}</th>
              <th className="px-6 py-3 text-left">{t('date')}</th>
              <th className="px-6 py-3 text-left">{t('customerName')}</th>
              <th className="px-6 py-3 text-left">{t('totalAmount')}</th>
              <th className="px-6 py-3 text-left">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill._id} className="border-t dark:border-gray-700">
                <td className="px-6 py-4">{bill.billNumber}</td>
                <td className="px-6 py-4">{new Date(bill.date).toLocaleDateString()}</td>
                <td className="px-6 py-4">{bill.customer?.name}</td>
                <td className="px-6 py-4">₹{bill.totalAmount.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handlePrint(bill)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    {t('print')}
                  </button>
                  <button
                    onClick={() => handleDelete(bill._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    {t('delete')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedBill && <BillPrint bill={selectedBill} />}
    </div>
  );
};

export default Bills;
