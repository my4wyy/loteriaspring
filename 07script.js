document.addEventListener("DOMContentLoaded", function () {

    function consultarVendasPorProdutoENomeFuncionario(nomeProduto, nomeFuncionario) {
        console.log('Nome do produto:', nomeProduto);
        console.log('Nome do funcionário:', nomeFuncionario);
        
        fetch('https://loteriasaojudas.azurewebsites.net/vendas/get-all', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erro ao buscar vendas');
        })
        .then(data => {
            let vendasFiltradas = data;

            if (nomeProduto) {
                vendasFiltradas = vendasFiltradas.filter(venda => venda.produto.name.toLowerCase().includes(nomeProduto.toLowerCase()));
            }

            if (nomeFuncionario) {
                vendasFiltradas = vendasFiltradas.filter(venda => venda.funcionario.username.toLowerCase().includes(nomeFuncionario.toLowerCase()));
            }

            console.log('Vendas filtradas:', vendasFiltradas);
            const tbody = document.querySelector('#relatorios tbody');
            tbody.innerHTML = ''; 

            vendasFiltradas.forEach(venda => {
                const row = document.createElement('tr');

                const cellProduto = document.createElement('td');
                cellProduto.textContent = venda.produto.name;
                row.appendChild(cellProduto);

                const cellFuncionario = document.createElement('td');
                cellFuncionario.textContent = venda.funcionario.username;
                row.appendChild(cellFuncionario);

                const cellQuantidade = document.createElement('td');
                cellQuantidade.textContent = venda.quantidade;
                row.appendChild(cellQuantidade);

                const cellDetalhes = document.createElement('td');
                const detalhesBtn = document.createElement('button');
                detalhesBtn.textContent = 'Detalhes';
                detalhesBtn.addEventListener('click', () => showProductDetails(venda.produto.id));
                cellDetalhes.appendChild(detalhesBtn);
                row.appendChild(cellDetalhes);

                tbody.appendChild(row);
            });

            const totalVendas = vendasFiltradas.reduce((total, venda) => total + venda.quantidade, 0);
            document.getElementById('quantidadeSaida').innerText = `Quantidade total de vendas: ${totalVendas}`;
        })
        .catch(error => console.error('Erro ao buscar vendas:', error));
    }

    function showProductDetails(productId) {
        fetch('https://loteriasaojudas.azurewebsites.net/products/get-all', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erro ao buscar produtos');
        })
        .then(data => {
            const product = data.find(product => product.id === productId);
            if (product) {
                const productDetailsContent = document.getElementById('productDetailsContent');
                productDetailsContent.innerHTML = `
                    <p>ID: ${product.id}</p>
                    <p>Nome: ${product.name}</p>
                    <p>Preço: ${product.price}</p>
                    <p>Descrição: ${product.additionalDetails}</p>
                `;
                document.querySelector('.overlay').style.display = 'flex';
                document.getElementById('productDetailsPopup').style.display = 'block';
            }
        })
        .catch(error => console.error('Erro ao buscar produtos:', error));
    }

    function closePopup() {
        document.querySelector('.overlay').style.display = 'none';
        document.getElementById('productDetailsPopup').style.display = 'none';
    }

    document.getElementById('consultarBtn').addEventListener('click', function () {
        const nomeProduto = document.getElementById('nomeProduto').value;
        const nomeFuncionario = document.getElementById('nomeFuncionario').value;
        consultarVendasPorProdutoENomeFuncionario(nomeProduto, nomeFuncionario);
    });

    document.querySelector('.overlay').addEventListener('click', closePopup);
    document.getElementById('closePopupBtn').addEventListener('click', closePopup);
});
