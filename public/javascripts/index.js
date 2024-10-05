document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('matriculaForm');
    
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
  
        console.log(data);
  
        fetch('/alunos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
            alert(result.mensagem);
            document.getElementById('response').innerText = result.mensagem;
            this.reset(); 
        })
        .catch(error => {
          console.error('Erro:', error);
          let mensagemErro = 'Ocorreu um erro ao enviar o formulário:';
          if (error.message) {
            mensagemErro += '\n' + error.message;
          }
          if (error.erros && Array.isArray(error.erros)) {
            mensagemErro += '\n\nErros detalhados:\n' + error.erros.join('\n');
          }
          alert(mensagemErro + '\n\nPor favor, tente novamente.');
        });
      });
    } else {
      console.error('Formulário não encontrado');
    }
  });