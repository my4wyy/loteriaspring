let isCheckIn = true; 

document.addEventListener("DOMContentLoaded", function() {
    updateTime();
    setInterval(updateTime, 1000);

    const checkInButton = document.getElementById("check-in");
    const checkOutButton = document.getElementById("check-out");

    checkInButton.addEventListener("click", function(event) {
        event.preventDefault(); 
        
            registerStart("Chegada");
        
    });

    checkOutButton.addEventListener("click", function(event) {
        event.preventDefault(); 
        
            registerEnd("Saída");
        
    });
});

function updateTime() {
    const now = new Date();
    const currentTime = now.toLocaleString();
    document.getElementById("current-time").textContent = "Hora Atual: " + currentTime;
}

function showMessage(message) {
    const messageContainer = document.getElementById("message-container");
    messageContainer.textContent = message;
}

function registerStart() {
    const now = new Date();
    const time = now.toISOString();
    const id = document.getElementById('id').value;
    const data = {
        fim: null, 
        comeco: time,
        idFuncionario: parseInt(id) 
    };

    fetch('https://loteriasaojudas.azurewebsites.net/pontos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao registrar o início do expediente');
            showMessage(`Não foi possível registrar a entrada deste usuário`);
        }
        showMessage(`Início do expediente registrado com sucesso!`);
        isCheckIn = false; 
    })
    .catch(error => {
        console.error('Erro ao registrar o início do expediente:', error);
        showMessage(`Não foi possível registrar a entrada deste usuário`);
    });
}

function registerEnd() {
    const now = new Date();
    const time = now.toISOString();
    const id = document.getElementById('id').value;
    const data = {
        fim: time,
        comeco: null, 
        idFuncionario: parseInt(id) 
    };

    fetch('https://loteriasaojudas.azurewebsites.net/pontos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao registrar o fim do expediente');
            showMessage(`Não foi possível registrar a saída deste usuário`);
        }
        showMessage(`Fim do expediente registrado com sucesso!`);
        isCheckIn = true; 
    })
    .catch(error => {
        console.error('Erro ao registrar o fim do expediente:', error);
        showMessage(`Não foi possível registrar a saída deste usuário`);
    });
}
