function carregarPerfis() {
  const container = document.getElementById('perfisContainer');
  const mensagemVazia = document.getElementById('mensagem-vazia');

  container.innerHTML = '';

  const usuario = JSON.parse(sessionStorage.getItem('usuario'));
  if (!usuario) {
    alert('Você precisa estar logado.');
    window.location.href = 'login.html';
    return;
  }

  let perfis;
  try {
    perfis = JSON.parse(localStorage.getItem('perfis')) || [];
  } catch (e) {
    console.error('Erro ao carregar perfis do localStorage:', e);
    perfis = [];
  }

  const perfisUsuario = perfis.filter(perfil => perfil.dono === usuario.login);

  if (perfisUsuario.length > 0) {
    mensagemVazia.style.display = 'none';

    perfisUsuario.forEach((perfil) => {
      const div = document.createElement('div');
      div.className = 'perfil-item';

      const wrapper = document.createElement('div');
      wrapper.className = 'avatar-wrapper';

      const img = document.createElement('img');
      img.src = perfil.imagem;
      img.alt = `Avatar de ${perfil.nome}`;
      img.className = 'avatar-perfil';

      img.onclick = () => {
        localStorage.setItem('perfilSelecionado', JSON.stringify(perfil));
        window.location.href = 'index.html';
      };

      const lixeira = document.createElement('button');
      lixeira.className = 'btn-lixeira';
      lixeira.innerHTML = '🗑️';
      lixeira.onclick = () => excluirPerfil(perfil.id);

      wrapper.appendChild(img);
      wrapper.appendChild(lixeira);

      const nome = document.createElement('p');
      nome.className = 'nome-perfil';
      nome.textContent = perfil.nome;

      const btnEditar = document.createElement('button');
      btnEditar.textContent = 'Editar';
      btnEditar.className = 'btn-editar';
      btnEditar.onclick = () => editarPerfil(perfil.id);

      div.appendChild(wrapper);
      div.appendChild(nome);
      div.appendChild(btnEditar);

      container.appendChild(div);
    });
  } else {
    mensagemVazia.style.display = 'block';
  }
}

function excluirPerfil(id) {
  if (confirm('Deseja excluir este perfil?')) {
    let perfis = JSON.parse(localStorage.getItem('perfis')) || [];

    perfis = perfis.filter(p => p.id !== id);
    localStorage.setItem('perfis', JSON.stringify(perfis));

    carregarPerfis(); 
  }
}

function editarPerfil(id) {
  localStorage.setItem('perfilParaEditar', id);
  window.location.href = 'Criarperfil.html';
}


window.onload = carregarPerfis;

