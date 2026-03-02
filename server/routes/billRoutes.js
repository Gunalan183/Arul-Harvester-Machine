const express = require('express');
const router = express.Router();
const billController = require('../controllers/billController');
const auth = require('../middleware/auth');

router.get('/', auth, billController.getAllBills);
router.get('/next-number', auth, billController.getNextBillNumber);
router.get('/:id', auth, billController.getBillById);
router.post('/', auth, billController.createBill);
router.delete('/:id', auth, billController.deleteBill);

module.exports = router;
