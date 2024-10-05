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

  const resultado = saveAluno(req.body);

  if (resultado.sucesso) {
      res.status(201).json({ mensagem: resultado.mensagem });
  } else {
      res.status(400).json({ mensagem: resultado.mensagem });
  }
});

router.put('/alunos/:matricula', function(req, res, next) {
  const matricula = req.params.matricula;
  const alunoAtualizado = req.body;

  const resultado = updateAluno(matricula, alunoAtualizado);

  if (resultado.sucesso) {
      res.status(200).json({ mensagem: resultado.mensagem });
  } else {
      res.status(400).json({ mensagem: resultado.mensagem });
  }
});

router.delete('/alunos/:matricula', function(req, res, next) {
  const matricula = req.params.matricula;
  
  const resultado = deleteAluno(matricula);

  if (resultado.sucesso) {
    res.status(200).json({ mensagem: resultado.mensagem });
  } else {
    res.status(404).json({ mensagem: resultado.mensagem });
  }
});

module.exports = router;



const alunos = []

function getAlunos(){
    return alunos
}

function saveAluno(aluno) {
  if (temValoresNulos(aluno)) {
      return { sucesso: false, mensagem: "Erro: Há campos nulos. Todos os campos são obrigatórios." };
  }

  if (alunos.find(alunoDaLista => alunoDaLista.matricula == aluno.matricula)) {
      return { sucesso: false, mensagem: "Erro: Já existe um aluno com essa matrícula." };
  }
  
  alunos.push(aluno);
  return { sucesso: true, mensagem: `Aluno ${aluno.nome} cadastrado com sucesso!` };
}

function updateAluno(matricula, alunoAtualizado) {
  if (temValoresNulos(alunoAtualizado)) {
    return { sucesso: false, mensagem: "Erro: Todos os campos são obrigatórios." };
  }

  const index = alunos.findIndex(aluno => aluno.matricula === matricula);

  if (index !== -1) {
    const alunoExistente = alunos[index];
    
    // Verifica se há alguma diferença entre os dados existentes e os novos
    const temMudancas = Object.keys(alunoAtualizado).some(key => 
      alunoExistente[key] !== alunoAtualizado[key]
    );

    if (!temMudancas) {
      return { sucesso: false, mensagem: "Não houve alterações, atualização não realizada." };
    }

    alunos[index] = { ...alunoExistente, ...alunoAtualizado };
    return { sucesso: true, mensagem: "Aluno atualizado com sucesso." };
  }
  return { sucesso: false, mensagem: "Aluno com esta matrícula não encontrado." };
}

function temValoresNulos(objeto) {
  return Object.values(objeto).some(valor => valor === null || valor === undefined || valor === '');
}

function deleteAluno(matricula) {
  const indexAluno = alunos.findIndex(aluno => aluno.matricula === matricula);
  
  if (indexAluno !== -1) {
      alunos.splice(indexAluno, 1);
      return { 
          sucesso: true, 
          mensagem: `Aluno com matrícula ${matricula} removido com sucesso.` 
      };
  } else {
      return { 
          sucesso: false, 
          mensagem: `Aluno com matrícula ${matricula} não encontrado.` 
      };
  }
}
