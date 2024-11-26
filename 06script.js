document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('consultarBtn').addEventListener('click', function () {
        const nomeFuncionario = document.getElementById('nomeFuncionario').value.trim().toLowerCase();
        console.log('Nome do funcionário:', nomeFuncionario);
        consultarPontos(nomeFuncionario);
    });
});

function consultarPontos(nomeFuncionario) {
    fetch('https://loteriasaojudas.azurewebsites.net/pontos/get-all', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar pontos');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados recebidos:', data);
        const pontosFiltrados = filtrarPontosPorFuncionario(data, nomeFuncionario);
        console.log('Pontos filtrados:', pontosFiltrados);
        exibirPontos(pontosFiltrados);
    })
    .catch(error => {
        console.error('Erro ao buscar pontos:', error);
    });
}

function filtrarPontosPorFuncionario(pontos, nomeFuncionario) {
    console.log('Filtrar pontos por funcionário');
    return pontos.filter(ponto => ponto.funcionario.username.toLowerCase().includes(nomeFuncionario));
}

function exibirPontos(pontos) {
    const tbody = document.getElementById('relatoriosBody');
    tbody.innerHTML = '';

    let entradaPendente = null;

    pontos.forEach(ponto => {
        const tr = document.createElement('tr');
        const funcionarioTd = document.createElement('td');
        const dataTd = document.createElement('td');
        const entradaTd = document.createElement('td');
        const saidaTd = document.createElement('td');

        funcionarioTd.textContent = ponto.funcionario.username;

        if (entradaPendente) {
            entradaTd.textContent = formatarHora(entradaPendente);
            dataTd.textContent = formatarData(entradaPendente);
            entradaPendente = null;
        } else {
            entradaTd.textContent = ponto.comeco ? formatarHora(ponto.comeco) : 'Não registrada';
            dataTd.textContent = ponto.comeco ? formatarData(ponto.comeco) : 'Não registrada';
        }

        if (ponto.fim) {
            saidaTd.textContent = formatarHora(ponto.fim);
        } else {
            entradaPendente = ponto.comeco;
            saidaTd.textContent = 'Não registrada';
            return;
        }

        tr.appendChild(funcionarioTd);
        tr.appendChild(dataTd);
        tr.appendChild(entradaTd);
        tr.appendChild(saidaTd);

        tbody.appendChild(tr);
    });

    if (entradaPendente) {
        tbody.removeChild(tbody.firstChild);
    }
}

function formatarData(dataArray) {
    const [ano, mes, dia] = dataArray;
    return `${dia}/${mes}/${ano}`;
}

function formatarHora(horaArray) {
    const [ano, mes, dia, hora, minuto] = horaArray;
    return `${hora}:${minuto}`;
}
