const express = require('express');
const sanPhamModel = require('../models/SanPham.model');

const router = express.Router();

//ERR07 - T2 - Dirty Read
router.get('/doitac/:id', async (req, res) => {
    const result = await sanPhamModel.selectSanPhamDoiTac(req.params.id);
    res.json(result);
});
//ERR06 - T1 - Phantom Read
router.get('/:min-:max', async (req, res) => {
    const result = await sanPhamModel.selectSanPhamTheoGia(req.params.min, req.params.max);
    res.json(result);
});
//ERR07 - T1 - Dirty Read
router.patch('/quantity/dirty', async (req, res) => {
    const { ma_sp, ma_chi_nhnh, so_luong } = req.body;
    const result = await sanPhamModel.updateSoluongSP_DirtyRead(ma_sp, ma_chi_nhnh, so_luong);
    res.json(result);
});

//ERR03 - T1-T2 - Lost update
router.patch('/quantity/lostupdate', async (req, res) => {
    const { ma_sp, ma_chi_nhnh, so_luong } = req.body;
    const result = await sanPhamModel.updateSoluongSP_LostUpdate(ma_sp, ma_chi_nhnh, so_luong);
    res.json(result);
});

//ERR06 - T2 - Phantom Read
router.put('/', async (req, res) => {
    const {ten_sp, gia, so_luong, ma_chi_nhnh } = req.body;
    const result = await sanPhamModel.insertSPMoi(ten_sp, gia, so_luong, ma_chi_nhnh);
    res.json(result);
});
module.exports = router;