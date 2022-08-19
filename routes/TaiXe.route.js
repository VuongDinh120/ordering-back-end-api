const express = require('express');
const taiKhoanModel = require('../models/TaiKhoan.model');

const router = express.Router();

//ERR08 - T2 - Unrepeatable Read
router.post('/login', async (req, res) => {
    const {ten_dang_nhap, mat_khau} = req.body;
    const result = await taiKhoanModel.dangNhap(ten_dang_nhap,mat_khau);
    res.json(result);
});
//ERR08 - T1 - Unrepeatable Read
router.post('/reset', async (req, res) => {
    const {ten_dang_nhap, mat_khau_moi} = req.body;
    const result = await taiKhoanModel.updateMatKhau(ten_dang_nhap,mat_khau_moi);
    res.json(result);
});

module.exports = router;