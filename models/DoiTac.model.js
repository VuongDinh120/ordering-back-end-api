const { poolPromise, sql } = require('../utils/db')

module.exports = {
    async updateSoluongSP(ma_sp, ma_chi_nhanh, so_luong) {
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('MASP', sql.Int, ma_sp)
                .input('MACHINHANH', sql.Int, ma_chi_nhanh)
                .input('SL', sql.Int, so_luong)
                .execute('sp_DoiTacCapNhatSLSP');
            return (result.recordset);
        } catch (err) {
            return (err.message);
        }
    }
}