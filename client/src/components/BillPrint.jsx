import { useTranslation } from 'react-i18next';

const BillPrint = ({ bill }) => {
  const { t } = useTranslation();
  
  if (!bill) return null;

  return (
    <div className="print-only p-8 bg-white text-black">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">{t('appTitle')}</h1>
        <p className="text-lg mt-2">Paddy Harvesting Service</p>
      </div>
      
      <div className="border-2 border-black p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>{t('billNumber')}:</strong> {bill.billNumber}
          </div>
          <div>
            <strong>{t('date')}:</strong> {new Date(bill.date).toLocaleDateString()}
          </div>
        </div>
        
        <div className="mb-4">
          <strong>{t('customerName')}:</strong> {bill.customer?.name}
        </div>
        <div className="mb-4">
          <strong>{t('village')}:</strong> {bill.customer?.village}
        </div>
        <div className="mb-4">
          <strong>{t('phone')}:</strong> {bill.customer?.phone}
        </div>
        
        <hr className="my-4 border-black" />
        
        <div className="grid grid-cols-2 gap-4">
          <div><strong>{t('acres')}:</strong> {bill.acres}</div>
          <div><strong>{t('startTime')}:</strong> {bill.startTime}</div>
          <div><strong>{t('endTime')}:</strong> {bill.endTime}</div>
          <div><strong>{t('totalMinutes')}:</strong> {bill.totalMinutes}</div>
          <div><strong>{t('ratePerHour')}:</strong> ₹{bill.ratePerHour}</div>
        </div>
        
        <hr className="my-4 border-black" />
        
        <div className="text-2xl font-bold text-right">
          {t('totalAmount')}: ₹{bill.totalAmount.toFixed(2)}
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p>Thank you for your business!</p>
      </div>
    </div>
  );
};

export default BillPrint;
