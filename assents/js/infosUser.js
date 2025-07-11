        const usuario = JSON.parse(sessionStorage.getItem('usuario'));
        if (usuario) {
            document.getElementById('userName').textContent = usuario.nome;
        }

        document.getElementById('logout').addEventListener('click', function () {
            sessionStorage.removeItem('usuario');
            window.location.href = 'login.html';
        });

         function toggleMenu() {
            const menu = document.getElementById('menuPerfil');
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        }

        window.addEventListener('click', function (e) {
            const menu = document.getElementById('menuPerfil');
            const avatarBtn = document.querySelector('.avatar-btn');

            if (!avatarBtn.contains(e.target) && !menu.contains(e.target)) {
                menu.style.display = 'none';
            }
        });


        window.onload = () => {
            const perfil = JSON.parse(localStorage.getItem('perfilSelecionado'));
            const usuario = JSON.parse(sessionStorage.getItem('usuario'));
            const avatarBtn = document.getElementById('avatar-btn');
            const avatarMenu = document.getElementById('avatar-menu');
            const userName = document.getElementById('userName');
            const emailSpan = document.getElementById('email');
            const loginContainer = document.getElementById('loginContainer');

        
            if (usuario) {
                if (loginContainer) loginContainer.style.display = 'none';

                if (perfil) {
                    if (avatarBtn) avatarBtn.src = perfil.imagem;
                    if (avatarMenu) avatarMenu.src = perfil.imagem;

                    if (userName) {
                        const nome = perfil.nome;
                        const maxCharsNome = 12;
                        userName.textContent = nome.length > maxCharsNome ? nome.slice(0, maxCharsNome) + '...' : nome;
                    }

                }

                if (emailSpan) {
                    const email = usuario.login;
                    const maxChars = 15;
                    emailSpan.textContent = email.length > maxChars ? email.slice(0, maxChars) + '...' : email;
                }

            } else {
                if (loginContainer) loginContainer.style.display = 'block';
                if (avatarBtn) avatarBtn.src = 'avatarpadrao.png';
                if (avatarMenu) avatarMenu.src = 'avatarpadrao.png';
                if (userName) userName.textContent = 'Seu nome';
                if (emailSpan) emailSpan.textContent = 'Seu email';
            }
        };
