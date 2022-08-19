const express = require('express');
const donHangModel = require('../models/DonHang.model');

const router = express.Router();

//ERR01 - T2 - Dirty Read
router.get('/:id', async (req, res) => {
    const result = await donHangModel.selectDonHang(req.params.id);
    res.json(result);
});
//ERR05 - T2 - Unrepeatable Read
router.get('/detail/:id', async (req, res) => {
    const result = await donHangModel.selectChiTietDonHang(req.params.id);
    res.json(result);
});
//ERR02 - T1-T2 - Lost Update
router.post('/order', async (req, res) => {
    const {ma_don_hang, ma_sp, sl_mua, gia} = req.body;
    const result = await donHangModel.datDonHang(ma_don_hang, ma_sp, sl_mua, gia);
    res.json(result);
});
//ERR05 - T1 - Unrepeatable Read
router.delete('/:id', async (req, res) => {
    const result = await donHangModel.huyDonHang(req.params.id);
    res.json(result);
});

module.exports = router;