document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        login();
    });

    function login() {
        const password = document.getElementById('password').value;

        fetch('https://loteriasaojudas.azurewebsites.net/senha', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro ao obter a senha do banco de dados');
            }
        })
        .then(data => {

            if (password === data.senha) {
                window.location.href = "11crudFuncionario.html";
            } else {
                alert("Senha incorreta. Por favor, tente novamente.");
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert("Erro ao fazer login. Por favor, tente novamente mais tarde.");
        });
    }
});
