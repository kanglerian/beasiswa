let express = require('express');
let router = express.Router();
let QRCode = require('qrcode');
let crypto = require('crypto');
let readXlsxFile = require('read-excel-file/node')
let upload = require('../middleware/uploadExcel.js');

const { Student } = require('../models');

/* GET users listing. */
router.get('/', async (req, res) => {
  const data = await Student.findAll();
  res.render('student/index', {
    data: data,
  });
});

router.post('/uploads', upload.single('upload'), async (req, res) => {
  let users = [];
  readXlsxFile(__filename + `/${req.file.filename}`).then(async (rows) => {
    rows.shift();
    rows.forEach((row) => {
      let code = crypto.randomBytes(4).toString('hex');
      var obj = {
        code: code,
        fullName: row[0],
        schools: row[1],
        class: row[2]
      }
      users.push(obj);
    });
    await Student.bulkCreate(users);
    return res.redirect('/students');
  }).catch((err) => {
    console.log(err)
  });
});

router.get('/:id', async (req, res) => {
  const data = await Student.findOne({
    where: {
      id: req.params.id
    }
  });
  try {
    QRCode.toDataURL(data.code, { version: 3 }, (err, qrcode) => {
      res.render('student/voucher', {
        qrcode: qrcode,
        data: data
      });
    });
  } catch (error) {
    res.redirect('/');
  }
});

router.post('/check', async (req, res) => {
  const data = await Student.findOne({
    where: {
      code: req.body.code
    }
  });
  if (data != null) {
    return res.render('student/result', {
      data: data
    });
  }
  return res.send('Anda tidak mendapat beasiswa');
});

router.post('/', async (req, res) => {
  let code = crypto.randomBytes(4).toString('hex');
  try {
    await Student.create({
      code: code,
      fullName: req.body.fullName,
      schools: req.body.schools,
      class: req.body.class
    });
  } catch (error) {
    return res.send(error);
  }
  return res.redirect('back');
});

router.delete('/delete/:id', async (req, res) => {
  try {
    await Student.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.redirect('back');
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
