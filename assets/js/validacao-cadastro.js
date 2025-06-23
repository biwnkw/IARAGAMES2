// Apenas para garantir que o arquivo está carregando
console.log("validacao-cadastro.js carregado com sucesso!");

const form = document.getElementById('form-cadastro');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const confirmar = document.getElementById('confirmar');
const btnCadastrar = form.querySelector('button[type="submit"]');

function validaNome() {
  const valid = nome.value.trim().length > 0;
  document.getElementById('nome-error').style.display = valid ? 'none' : 'block';
  return valid;
}

function validaEmail() {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const valid = re.test(email.value.trim());
  document.getElementById('email-error').style.display = valid ? 'none' : 'block';
  return valid;
}

function validaSenha() {
  const valid = senha.value.length >= 8;
  document.getElementById('senha-error').style.display = valid ? 'none' : 'block';
  return valid;
}

function validaConfirmarSenha() {
  const valid = senha.value === confirmar.value && confirmar.value.length > 0;
  document.getElementById('confirmar-error').style.display = valid ? 'none' : 'block';
  return valid;
}

function habilitaBotao() {
  btnCadastrar.disabled = !(validaNome() && validaEmail() && validaSenha() && validaConfirmarSenha());
}

nome.addEventListener('input', () => {
  validaNome();
  habilitaBotao();
});

email.addEventListener('input', () => {
  validaEmail();
  habilitaBotao();
});

senha.addEventListener('input', () => {
  validaSenha();
  validaConfirmarSenha();
  habilitaBotao();
});

confirmar.addEventListener('input', () => {
  validaConfirmarSenha();
  habilitaBotao();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (btnCadastrar.disabled) {
    alert('Por favor, corrija os erros antes de enviar o formulário.');
    return;
  }
  alert('Cadastro realizado com sucesso!');
  form.reset();
  btnCadastrar.disabled = true;
});
