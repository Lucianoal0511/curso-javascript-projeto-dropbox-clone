var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/file', (req, res) => {

  let path = './' + req.query.path;//Criando variável para o caminho

  //Verificando se o caminho existe
  if (fs.existsSync(path)) {

    fs.readFile(path, (err, data) => {//Se existir ele vai ler o arquivo

      if (err) {

        console.error(err);
        res.status(400).json({
          error: err
        });

      } else {

        res.status(200).end(data);
        
      }

    })

  } else {

    res.status(404).json({
      error:'File not found'
    });

  }

})

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
        } else {

          res.json({
            fields
          });

        }

      });

    } else {

      res.status(404).json({
        error:'File not found'
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
