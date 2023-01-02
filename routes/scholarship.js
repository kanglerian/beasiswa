let express = require('express');
let router = express.Router();
let QRCode = require('qrcode');

const { Student } = require('../models');

/* GET users listing. */
router.get('/', async (req, res) => {
  const data = null;
  return res.render('announcement',{
    data: data
  });
});

router.post('/',async(req, res) => {
  const data = await Student.findOne({
    where: {
      code: req.body.code
    }
  });
  if(data != null){
    return res.render('announcement',{
      data: data
    });
  }
  return res.redirect('/');
});

module.exports = router;
