let express = require('express');
let router = express.Router();
let QRCode = require('qrcode');

const { Student } = require('../models');

/* GET users listing. */
router.get('/', async (req, res) => {
  const data = await Student.findOne({
    where: {
      id: 1
    }
  });
  QRCode.toDataURL('Lerian', (err, url) => {
    res.render('qrcode',{
      data: url
    });
  });
});

module.exports = router;
