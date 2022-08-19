const { poolPromise } = require('../utils/db')

module.exports = {
    async findAll() {
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('MADONDATHANG', 1)
                .execute('sp_KHKiemTraDonHang');
            return (result.recordset);
        } catch (err) {
            return (err.message);
        }
    }
}