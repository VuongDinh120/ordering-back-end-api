const { poolPromise, sql} = require('../utils/db')

module.exports = {
    //ERR01 - T2 - Dirty Read
    async selectDonHang(ma_don_hang) {
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('MADONDATHANG', sql.Int, ma_don_hang)
                .execute('sp_KHKiemTraDonHang');
            return (result.recordset);
        } catch (err) {
            return (err.message);
        }
    },
    //ERR05 - T2 - Unrepeatable Read
    async selectChiTietDonHang(ma_don_hang) {
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('ma_don_hang', sql.Int, ma_don_hang)
                .execute('sp_TaiXeXemChiTietDonHang');
            return (result.recordset);
        } catch (err) {
            return (err.message);
        }
    },
    //ERR02 - T1-T2 - Lost Update
    async datDonHang(ma_don_hang, ma_sp, sl_mua, gia) {
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('MADONDATHANG', sql.Int, ma_don_hang)
                .input('MASP', sql.Int, ma_sp)
                .input('SLMUA', sql.Int, sl_mua)
                .input('Gia', sql.Float, gia)
                .execute('sp_KHDatDonHang');
            return (result.recordset);
        } catch (err) {
            return (err.message);
        }
    },
    //ERR05 - T1 - Unrepeatable Read
    async huyDonHang(ma_don_hang) {
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('ma_don_hang', sql.Int, ma_don_hang)
                .execute('sp_KHHuyDonHang');
            return (result.recordset);
        } catch (err) {
            return (err.message);
        }
    }
}