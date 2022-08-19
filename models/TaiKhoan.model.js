const { poolPromise , sql} = require('../utils/db')

module.exports = {
    //ERR08 - T1 - Unrepeatable Read
    async updateMatKhau(ten_dang_nhap, mat_khau_moi) {
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('TenDangNhap', sql.NVarChar(50), ten_dang_nhap)
                .input('mat_khau_moi', sql.NVarChar(50), mat_khau_moi)
                .execute('sp_ThayDoiMatKhau');
            return (result.recordset);
        } catch (err) {
            return (err.message);
        }
    },
    //ERR08 - T2 - Unrepeatable Read
    async dangNhap(ten_dang_nhap, mat_khau) {
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('TenDangNhap', sql.NVarChar(50), ten_dang_nhap)
                .input('MatKhau', sql.NVarChar(50), mat_khau)
                .execute('sp_DangNhap');
            return (result.recordset);
        } catch (err) {
            return (err.message);
        }
    }
}