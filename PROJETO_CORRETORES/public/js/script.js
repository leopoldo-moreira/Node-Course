const toRemove = (btnId) => {
  const urlToRemove = `/broker/remove/${btnId}`;
  window.location.href = urlToRemove;
}

const toEdit = (btnId) => {
  const urlToEdit = `/broker/edit/${btnId}`;
  window.location.href = urlToEdit;
}

const message = () => {
  const msgElement = document.getElementById('message');
    if (msgElement.innerHTML !== '') {
      setTimeout(() => {
        msgElement.innerHTML = '';
      },1000)
    }
  
}

// Ao enviar o Formulário
document.getElementById('broker-form').addEventListener('submit', (e) => {

  e.preventDefault();

  // Validar Nome e CPF
  const cpf = document.getElementById('cpf').value;
  const creci = document.getElementById('creci').value;
  const msgElement = document.getElementById('msg');
  const cpfTester = CPF.validate(cpf);
  const creciTester = /^\d{5}$/.test(creci);

  if (!cpfTester) {
    msgElement.innerHTML = 'CPF Invalido!' 
    return;   
  }
  if (!creciTester) {
    msgElement.innerHTML = 'CRECI Invalido!'
    return;    
  }



  e.target.submit();

})