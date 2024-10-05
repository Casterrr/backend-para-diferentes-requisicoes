var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/alunos', function(req, res, next) {

  const alunos = getAlunos();

  res.status(201).json({ alunos });
});

router.post('/alunos', function(req, res, next) {
  console.log(req.body);

  const mensagem = saveAluno(req.body);

  res.status(201).json({ mensagem });
});

module.exports = router;



const alunos = []

function getAlunos(){
    return alunos
}

function saveAluno(aluno){
    console.log('opa')

    if (alunos.find(alunoDaLista => alunoDaLista.matricula == aluno.matricula)) {
      return "Já existe um aluno com essa matrícula."
    }
    
    alunos.push(aluno);

    return `Aluno ${aluno.nome} cadastrado com sucesso!`;


}

function updateAluno(aluno) {
    alunos = alunos.map((alunoDaLista) => {
        if (alunoDaLista.matricula == aluno.matricula) {
            return aluno;
        } else {
            return alunoDaLista;
        };
    });
}

function deleteAluno(aluno) {
    alunos.filter(alunoDaLista => alunoDaLista.matricula != aluno.matricula);
}
