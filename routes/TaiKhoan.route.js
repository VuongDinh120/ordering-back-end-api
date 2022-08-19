const express = require('express');
const taiXeModel = require('../models/TaiXe.model');

const router = express.Router();

//ERR01 - T1 - Dirty Read
router.post('/login', async (req, res) => {
    const {ma_don_hang, ma_tai_xe} = req.body;
    const result = await taiXeModel.dangNhap(ma_don_hang, ma_tai_xe);
    res.json(result);
});
//ERR04 - T1 - Phantom Read
router.get('/', async (req, res) => {
    const {result, so_luong} = await taiXeModel.selectAll();
    res.json(result,so_luong);
});
//ERR04 - T2 - Phantom Read
router.post('/register', async (req, res) => {
    const tai_xe = req.body;
    const result = await taiXeModel.dangKyTaiKhoan(tai_xe);
    res.json(result);
});
module.exports = router;