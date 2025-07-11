  const apiKey = '52d3f9a4';
    const input = document.getElementById('searchInput');
    const icon = document.getElementById('searchIcon');
    const posterContainer = document.getElementById('posterContainer');
    const sugestoesBox = document.createElement('div');
    sugestoesBox.classList.add('sugestoes-box');
    input.parentNode.appendChild(sugestoesBox);

    icon.addEventListener('click', buscarFilmesComChecagem);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') buscarFilmesComChecagem();
    });

    input.addEventListener('input', mostrarSugestoesEnquantoDigita);

    function removerAcentos(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    function buscarFilmesComChecagem() {
        const termoOriginal = input.value.trim();
        if (!termoOriginal) return;

        sugestoesBox.innerHTML = ''; 

        const termosQueNaoTraduz = ['batman', 'avengers', 'superman', 'spider-man', 'harry potter'];
        const termoMinusculo = removerAcentos(termoOriginal.toLowerCase());
        const precisaTraduzir = !termosQueNaoTraduz.some(t => termoMinusculo.includes(t));

        if (precisaTraduzir) {
            traduzirParaIngles(termoOriginal)
                .then(termoTraduzido => buscarOMDb(termoTraduzido))
                .catch(() => buscarOMDb(termoOriginal));
        } else {
            buscarOMDb(termoOriginal);
        }
    }

    function traduzirParaIngles(texto) {
        const dicionario = {
                                "homem aranha": "Spider-Man",
                    "homen aranha": "Spider-Man",
                    "vingadores": "Avengers",
                    "batman": "Batman",
                    "super homem": "Superman",
                    "super-homem": "Superman",
                    "harry potter": "Harry Potter",
                    "pantera negra": "Black Panther",
                    "doutor estranho": "Doctor Strange",
                    "homem de ferro": "Iron Man",
                    "capitão américa": "Captain America",
                    "mulher maravilha": "Wonder Woman",
                    "homem formiga": "Ant-Man",
                    "viúva negra": "Black Widow",
                    "guardioes da galáxia": "Guardians of the Galaxy",
                    "um sonho de liberdade": "The Shawshank Redemption",
                    "o poderoso chefão": "The Godfather",
                    "batman: o cavaleiro das trevas": "The Dark Knight",
                    "o poderoso chefão: parte ii": "The Godfather: Part II",
                    "12 homens e uma sentença": "12 Angry Men",
                    "o senhor dos anéis: o retorno do rei": "The Lord of the Rings: The Return of the King",
                    "a lista de schindler": "Schindler's List",
                    "pulp fiction: tempo de violência": "Pulp Fiction",
                    "o senhor dos anéis: a sociedade do anel": "The Lord of the Rings: The Fellowship of the Ring",
                    "três homens em conflito": "The Good, the Bad and the Ugly",
                    "the batman": "The Batman",
                    "duna: parte dois": "Dune: Part Two",
                    "homem-aranha: através do aranhaverso": "Spider-Man: Across the Spider-Verse",
                    "interestelar": "Interstellar",
                    "quarteto fantástico: primeiros passos": "Fantastic Four",
                    "matrix": "The Matrix",
                    "a origem": "Inception",
                    "gladiador": "Gladiator",
                    "clube da luta": "Fight Club",
                    "coco": "Coco",
                    "o lobo de wall street": "The Wolf of Wall Street",
                    "gravidade": "Gravity",
                    "bastardos inglórios": "Inglourious Basterds",
                    "whiplash": "Whiplash",
                    "parasita": "Parasite",
                    "duna": "Dune",
                    "o grande hotel budapeste": "The Grand Budapest Hotel",
                    "intocáveis": "The Intouchables",
                    "corra": "Get Out",
                    "jojo rabbit": "Jojo Rabbit",
                    "la la land": "La La Land",
                    "o jogo da imitação": "The Imitation Game",
                    "divertida mente": "Inside Out",
                    "ford vs ferrari": "Ford v Ferrari",
                    "cães de aluguel": "Reservoir Dogs",
                    "quem quer ser um milionário?": "Slumdog Millionaire",
                    "o profissional": "Léon: The Professional",
                    "as vantagens de ser invisível": "The Perks of Being a Wallflower",
                    "ela": "Her",
                    "o destino de uma nação": "Darkest Hour",
                    "o discurso do rei": "The King's Speech",
                    "o menino do pijama listrado": "The Boy in the Striped Pyjamas",
                    "até o último homem": "Hacksaw Ridge",
                    "o jogo da imitação": "The Imitation Game",
                    "me chame pelo seu nome": "Call Me by Your Name",
                    "a rede social": "The Social Network",
                    "o código da vinci": "The Da Vinci Code",
                    "um lugar silencioso": "A Quiet Place",
                    "tudo em todo lugar ao mesmo tempo": "Everything Everywhere All at Once",
                    "o grande truque": "The Prestige",
                    "truque de mestre": "Now You See Me",
                    "a teoria de tudo": "The Theory of Everything",
                    "o lagosta": "The Lobster",
                    "o farol": "The Lighthouse",
                    "reino escondido": "Epic",
                    "uma mente brilhante": "A Beautiful Mind",
                    "a proposta": "The Proposal",
                    "um senhor estagiário": "The Intern",
                    "o diário de uma paixão": "The Notebook",
                    "o lado bom da vida": "Silver Linings Playbook",
                    "a forma da água": "The Shape of Water",
                    "coração valente": "Braveheart",
                    "garota exemplar": "Gone Girl",
                    "milagre na cela 7": "Miracle in Cell No. 7",
                    "história de um casamento": "Marriage Story",
                    "o menino que descobriu o vento": "The Boy Who Harnessed the Wind",
                    "a vida é bela": "Life is Beautiful",
                    "o escafandro e a borboleta": "The Diving Bell and the Butterfly",
                    "as aventuras de pi": "Life of Pi",
                    "o labirinto do fauno": "Pan's Labyrinth",
                    "as branquelas": "White Chicks",
                    "esqueceram de mim": "Home Alone",
                    "o informante": "The Insider",
                    "o homem que mudou o jogo": "Moneyball",
                    "invencível": "Unbroken",
                    "até o último homem": "Hacksaw Ridge",
                    "o voo": "Flight",
                    "o contador": "The Accountant",
                    "o preço do amanhã": "In Time",
                    "tempo": "Old",
                    "águas rasas": "The Shallows",
                    "por lugares incríveis": "All the Bright Places",
                    "um crime para dois": "The Lovebirds",
                    "cruella": "Cruella",
                    "luca": "Luca",
                    "red: crescer é uma fera": "Turning Red",
                    "mundo estranho": "Strange World",
                    "procurando dory": "Finding Dory",
                    "valente": "Brave",
                    "o bom dinossauro": "The Good Dinosaur",
                    "irmao urso": "Brother Bear",
                    "vida de inseto": "A Bug's Life",
                    "planeta do tesouro": "Treasure Planet",
                    "o caminho para el dorado": "The Road to El Dorado",
                    "formiguinhaz": "Antz",
                    "cada um na sua casa": "Home",
                    "robo": "Robots",
                    "epic: o reino secreto": "Epic",
                    "o poderoso chefinho 2": "The Boss Baby: Family Business",
                    "super mario bros: o filme": "The Super Mario Bros. Movie",
                    "mundo estranho": "Strange World",
                    "arremessando alto": "Hustle",
                    "tempo de despertar": "Awakenings",
                    "o menino do pijama listrado": "The Boy in the Striped Pyjamas",
                    "o leitor": "The Reader",
                    "o labirinto do fauno": "Pan's Labyrinth",
                    "o tigre e o dragão": "Crouching Tiger, Hidden Dragon",
                    "adeus, lenin!": "Good Bye Lenin!",
                    "amor à flor da pele": "In the Mood for Love",
                    "parasita": "Parasite",
                    "drive": "Drive",
                    "beleza americana": "American Beauty",
                    "ela": "Her",
                    "o show de truman": "The Truman Show",
                    "o preço de um resgate": "Ransom",
                    "refém do medo": "The Captive",
                    "estrada sem lei": "The Highwaymen",
                    "alvo duplo": "Bullet to the Head",
                    "sem dor, sem ganho": "Pain & Gain",
                    "antes do amanhecer": "Before Sunrise",
                    "antes do pôr-do-sol": "Before Sunset",
                    "antes da meia-noite": "Before Midnight",
                    "questão de honra": "A Few Good Men",
                    "instinto selvagem": "Basic Instinct",
                    "garota exemplar": "Gone Girl",
                    "o quarto de jack": "Room",
                    "um limite entre nós": "Fences",
                    "toda luz que não podemos ver": "All the Light We Cannot See",
                    "mank": "Mank",
                    "tick, tick... boom!": "Tick, Tick... Boom!",
                    "beleza oculta": "Collateral Beauty",
                    "sete vidas": "Seven Pounds",
                    "além da vida": "Hereafter",
                    "encontro marcado": "Meet Joe Black",
                    "em boa companhia": "In Good Company",
                    "férias frustradas": "Vacation",
                    "tudo por um furo": "Anchorman 2",
                    "anchorman: a lenda de ron burgundy": "Anchorman: The Legend of Ron Burgundy",
                    "quase famosos": "Almost Famous",
                    "aventura em alto mar": "Overboard",
                    "aquele estranho momento": "That Awkward Moment",
                    "jogo do dinheiro": "Money Monster",
                    "o preço da verdade": "Dark Waters",
                    "o dono da festa": "Project X",
                    "o idiota do meu irmão": "Our Idiot Brother",
                    "do que as mulheres gostam": "What Women Want",
                    "de repente 30": "13 Going on 30",
                    "o amor custa caro": "Intolerable Cruelty",
                    "minha vida em marte": "My Life on Mars",
                    "o casamento do meu melhor amigo": "My Best Friend’s Wedding",
                    "compramos um zoológico": "We Bought a Zoo",
                    "as vantagens de ser invisível": "The Perks of Being a Wallflower",
                    "voando alto": "Joy",
                    "garota interrumpida": "Girl, Interrupted",
                    "o diário de uma paixão": "The Notebook",
                    "para sempre cinderela": "Ever After",
                    "um homem de sorte": "The Lucky One",
                    "comer, rezar, amar": "Eat Pray Love",
                    "lembranças": "Remember Me",
                    "segundas intenções": "Cruel Intentions",
                    "segundas intenções 2": "Cruel Intentions 2",
                    "o som do coração": "August Rush",
                    "o melhor amigo da noiva": "Made of Honor",
                    "o lado bom da vida": "Silver Linings Playbook",
                    "questão de tempo": "About Time",
                    "amizade colorida": "Friends with Benefits",
                    "sexo sem compromisso": "No Strings Attached",
                    "loucuras de amor": "Crazy/Beautiful",
                    "como se fosse a primeira vez": "50 First Dates",
                    "click": "Click",
                    "um faz de conta que acontece": "Bedtime Stories",
                    "gente grande": "Grown Ups",
                    "entrando numa fria": "Meet the Parents",
                    "um partu de viagem": "Due Date",
                    "se beber, não case": "The Hangover",
                    "as férias da minha vida": "Last Holiday",
                    "comer, rezar, amar": "Eat Pray Love",
                    "ele é demais": "He's All That",
                    "nós": "Us",
                    "como treinar seu dragão": "How to Train Your Dragon",
                    "corra!": "Get Out",
                    "não! não olhe!": "Nope",
                    "a visita": "The Visit",
                    "fragmentado": "Split",
                    "vidro": "Glass",
                    "tempo": "Old",
                    "o sexto sentido": "The Sixth Sense",
                    "a vila": "The Village",
                    "sinais": "Signs",
                    "atividade paranormal": "Paranormal Activity",
                    "a bruxa": "The Witch",
                    "hereditário": "Hereditary",
                    "midsommar": "Midsommar",
                    "a hora do pesadelo": "A Nightmare on Elm Street",
                    "sexta-feira 13": "Friday the 13th",
                    "o chamado": "The Ring",
                    "o grito": "The Grudge",
                    "invocação do mal": "The Conjuring",
                    "annabelle": "Annabelle",
                    "a freira": "The Nun",
                    "it: a coisa": "It",
                    "cemitério maldito": "Pet Sematary",
                    "o iluminado": "The Shining",
                    "doutor sono": "Doctor Sleep",
                    "ad astra: rumo às estrelas": "Ad Astra",
                    "passageiros": "Passengers",
                    "o céu da meia-noite": "The Midnight Sky",
                    "perdido em marte": "The Martian",
                    "gravidade": "Gravity",
                    "e o vento levou": "Gone with the Wind",
                    "cantando na chuva": "Singin' in the Rain",
                    "casablanca": "Casablanca",
                    "dr. fantástico": "Dr. Strangelove",
                    "uma odisséia no espaço": "2001: A Space Odyssey",
                    "lar doce inferno": "Home Sweet Hell",
                    "o virgem de 40 anos": "The 40-Year-Old Virgin",
                    "superbad: é hoje": "Superbad",
                    "procurando nemo": "Finding Nemo",
                    "procurando dory": "Finding Dory",
                    "valente": "Brave",
                    "divertida mente": "Inside Out",
                    "ratatouille": "Ratatouille",
                    "carros": "Cars",
                    "monstros s.a.": "Monsters, Inc.",
                    "up: altas aventuras": "Up",
                    "vida de inseto": "A Bug's Life",
                    "toy story": "Toy Story",
                    "alma": "Soul",
                    "elementos": "Elemental",
                    "red: crescer é uma fera": "Turning Red",
                    "titanic": "Titanic",
                    "avatar": "Avatar",
                    "o terminal": "The Terminal",
                    "ponte dos espiões": "Bridge of Spies",
                    "o resgate do soldado ryan": "Saving Private Ryan",
                    "capitão phillips": "Captain Phillips",
                    "o náufrago": "Cast Away",
                    "na natureza selvagem": "Into the Wild",
                    "estrada da fúria": "Mad Max: Fury Road",
                    "estrada para perdição": "Road to Perdition",
                    "garota interrompida": "Girl, Interrupted",
                    "cisne negro": "Black Swan",
                    "réquiem para um sonho": "Requiem for a Dream",
                    "minha mãe é uma peça": "My Mom is a Character",
                    "dois filhos de francisco": "Two Sons of Francisco",
                    "a vida secreta de walter mitty": "The Secret Life of Walter Mitty",
                    "o maravilhoso agora": "The Spectacular Now",
                    "se enlouquecer, não se apaixone": "It's Kind of a Funny Story",
                    "meu namorado é um zumbi": "Warm Bodies",
                    "ensina-me a viver": "Harold and Maude",
                    "de repente 30": "13 Going on 30",
                    "sim senhor": "Yes Man",
                    "penetras bons de bico": "Wedding Crashers",
                    "um amor para recordar": "A Walk to Remember",
                    "o amor não tira férias": "The Holiday",
                    "cartas para julieta": "Letters to Juliet",
                    "tudo acontece em elizabethtown": "Elizabethtown",
                    "a casa do lago": "The Lake House",
                    "amor a toda prova": "Crazy, Stupid, Love",
                    "um dia": "One Day",
                    "querido john": "Dear John",
                    "para todos os garotos que já amei": "To All the Boys I've Loved Before",
                    "amor e outras drogas": "Love & Other Drugs",
                    "cidades de papel": "Paper Towns",
                    "a culpa é das estrelas": "The Fault in Our Stars",
                    "o espaço entre nós": "The Space Between Us",
                    "se eu ficar": "If I Stay",
                    "para sempre": "The Vow",
                    "como eu era antes de você": "Me Before You",
                    "perfeita é a mãe": "Bad Moms",
                    "a mentira": "Easy A",
                    "meninas malvadas": "Mean Girls",
                    "projeto x": "Project X",
                    "querem acabar comigo": "The Watch",
                    "trovão tropical": "Tropic Thunder",
                    "o ditador": "The Dictator",
                    "borat": "Borat",
                    "zohan: o agente bom de corte": "You Don't Mess with the Zohan",
                    "click": "Click",
                    "o paizão": "Big Daddy",
                    "cada um tem a gêmea que merece": "Jack and Jill",
                    "esposa de mentirinha": "Just Go With It",
                    "gente grande 2": "Grown Ups 2",
                    "juntos e misturados": "Blended",
                    "o zelador animal": "Zookeeper",
                    "as aventuras de sharkboy e lavagirl": "The Adventures of Sharkboy and Lavagirl",
                    "espião por acaso": "The Spy Next Door",
                    "detona ralph": "Wreck-It Ralph",
                    "ralph quebra a internet": "Ralph Breaks the Internet",
                    "moana: um mar de aventuras": "Moana",
                    "encanto": "Encanto",
                    "frozen: uma aventura congelante": "Frozen",
                    "frozen 2": "Frozen II",
                    "valsa com bashir": "Waltz with Bashir",
                    "o menino e o mundo": "Boy and the World",
                    "o conto da princesa kaguya": "The Tale of the Princess Kaguya",
                    "meu amigo totoro": "My Neighbor Totoro",
                    "o serviço de entregas da kiki": "Kiki's Delivery Service",
                    "o castelo animado": "Howl's Moving Castle",
                    "viagem de chihiro": "Spirited Away",
                    "o castelo no céu": "Castle in the Sky",
                    "akira": "Akira",
                    "ghost in the shell": "Ghost in the Shell",
                    "a viagem de chihiro": "Spirited Away",
                    "o mundo dos pequeninos": "The Secret World of Arrietty",
                    "when marnie was there": "When Marnie Was There",
                    "viva: a vida é uma festa": "Coco",
                    "zootopia": "Zootopia",
                    "big hero 6": "Big Hero 6",
                    "enrolados": "Tangled",
                    "detona ralph": "Wreck-It Ralph",
                    "o poderoso chefinho": "The Boss Baby",
                    "shrek": "Shrek",
                    "kung fu panda": "Kung Fu Panda",
                    "como treinar o seu dragão": "How to Train Your Dragon",
                    "bee movie": "Bee Movie",
                    "os croods": "The Croods",
                    "rio": "Rio",
                    "rio 2": "Rio 2",
                    "o lorax": "The Lorax",
                    "meu malvado favorito": "Despicable Me",
                    "minions": "Minions",
                    "sherlock holmes": "Sherlock Holmes",
                    "sherlock holmes: o jogo de sombras": "Sherlock Holmes: A Game of Shadows",
                    "red 2: aposentados e ainda mais perigosos": "Red 2",
                    "truque de mestre 2": "Now You See Me 2",
                    "ilusionista": "The Illusionist",
                    "o grande hotel budapeste": "The Grand Budapest Hotel",
                    "a ilha do medo": "Shutter Island",
                    "o aviador": "The Aviator",
                    "gangues de nova york": "Gangs of New York",
                    "o lobo de wall street": "The Wolf of Wall Street",
                    "ilha dos cães": "Isle of Dogs",
                    "moonrise kingdom": "Moonrise Kingdom",
                    "asteroid city": "Asteroid City",
                    "não olhe para cima": "Don't Look Up",
                    "o menu": "The Menu",
                    "expresso do amanhã": "Snowpiercer",
                    "parasita": "Parasite",
                    "okja": "Okja",
                    "a bruxa": "The Witch",
                    "o farol": "The Lighthouse",
                    "o urso": "The Bear",
                    "demônio de neon": "The Neon Demon",
                    "o lagosta": "The Lobster",
                    "o sacrifício do cervo sagrado": "The Killing of a Sacred Deer",
                    "o homem invisível": "The Invisible Man",
                    "a caçada": "The Hunt",
                    "o hospedeiro": "The Host",
                    "vida marinha com steve zissou": "The Life Aquatic with Steve Zissou",
                    "em busca da felicidade": "The Pursuit of Happyness",
                    "esquadrão classe a": "The A-Team",
                    "kick-ass: quebrando tudo": "Kick-Ass",
                    "reaprendendo a amar": "Begin Again",
                    "questão de tempo": "About Time",
                    "escrito nas estrelas": "Serendipity",
                    "o diário de bridget jones": "Bridget Jones's Diary",
                    "o bebê de bridget jones": "Bridget Jones's Baby",
                    "o diário de uma princesa": "The Princess Diaries",
                    "princesa por acidente": "Monte Carlo",
                    "a nova cinderela": "A Cinderella Story"
        };

        const textoNormalizado = removerAcentos(texto.trim().toLowerCase());

        for (const chave in dicionario) {
            if (removerAcentos(chave.toLowerCase()) === textoNormalizado) {
                return Promise.resolve(dicionario[chave]);
            }
        }

        return fetch('https://libretranslate.com/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                q: texto,
                source: 'pt',
                target: 'en',
                format: 'text'
            })
        })
            .then(res => res.json())
            .then(data => data.translatedText);
    }

    function buscarOMDb(termoEmIngles) {
        fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(termoEmIngles)}&apikey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    const filmes = data.Search;
                    const filmesValidos = filmes.filter(filme => filme.Poster && filme.Poster !== "N/A");

                    if (filmesValidos.length === 0) {
                        posterContainer.innerHTML = `<p style="color:white;">Nenhum filme com imagem encontrada.</p>`;
                        return;
                    }

                    posterContainer.innerHTML = filmesValidos.map(filme => `
                        <div class="filme">
                          <img src="${filme.Poster}" alt="${filme.Title}">
                          <div class="overlay">${filme.Title} (${filme.Year})</div>
                        </div>
                    `).join('');
                } else {
                    posterContainer.innerHTML = `<p style="color:white;">Nenhum filme encontrado.</p>`;
                }
            })
            .catch(error => {
                console.error('Erro na busca OMDb:', error);
                posterContainer.innerHTML = `<p style="color:white;">Erro ao buscar filmes.</p>`;
            });
    }

   function mostrarSugestoesEnquantoDigita() {
    const termo = input.value.trim();
    const sugestoes = document.getElementById('sugestoes');

    sugestoesMain.innerHTML = '';

    if (termo.length < 3) return;

    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(termo)}`)
        .then(response => response.json())
        .then(data => {
            if (data.Search) {
                data.Search.slice(0, 6).forEach(filme => {
                    const col = document.createElement('div');
                    col.className = 'col-md-2 text-center';

                    const titulo = document.createElement('p');
                    titulo.textContent = filme.Title;
                    titulo.className = 'text-white mt-2';

                    col.appendChild(titulo);

                    col.addEventListener('click', () => {
                        input.value = filme.Title;
                        sugestoes.innerHTML = '';
                        buscarFilmesComChecagem();
                    });

                    sugestoes.appendChild(col);
                });
            }
        });
    }