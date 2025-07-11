const avatares = [
  'avatares/avatar.png',
  'avatares/avatar1.png',
  'avatares/avatar2.png',
  'avatares/avatar3.png',
  'avatares/avatar4.png',
  'avatares/avatar5.png',
  'avatares/avatar6.png',
  'avatares/avatar7.png',
  'avatares/avatar8.png',
  'avatares/avatar9.png',
  'avatares/avatar10.png'
];

let avatarSelecionado = '';
let perfilEditando = null;

window.onload = () => {
  const grid = document.getElementById('avatarGrid');
  avatares.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.onclick = () => {
      document.querySelectorAll('.avatar-grid img').forEach(i => i.classList.remove('selecionado'));
      img.classList.add('selecionado');
      avatarSelecionado = src;
    };
    grid.appendChild(img);
  });

  
  const idEditar = localStorage.getItem('perfilParaEditar');
  if (idEditar) {
    const perfis = JSON.parse(localStorage.getItem('perfis')) || [];
    const perfil = perfis.find(p => p.id === idEditar);
    if (perfil) {
      document.getElementById('nomePerfil').value = perfil.nome;
      avatarSelecionado = perfil.imagem;
      perfilEditando = perfil;

    
      setTimeout(() => {
        const imgs = document.querySelectorAll('.avatar-grid img');
        imgs.forEach(img => {
          if (img.src.includes(perfil.imagem)) {
            img.classList.add('selecionado');
          }
        });
      }, 100);
    }
  }
};

function criarPerfil() {
  const nome = document.getElementById('nomePerfil').value.trim();
  if (!nome || !avatarSelecionado) {
    alert('Digite um nome e selecione um avatar.');
    return;
  }

  const usuario = JSON.parse(sessionStorage.getItem('usuario'));
  if (!usuario || !usuario.login) {
    alert('Usuário não está logado.');
    return;
  }

  const perfis = JSON.parse(localStorage.getItem('perfis')) || [];

  if (perfilEditando) {
    
    const index = perfis.findIndex(p => p.id === perfilEditando.id);
    if (index !== -1) {
      perfis[index].nome = nome;
      perfis[index].imagem = avatarSelecionado;
      perfis[index].dono = usuario.login; 
    }
    localStorage.removeItem('perfilParaEditar');
  } else {

    perfis.push({
      id: Date.now().toString(),
      nome,
      imagem: avatarSelecionado,
      dono: usuario.login 
    });
  }

  localStorage.setItem('perfis', JSON.stringify(perfis));
  window.location.href = 'perfilUser.html';
}
