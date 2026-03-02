const Bill = require('../models/Bill');

// Calculate time difference in minutes
const calculateMinutes = (startTime, endTime) => {
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  
  const startTotalMin = startHour * 60 + startMin;
  const endTotalMin = endHour * 60 + endMin;
  
  return endTotalMin - startTotalMin;
};

// Get next bill number
const getNextBillNumber = async () => {
  const lastBill = await Bill.findOne().sort({ billNumber: -1 });
  return lastBill ? lastBill.billNumber + 1 : 1;
};

// Get all bills
exports.getAllBills = async (req, res) => {
  try {
    const { search, startDate, endDate } = req.query;
    let query = {};

    // Date filter
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        query.date.$lte = end;
      }
    }

    const bills = await Bill.find(query)
      .populate('customer')
      .sort({ billNumber: -1 });

    // Search filter (client-side for populated fields)
    let filteredBills = bills;
    if (search) {
      filteredBills = bills.filter(bill => 
        bill.customer.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.json(filteredBills);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get bill by ID
exports.getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id).populate('customer');
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create bill
exports.createBill = async (req, res) => {
  try {
    const { date, customer, acres, startTime, endTime, ratePerHour } = req.body;

    // Calculate total minutes
    const totalMinutes = calculateMinutes(startTime, endTime);
    
    if (totalMinutes <= 0) {
      return res.status(400).json({ message: 'End time must be after start time' });
    }

    // Calculate total amount
    const totalAmount = (totalMinutes / 60) * ratePerHour;

    // Get next bill number
    const billNumber = await getNextBillNumber();

    const bill = new Bill({
      billNumber,
      date,
      customer,
      acres,
      startTime,
      endTime,
      totalMinutes,
      ratePerHour,
      totalAmount: Math.round(totalAmount * 100) / 100 // Round to 2 decimals
    });

    await bill.save();
    const populatedBill = await Bill.findById(bill._id).populate('customer');
    
    res.status(201).json(populatedBill);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete bill
exports.deleteBill = async (req, res) => {
  try {
    const bill = await Bill.findByIdAndDelete(req.params.id);
    
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    res.json({ message: 'Bill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get next bill number (for frontend)
exports.getNextBillNumber = async (req, res) => {
  try {
    const billNumber = await getNextBillNumber();
    res.json({ billNumber });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
