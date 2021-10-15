var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.delete('/file', (req, res) => {

  let form = new formidable.IncomingForm({
    uploadDir: './upload',//foi criado um diretório para colocar os arquivos
    keepExtensions: true //manter a extensão do arquivo
  });

  form.parse(req, (err, fields, files) => {

    let path = "./" + fields.path;

    if (fs.existsSync(path)){

      fs.unlink(path, err => {

        if (err) {
          res.status(400).json({
            err
          });
        }else {

          res.json({
            fields
          });

        }

      });

    }

  });

})

router.post('/upload', (req, res) => {

  let form = new formidable.IncomingForm({
    uploadDir: './upload',//foi criado um diretório para colocar os arquivos
    keepExtensions: true //manter a extensão do arquivo
  });

  form.parse(req, (err, fields, files) => {

    res.json({
      files //files: files pode ser assim também
    });

  });

});

module.exports = router;
