  window.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    fetch('https://backend-startowatchh-1.onrender.com/filmes')
      .then(res => res.json())
      .then(filmes => {
        if (id) {
          // PÁGINA DE DETALHES
          const container = document.getElementById('detalhes-container');
          if (!container) return;

          const filme = filmes.find(f => f.id == id);

          if (filme) {
            container.innerHTML = `
              <div class="fundo">
                <img src="${filme.poster}" alt="${filme.titulo}" class="background"> 
                <div class="overlay"></div>
              </div>
              <h4>Avaliação Rotten Tomatoes </h4>
              <h1>${filme.titulo}</h1> 
              <p class="avaliacao">${filme.rottenTomatoes} /100 </p>
              <p class="info">${filme.ano} • ${filme.duracao}</p>  
              <div class="media-container">
                <div class="imagem">
                  <img src="${filme.poster}" alt="${filme.titulo}">
                </div>
                <div class="trailer">
                  <iframe src="${filme.trailer}" allowfullscreen></iframe>
                </div>
              </div>
              <div class="genr">${filme.genre}</div>
              <div class="resumo">${filme.plot}</div>
            `;
          } else {
            container.innerHTML = `<p class="text-danger">Filme não encontrado!</p>`;
          }

        } else {
          // PÁGINA PRINCIPAL COM CARROSSEIS
          if (!usuario) return;

          function montarCarrossel(idContainer, filtroCallback, tipoCard = 'padrao') {
            const container = document.getElementById(idContainer);
            if (!container) return;

            filmes
              .filter(filtroCallback)
              .forEach((filme) => {
                const card = document.createElement('div');
                card.className = `carrossel-card ${tipoCard}`;

                if (tipoCard === 'trailer') {
                  const iframe = document.createElement('iframe');
                  iframe.src = filme.trailer;
                  iframe.setAttribute('allowfullscreen', true);
                  iframe.setAttribute('frameborder', '0');
                  iframe.className = 'trailer-frame';
                  card.appendChild(iframe);

                  const titulo = document.createElement('p');
                  titulo.textContent = filme.titulo;
                  titulo.className = 'titulo-trailer';
                  card.appendChild(titulo);
                } else {
                  const bookmark = document.createElement('i');
                  bookmark.className = 'fa-regular fa-heart bookmark-btn';
                  const chave = `filmesSalvos_${usuario.login}`;
                  let salvos = JSON.parse(localStorage.getItem(chave)) || [];

                  if (salvos.find(f => f.id === filme.id)) {
                    bookmark.classList.remove('fa-regular');
                    bookmark.classList.add('fa-solid');
                  }

                  bookmark.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    let salvos = JSON.parse(localStorage.getItem(chave)) || [];
                    const index = salvos.findIndex(f => f.id === filme.id);

                    if (index === -1) {
                      salvos.push(filme);
                      bookmark.classList.remove('fa-regular');
                      bookmark.classList.add('fa-solid');
                    } else {
                      salvos.splice(index, 1);
                      bookmark.classList.remove('fa-solid');
                      bookmark.classList.add('fa-regular');
                    }

                    localStorage.setItem(chave, JSON.stringify(salvos));
                  });

                  card.appendChild(bookmark);

                  const link = document.createElement('a');
                  link.href = `detalhes.html?id=${filme.id}`;

                  const img = document.createElement('img');
                  img.src = filme.poster;
                  img.alt = filme.titulo;

                  if (tipoCard === 'top10') {
                    img.style.maxWidth = '254px';
                    img.style.width = '90%';
                    img.style.height = '274px';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '10px';
                    img.style.marginTop = '8px';
                  }

                  link.appendChild(img);
                  card.appendChild(link);

                  if (tipoCard === 'destaque') {
                    const titulo = document.createElement('h3');
                    titulo.textContent = filme.titulo;
                    card.appendChild(titulo);
                  }

                  if (tipoCard === 'top10') {
                    const infoContainer = document.createElement('div');
                    infoContainer.style.padding = '8px';
                    infoContainer.style.color = 'white';
                    infoContainer.style.fontSize = '0.9rem';
                    infoContainer.style.width = '90%';
                    infoContainer.style.textAlign = 'left';

                    const titulo = document.createElement('p');
                    titulo.innerHTML = `<strong style="color: #ffcc00;">${filme.id}.</strong> ${filme.titulo}`;
                    infoContainer.appendChild(titulo);

                    const detalhes = document.createElement('p');
                    detalhes.textContent = `${filme.ano} · ${filme.duracao}`;
                    infoContainer.appendChild(detalhes);

                    card.appendChild(infoContainer);
                  }
                }

                container.appendChild(card);
              });
          }

          montarCarrossel('carrossel-filmes1', filme => filme.id >= 100, 'destaque');
          montarCarrossel('carrossel-filmes2', filme => filme.id >= 22 && filme.id <= 30, 'mini');
          montarCarrossel('carrossel-filmes3', filme => filme.id >= 31 && filme.id <= 40, 'mini');
          montarCarrossel('carrossel-filmes4', filme => filme.id >= 26 && filme.id <= 31, 'trailer');
          montarCarrossel('carrossel-filmes5', filme => filme.id >= 1 && filme.id <= 10, 'top10');

          document.querySelectorAll('.seta').forEach(seta => {
            seta.addEventListener('click', () => {
              const alvoId = seta.getAttribute('data-target');
              const carrossel = document.getElementById(alvoId);
              const direcao = seta.classList.contains('seta-direita') ? 1 : -1;
              carrossel.scrollBy({ left: direcao * 500, behavior: 'smooth' });
            });
          });
        }
      })
      .catch(err => {
        console.error('Erro ao carregar filmes:', err);
      });
  });







