const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
require('express-async-errors');

const app = express();

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'HQTCSDL - Do an TH'
  })
});

const donHangRoute = require('./routes/DonHang.route');
app.use('/api/donhang',donHangRoute);

const sanPhamRoute = require('./routes/SanPham.route');
app.use('/api/sanpham',sanPhamRoute);

const taiKhoanRoute = require('./routes/TaiKhoan.route');
app.use('/api/taikhoan',taiKhoanRoute);

const taiXeRoute = require('./routes/TaiXe.route');
app.use('/api/taixe',taiXeRoute);

app.get('/err',(err,req,res,next)=>{
  throw new Error('BROKEN')
})

app.use((req,res,next)=>{
  res.status(404).json({
    error_message: 'ENDPOINT NOT FOUND!'
  })
})

app.use((err, req, res, next)=>{
  console.error(err.stack);
  res.status(500).json({
    error_message: 'something broke!'
  })
})

const PORT = 3100;
app.listen(PORT, function () {
  console.log(`Todo backend is running at http://localhost:${PORT}`);
})
