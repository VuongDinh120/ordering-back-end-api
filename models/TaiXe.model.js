const { poolPromise,sql } = require('../utils/db')

module.exports = {
    //ERR01 - T1 - Dirty Read
    async nhanDonHang(ma_don_hang, ma_tai_xe) {
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('MADONDATHANG', sql.Int, ma_don_hang)
                .input('MATAIXE', sql.Int, ma_tai_xe)
                .execute('sp_TaiXeChonDonHang');
            return (result.recordset);
        } catch (err) {
            return (err.message);
        }
    },
    //ERR04 - T1 - Phantom Read
    async selectAll() {
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .output('SLTaiXe', sql.Int)
                .execute('sp_NhanVienXemDSTaiXe');
            return (result.recordset, result.parameters.SLTaiXe.value);
        } catch (err) {
            return (err.message);
        }
    },
    //ERR04 - T2 - Phantom Read
    async dangKyTaiKhoan(tai_xe) {
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('BienSo', sql.NVarChar(10), tai_xe.bien_xo)
                .input('cmnd', sql.NVarChar(10), tai_xe.cmnd)
                .input('khuVucHD', sql.NVarChar(50), tai_xe.khu_vuc_hd)
                .input('ten_dang_nhap', sql.NVarChar(50), tai_xe.ten_dang_nhap)
                .input('mat_khau', sql.NVarChar(50), tai_xe.mat_khau)
                .input('ten_day_du', sql.NVarChar(50), tai_xe.ten_day_du)
                .input('diachi', sql.NVarChar(100), tai_xe.dia_chi)
                .input('sdt', sql.NVarChar(10), tai_xe.sdt)
                .input('email', sql.NVarChar(50), tai_xe.email)
                .execute('sp_TaiXeDKTaiKhoan');
            return (result.recordset);
        } catch (err) {
            return (err.message);
        }
    },
}