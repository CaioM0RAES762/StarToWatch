async function login(login, senha) {
  const response = await fetch('http://localhost:3000/usuarios?login=' + login);
  const usuarios = await response.json();
  
  if (usuarios.length === 0) return false;
  
  const usuario = usuarios[0];
  if (usuario.senha === senha) {
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
    return true;
  }
  return false;
}

function logout() {
  sessionStorage.removeItem('usuario');
  window.location.href = 'index.html';
}

function getUsuarioLogado() {
  return JSON.parse(sessionStorage.getItem('usuario'));
}

function isAdmin() {
  const usuario = getUsuarioLogado();
  return usuario && usuario.admin;
}
