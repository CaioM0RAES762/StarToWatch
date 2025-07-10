async function carregarFilmes() {
  try {
    const resposta = await fetch("http://localhost:3000/filmes"); 
    const filmes = await resposta.json();

    const generos = {};
    const notasPorAno = {};
    const contagemPorAno = {};

    filmes.forEach(filme => {

      const listaGeneros = filme.genre.split(',').map(g => g.trim());

      listaGeneros.forEach(genero => {
        generos[genero] = (generos[genero] || 0) + 1;
      });

    
      const ano = filme.ano;
      const nota = parseFloat(filme.rottenTomatoes);

      if (ano && !isNaN(nota)) {
        notasPorAno[ano] = (notasPorAno[ano] || 0) + nota;
        contagemPorAno[ano] = (contagemPorAno[ano] || 0) + 1;
      }
    });

    gerarGraficoPizza(generos);
    gerarGraficoBarra(notasPorAno, contagemPorAno);

  } catch (erro) {
    console.error("Erro ao carregar filmes:", erro);
  }
}

function gerarGraficoPizza(generos) {
  const ctx = document.getElementById("graficoPizza").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(generos),
      datasets: [{
        data: Object.values(generos),
        backgroundColor: [
          "#ef5350", "#42a5f5", "#ffee58", "#66bb6a", "#ab47bc", "#ffa726",
          "#26c6da", "#8d6e63", "#d4e157", "#5c6bc0", "#ec407a", "#ff7043",
          "#7e57c2", "#9ccc65", "#26a69a", "#fbc02d", "#c2185b", "#1976d2"
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, 
      plugins: {
        title: {
          display: true,
          text: "Distribuição por Gênero",
          color: "#ffffff",
          font: {
            size: 20,
            family: "Arial"
          }
        },
        legend: {
          position: "bottom",
          labels: {
            color: "#f1f1f1", 
            font: {
              size: 14,
              family: "Arial"
            },
            boxWidth: 20,
            padding: 12
          }
        }
      },
      layout: {
        padding: 20
      }
    }
  });
}


function gerarGraficoBarra(notasPorAno, contagemPorAno) {
  const anos = Object.keys(notasPorAno).sort();
  const medias = anos.map(ano => parseFloat((notasPorAno[ano] / contagemPorAno[ano]).toFixed(1)));

  const ctx = document.getElementById("graficoBarra").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: anos,
      datasets: [{
        label: "Nota Média Rotten Tomatoes",
        data: medias,
        backgroundColor: "#24b2f4"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Nota Média por Ano",
          color: "#ffffff", 
          font: {
            size: 20,
            family: "Arial",
          }
        },
        legend: {
          display: true,
          labels: {
            color: "#ffffff", 
            font: {
              size: 14,
              family: "Arial"
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#ffffff", 
            font: {
              size: 12
            }
          }
        },
        y: {
          beginAtZero: true,
          min: 0,
          max: 100,
          ticks: {
            stepSize: 10,
            color: "#ffffff", 
            font: {
              size: 12
            }
          }
        }
      }
    }
  });
}

carregarFilmes();
