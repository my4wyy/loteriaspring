document.addEventListener("DOMContentLoaded", function() {
    const productCardsContainer = document.getElementById("products-container");
    const formContainer = document.querySelector('.form-container');
    
    function fetchAndDisplayProducts() {
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
                productCardsContainer.innerHTML = '';
                data.forEach(product => {
                    const card = createProductCard(product);
                    productCardsContainer.appendChild(card);
                });
            })
            .catch(error => console.error('Erro ao buscar produtos:', error));
    }

    function createProductCard(product) {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.dataset.id = product.id;

        const name = document.createElement('h3');
        name.textContent = product.name;
        card.appendChild(name);

        const quantity = document.createElement('p');
        quantity.textContent = `Quantidade: ${product.quantidade}`;
        card.appendChild(quantity);

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', function() {
            displayProductForm(product);
        });
        card.appendChild(editButton);

        return card;
    }

    function displayProductForm(product) {
        formContainer.innerHTML = '';

        const form = document.createElement('form');
        form.id = 'product-form';

        const codigoInput = document.createElement('input');
        codigoInput.type = 'hidden';
        codigoInput.id = 'codigo';
        codigoInput.name = 'codigo';
        codigoInput.value = product.id;
        form.appendChild(codigoInput);
        

        const quantidadeLabel = document.createElement('label');
        quantidadeLabel.textContent = 'Nova quantidade de produtos:';
        form.appendChild(quantidadeLabel);

        const quantidadeInput = document.createElement('input');
        quantidadeInput.type = 'number';
        quantidadeInput.id = 'quantidade';
        quantidadeInput.name = 'quantidade';
        quantidadeInput.value = product.quantidade;
        form.appendChild(quantidadeInput);

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Salvar';
        saveButton.type = 'submit';
        form.appendChild(saveButton);

        formContainer.appendChild(form);

        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const newQuantity = parseInt(quantidadeInput.value);
            const productId = parseInt(codigoInput.value);

            fetch('https://loteriasaojudas.azurewebsites.net/products/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...product, quantidade: newQuantity })
            })
            .then(response => {
                if (response.ok) {
                    updateProductCard({...product, quantidade: newQuantity});
                } else {
                    throw new Error('Erro ao atualizar a quantidade do produto');
                }
            })
            .catch(error => console.error('Erro ao atualizar a quantidade do produto:', error));

            form.reset();
        });
    }

    function updateProductCard(product) {
        const card = document.querySelector(`.product-card[data-id="${product.id}"]`);
        if (card) {
            const quantityElement = card.querySelector('p');
            if (quantityElement) {
                quantityElement.textContent = `Quantidade: ${product.quantidade}`;
            }
        }
        alert("Quantidade atualizada!");

    }

    
    fetchAndDisplayProducts();
});
