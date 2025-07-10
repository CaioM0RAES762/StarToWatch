window.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(sessionStorage.getItem('usuario'));
  if (!usuario) return;

  const chave = `filmesSalvos_${usuario.login}`;
  const chaveVerDepois = `filmesVerDepois_${usuario.login}`;

  const btnFavoritos = document.getElementById('btn-favoritos');
  const btnVerDepois = document.getElementById('btn-verdepois');
  const divFavoritos = document.getElementById('salvos');
  const tituloFavoritos = document.querySelector('.titulo-salvos');
  const divVerDepois = document.getElementById('ver-depois');
  const tituloVerDepois = document.querySelector('.titulo-verdepois');

  function atualizarVisibilidade(mostrarFavoritos) {
    divFavoritos.style.display = mostrarFavoritos ? 'flex' : 'none';
    tituloFavoritos.style.display = mostrarFavoritos ? 'block' : 'none';
    divVerDepois.style.display = mostrarFavoritos ? 'none' : 'flex';
    tituloVerDepois.style.display = mostrarFavoritos ? 'none' : 'block';
  }

  function exibirFilmesSalvos() {
    const salvos = JSON.parse(localStorage.getItem(chave)) || [];
    const verDepois = JSON.parse(localStorage.getItem(chaveVerDepois)) || [];

    divFavoritos.innerHTML = '';

    salvos
      .filter(f => !verDepois.find(v => v.id === f.id))
      .forEach(filme => {
        const card = document.createElement('div');
        card.className = 'col-auto position-relative';
        card.innerHTML = `
        <div class="carrossel-card mini">
          <a href="detalhes.html?id=${filme.id}">
            <img src="${filme.poster}" alt="${filme.titulo}">
          </a>
          <button class="btn-remove" title="Remover dos favoritos">✖</button>
          <button class="btn-verdepois" title="Salvar para ver depois" data-id="${filme.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50">
              <path d="M 12.8125 2 C 12.335938 2.089844 11.992188 2.511719 12 3 L 12 47 C 11.996094 47.359375 12.1875 47.691406 12.496094 47.871094 C 12.804688 48.054688 13.1875 48.054688 13.5 47.875 L 25 41.15625 L 36.5 47.875 C 36.8125 48.054688 37.195313 48.054688 37.503906 47.871094 C 37.8125 47.691406 38.003906 47.359375 38 47 L 38 3 C 38 2.449219 37.550781 2 37 2 L 13 2 C 12.96875 2 12.9375 2 12.90625 2 C 12.875 2 12.84375 2 12.8125 2 Z M 14 4 L 36 4 L 36 45.25 L 25.5 39.125 C 25.191406 38.945313 24.808594 38.945313 24.5 39.125 L 14 45.25 Z"/>
            </svg>
          </button>
        </div>`;

        card.querySelector('.btn-remove').addEventListener('click', () => {
          const atualizados = salvos.filter(f => f.id !== filme.id);
          localStorage.setItem(chave, JSON.stringify(atualizados));
          exibirFilmesSalvos();
        });

        card.querySelector('.btn-verdepois').addEventListener('click', () => {
          let verDepoisAtual = JSON.parse(localStorage.getItem(chaveVerDepois)) || [];
          if (!verDepoisAtual.find(f => f.id === filme.id)) {
            verDepoisAtual.push(filme);
            localStorage.setItem(chaveVerDepois, JSON.stringify(verDepoisAtual));

    
            const atualizados = salvos.filter(f => f.id !== filme.id);
            localStorage.setItem(chave, JSON.stringify(atualizados));
            exibirFilmesSalvos();
            exibirSalvosParaVerDepois();
          }
        });

        divFavoritos.appendChild(card);
      });
  }

  function exibirSalvosParaVerDepois() {
    const salvos = JSON.parse(localStorage.getItem(chaveVerDepois)) || [];
    divVerDepois.innerHTML = '';

    salvos.forEach(filme => {
      const card = document.createElement('div');
      card.className = 'col-auto position-relative';

      card.innerHTML = `
      <div class="carrossel-card mini">
        <a href="detalhes.html?id=${filme.id}">
          <img src="${filme.poster}" alt="${filme.titulo}">
        </a>
        <button class="btn-remove-verdepois" title="Remover">✖</button>
      </div>`;

      card.querySelector('.btn-remove-verdepois').addEventListener('click', () => {
        const atualizados = salvos.filter(f => f.id !== filme.id);
        localStorage.setItem(chaveVerDepois, JSON.stringify(atualizados));
        exibirSalvosParaVerDepois();
      });

      divVerDepois.appendChild(card);
    });
  }

  btnFavoritos?.addEventListener('click', (e) => {
    e.preventDefault();
    atualizarVisibilidade(true);
    exibirFilmesSalvos();
  });

  btnVerDepois?.addEventListener('click', (e) => {
    e.preventDefault();
    atualizarVisibilidade(false);
    exibirSalvosParaVerDepois();
  });

  atualizarVisibilidade(true);
  exibirFilmesSalvos();
});
