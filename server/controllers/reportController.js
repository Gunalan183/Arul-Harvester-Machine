const Bill = require('../models/Bill');
const Customer = require('../models/Customer');

// Get dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    // Today's income
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayBills = await Bill.find({
      date: { $gte: today, $lt: tomorrow }
    });
    const todayIncome = todayBills.reduce((sum, bill) => sum + bill.totalAmount, 0);

    // Monthly income
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthlyBills = await Bill.find({
      date: { $gte: firstDayOfMonth }
    });
    const monthlyIncome = monthlyBills.reduce((sum, bill) => sum + bill.totalAmount, 0);

    // Total bills and customers
    const totalBills = await Bill.countDocuments();
    const totalCustomers = await Customer.countDocuments();

    res.json({
      todayIncome: Math.round(todayIncome * 100) / 100,
      monthlyIncome: Math.round(monthlyIncome * 100) / 100,
      totalBills,
      totalCustomers
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get daily report
exports.getDailyReport = async (req, res) => {
  try {
    const { date } = req.query;
    const targetDate = date ? new Date(date) : new Date();
    targetDate.setHours(0, 0, 0, 0);
    
    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const bills = await Bill.find({
      date: { $gte: targetDate, $lt: nextDay }
    }).populate('customer').sort({ billNumber: -1 });

    const totalIncome = bills.reduce((sum, bill) => sum + bill.totalAmount, 0);

    res.json({
      date: targetDate,
      bills,
      totalIncome: Math.round(totalIncome * 100) / 100,
      billCount: bills.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get monthly report
exports.getMonthlyReport = async (req, res) => {
  try {
    const { year, month } = req.query;
    const targetYear = year ? parseInt(year) : new Date().getFullYear();
    const targetMonth = month ? parseInt(month) : new Date().getMonth();

    const firstDay = new Date(targetYear, targetMonth, 1);
    const lastDay = new Date(targetYear, targetMonth + 1, 0, 23, 59, 59, 999);

    const bills = await Bill.find({
      date: { $gte: firstDay, $lte: lastDay }
    }).populate('customer').sort({ date: -1 });

    const totalIncome = bills.reduce((sum, bill) => sum + bill.totalAmount, 0);

    // Group by date for chart
    const dailyData = {};
    bills.forEach(bill => {
      const dateKey = bill.date.toISOString().split('T')[0];
      if (!dailyData[dateKey]) {
        dailyData[dateKey] = { date: dateKey, income: 0, count: 0 };
      }
      dailyData[dateKey].income += bill.totalAmount;
      dailyData[dateKey].count += 1;
    });

    const chartData = Object.values(dailyData).sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );

    res.json({
      year: targetYear,
      month: targetMonth,
      bills,
      totalIncome: Math.round(totalIncome * 100) / 100,
      billCount: bills.length,
      chartData
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
