document.addEventListener("DOMContentLoaded", function () {

    async function fetchProducts() {
        try {
            const response = await fetch('https://loteriasaojudas.azurewebsites.net/products/get-all', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });
            if (!response.ok) throw new Error('Erro ao buscar produtos');
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            return [];
        }
    }

    async function findProductIdByName(name) {
        const products = await fetchProducts();
        const product = products.find(p => p.name === name);
        return product ? product.id : null;
    }

    async function registrarVenda() {
        const nomeProduto = document.getElementById('nomeProduto').value;
        const idFuncionario = document.getElementById('idFuncionario').value;
        const quantidade = document.getElementById('quantidade').value;

        const idProduct = await findProductIdByName(nomeProduto);

        if (idProduct && idFuncionario) {
            const venda = {
                idProduct,
                idFuncionario,
                quantidade
            };

            try {
                const response = await fetch('https://loteriasaojudas.azurewebsites.net/vendas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(venda)
                });
                if (!response.ok) throw new Error('Erro ao salvar');
                alert("Venda registrada");
            } catch (error) {
                console.error('Erro ao registrar venda:', error);
                alert("Erro ao registrar venda");
            }
        } else {
            alert("Produto não encontrado ou ID do Funcionário inválido");
        }
    }

    document.getElementById('registrarBtn').addEventListener('click', registrarVenda);
});
