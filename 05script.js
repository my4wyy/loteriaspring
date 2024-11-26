document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        singup();
    });

    function singup() {
        const userData = {
            username: document.getElementById('user').value, 
            password: document.getElementById('password').value
        };

        fetch('https://loteriasaojudas.azurewebsites.net/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                alert("Erro ao cadastrar!");
                throw new Error('Erro ao cadastrar!');
            }
            alert("Novo usuário cadastrado com sucesso!");
            window.location.href = "00relatorios.html";
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    }


});
