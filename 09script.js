const endpoint = "https://loteriasaojudas.azurewebsites.net/products/get-all";

// Função para fazer o fetch dos dados do backend
function fetchData() {
    fetch('https://loteriasaojudas.azurewebsites.net/products/get-all', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }) 
    .then(response => response.json())
    .then(data => {
        const totalEstoque = data.reduce((total, produto) => total + produto.quantidade, 0);

        // Calculando as porcentagens de cada produto
        data.forEach(produto => {
            produto.porcentagem = (produto.quantidade / totalEstoque) * 100;
        });

        // Chamada de função para criar o gráfico com os dados
        criarGrafico(data.map(produto => ({ nome: produto.name, porcentagem: produto.porcentagem })));

        // Chamada de função para criar a tabela de produtos com baixo estoque
        criarTabelaBaixoEstoque(data.filter(produto => produto.quantidade < 5));
    })
    .catch(error => {
        console.error("Erro ao buscar os dados:", error);
    });
}

// Função para criar o gráfico com os dados
function criarGrafico(data) {
    const labels = data.map(produto => produto.nome);
    const porcentagens = data.map(produto => produto.porcentagem);

    const config = {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Porcentagem do Estoque',
                data: porcentagens,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(255, 99, 132, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        font: {
                            size: 12 
                        }
                    }
                }
            }
        }
    };

    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, config);
}

// Função para criar a tabela de produtos com baixo estoque
function criarTabelaBaixoEstoque(produtos) {
    const tbody = document.querySelector("#relatorios tbody");
    tbody.innerHTML = ""; // Limpa o conteúdo atual do corpo da tabela

    produtos.forEach(product => {
        const row = document.createElement("tr");

        const cellId = document.createElement("td");
        cellId.textContent = product.id;
        row.appendChild(cellId);

        const cellNome = document.createElement("td");
        cellNome.textContent = product.name;
        row.appendChild(cellNome);

        const cellQuantidade = document.createElement("td");
        cellQuantidade.textContent = product.quantidade;
        row.appendChild(cellQuantidade);

        tbody.appendChild(row);
    });
}

// Chamando a função para buscar os dados ao carregar a página
fetchData();
