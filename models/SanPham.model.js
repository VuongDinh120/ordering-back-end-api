const { poolPromise, sql } = require('../utils/db')

module.exports = {
    //ERR07 - T2 - Dirty Read
    async selectSanPhamDoiTac(ma_doi_tac) {
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('MaDoiTac', sql.Int, ma_doi_tac)
                .execute('sp_KHXemSP');
            return (result.recordset);
        } catch (err) {
            return (err.message);
        }
    },
    //ERR06 - T1 - Phantom Read
    async selectSanPhamTheoGia(min, max) {
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('gia_thap_nhat', sql.Float, min)
                .input('gia_cao_nhat', sql.Float, max)
                .output('SL_SP', sql.Int)
                .execute('sp_XemDSSanPhamTheoGia');
            return (result.recordset, result.parameters.SL_SP.value);
        } catch (err) {
            return (err.message);
        }
    },
    //ERR07 - T1 - Dirty Read
    async updateSoluongSP_DirtyRead(ma_sp, ma_chi_nhanh, so_luong) {
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
    },
    //ERR03 - T1-T2 - Lost update
    async updateSoluongSP_LostUpdate(ma_sp, ma_chi_nhanh, so_luong) {
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('maSP', sql.Int, ma_sp)
                .input('maChiNhanh', sql.Int, ma_chi_nhanh)
                .input('soLuongSP', sql.Int, so_luong)
                .execute('sp_CapNhatSoLuongSanPham');
            return (result.recordset);
        } catch (err) {
            return (err.message);
        }
    },
    //ERR06 - T2 - Phantom Read
    async insertSPMoi(ten_sp, gia, so_luong, ma_chi_nhanh) {
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('@TenSP', sql.NVarChar(100), ten_sp)
                .input('@gia', sql.Float, gia)
                .input('@so_luong', sql.Int, so_luong)
                .input('@ma_chi_nhanh', sql.Int, ma_chi_nhanh)
                .execute('sp_DoiTacThemSPMoi');
            return (result.recordset);
        } catch (err) {
            return (err.message);
        }
    }
}