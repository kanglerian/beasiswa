let express = require('express');
let router = express.Router();
let QRCode = require('qrcode');

const { Student } = require('../models');

/* GET users listing. */
router.get('/', async (req, res) => {
  const data = await Student.findAll();
  res.render('student/index',{
    data: data
  });
});

router.get('/:id', async (req, res) => {
  const data = await Student.findOne({
    where: {
      id: req.params.id
    }
  });
  QRCode.toDataURL(data.code,{ version: 3 }, (err, qrcode) => {
    res.render('student/voucher',{
      qrcode: qrcode,
      data: data
    });
  });
});

router.post('/check',async(req, res) => {
  const data = await Student.findOne({
    where: {
      code: req.body.code
    }
  });
  if(data != null){
    return res.send('Selamat anda mendapatkan beasiswa');
  }
  return res.send('Anda tidak mendapat beasiswa');
});

module.exports = router;
