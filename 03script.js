document.addEventListener("DOMContentLoaded", function() {
    const productCardsContainer = document.getElementById("products-container");
    const formContainer = document.querySelector('.form-container');
    const busca = document.getElementById('busca');
    const buscaBotao = document.getElementById('buscaBotao');
    
    function fetchAndDisplayProducts() {
        fetch('http://localhost:8080/products/get-all', {
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

        const price = document.createElement('p');
        price.textContent = product.price;
        card.appendChild(price);

        const type = document.createElement('p');
        type.textContent = product.type;
        card.appendChild(type);

        const code = document.createElement('p');
        code.textContent = product.code;
        card.appendChild(code);

        const additionalDetails = document.createElement('p');
        additionalDetails.textContent = product.additionalDetails;
        card.appendChild(additionalDetails);
        
        const employeeWhoRegistered = document.createElement('p');
        employeeWhoRegistered.textContent = product.employeeWhoRegistered;
        card.appendChild(employeeWhoRegistered);

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', function() {
            displayProductForm(product);
        });

        card.appendChild(editButton);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'deletar';
        deleteButton.addEventListener('click', function() {
            deleteProduct(product);
        });
        card.appendChild(deleteButton);

        return card;
    }


    function displayProductForm(product) {
        formContainer.innerHTML = '';
        formContainer.style.display = 'block';

        const closeButton = document.createElement('button');
        closeButton.textContent = 'X';
        closeButton.classList.add('close-button');
        closeButton.addEventListener('click', function() {
            formContainer.style.display = 'none';
        });
        formContainer.appendChild(closeButton);
        
    formContainer.appendChild(closeButton);

        const form = document.createElement('form');
        form.id = 'product-form';

        const codigoInput = document.createElement('input');
        codigoInput.type = 'hidden';
        codigoInput.id = 'codigo';
        codigoInput.name = 'codigo';
        codigoInput.value = product.id;
        form.appendChild(codigoInput);

        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Nome:';
        form.appendChild(nameLabel);

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.id = 'name';
        nameInput.name = 'name';
        nameInput.value = product.name;
        form.appendChild(nameInput);

        const priceLabel = document.createElement('label');
        priceLabel.textContent = 'Preço:';
        form.appendChild(priceLabel);

        const priceInput = document.createElement('input');
        priceInput.type = 'number';
        priceInput.id = 'price';
        priceInput.name = 'price';
        priceInput.value = product.price;
        form.appendChild(priceInput);

        const typeLabel = document.createElement('label');
        typeLabel.textContent = 'Tipo:';
        form.appendChild(typeLabel);

        const typeInput = document.createElement('input');
        typeInput.type = 'text';
        typeInput.id = 'type';
        typeInput.name = 'type';
        typeInput.value = product.type;
        form.appendChild(typeInput);

        const codeLabel = document.createElement('label');
        codeLabel.textContent = 'Código:';
        form.appendChild(codeLabel);

        const codeInput = document.createElement('input');
        codeInput.type = 'text';
        codeInput.id = 'code';
        codeInput.name = 'code';
        codeInput.value = product.code;
        form.appendChild(codeInput);

        const detailsLabel = document.createElement('label');
        detailsLabel.textContent = 'Detalhes Adicionais:';
        form.appendChild(detailsLabel);

        const detailsInput = document.createElement('input');
        detailsInput.type = 'text';
        detailsInput.id = 'additionalDetails';
        detailsInput.name = 'additionalDetails';
        detailsInput.value = product.additionalDetails;
        form.appendChild(detailsInput);

        const employeeLabel = document.createElement('label');
        employeeLabel.textContent = 'Funcionário que Cadastrou:';
        form.appendChild(employeeLabel);

        const employeeInput = document.createElement('input');
        employeeInput.type = 'text';
        employeeInput.id = 'employeeWhoRegistered';
        employeeInput.name = 'employeeWhoRegistered';
        employeeInput.value = product.employeeWhoRegistered;
        form.appendChild(employeeInput);

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Salvar';
        saveButton.type = 'submit';
        form.appendChild(saveButton);

        formContainer.appendChild(form);

        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const newProduct = {
                name: nameInput.value,
                price: priceInput.value,
                type: typeInput.value,
                code: codeInput.value,
                additionalDetails: additionalDetails.value,
                employeeWhoRegistered: employeeWhoRegistered.value,
            };

            const productId = parseInt(codigoInput.value);

            fetch('http://localhost:8080/products/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...product, ...newProduct})
            })
            .then(response => {
                if (response.ok) {
                    updateProductCard({...product, ...newProduct});
                    formContainer.style.display = 'none';
                } else {
                    throw new Error('Erro ao atualizar o produto');
                }
            })
            .catch(error => console.error('Erro ao atualizar o produto:', error));

            form.reset();
        });
    }

    function updateProductCard(product) {
        const card = document.querySelector(`.product-card[data-id="${product.id}"]`);
        if (card) {
            const nameElement = card.querySelector('h3');
            if (nameElement) {
                nameElement.textContent = `${product.name}`;
            }
            const priceElement = card.querySelector('p:nth-child(2)');
            if (priceElement) {
                priceElement.textContent = `${product.price}`;
            }
            const typeElement = card.querySelector('p:nth-child(3)');
            if (typeElement) {
                typeElement.textContent = `${product.type}`;
            }
            const codeElement = card.querySelector('p:nth-child(4)');
            if (codeElement) {
                codeElement.textContent = `${product.code}`;
            }
            const additionalDetailsElement = card.querySelector('p:nth-child(5)');
            if (additionalDetailsElement) {
                additionalDetailsElement.textContent = `${product.additionalDetails}`;
            }
            const employeeWhoRegisteredElement = card.querySelector('p:nth-child(6)');
            if (employeeWhoRegisteredElement) {
                employeeWhoRegisteredElement.textContent = `${product.employeeWhoRegistered}`;
            }
        }
        alert("Produto atualizado!");
    }

    fetchAndDisplayProducts();

    function deleteProduct(product) {
        console.log(product);
        fetch('https://loteriasaojudas.azurewebsites.net/products/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...product })
            })
            .then(response => {
                if (response.ok) {
                    alert('Ítem deletado com sucesso!')
                    window.location.reload()
                } else {
                    throw new Error('Erro');
                }
            })
            .catch(error => console.error('Erro', error));
    }

    // DIVISADIVISAOSIASBVISAO D DIVISAO

    
        
        
    
       
    
    function displayFilteredProducts(searchTerm) {
        productCardsContainer.innerHTML = '';
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
                    console.log("Dados dos produtos recebidos:", data); // Adicione este log para verificar os dados recebidos da API
                    const searchTermTrimmed = searchTerm.trim().toLowerCase();
                    console.log("Termo de pesquisa:", searchTermTrimmed);
                    const filteredProducts = data.filter(product => 
                        product.name.toLowerCase().includes(searchTermTrimmed)
                    );
                    console.log("Produtos filtrados:", filteredProducts);
            
                    if (filteredProducts.length > 0) {
                        console.log("Produtos encontrados:", filteredProducts);
                        filteredProducts.forEach(product => {
                            const card = createProductCard(product);
                            productCardsContainer.appendChild(card);
                        });
                    } else {
                        console.log("Nenhum produto encontrado.");
                    }
                })
                .catch(error => console.error('Erro ao buscar produtos:', error));
    }
    
        
      
        
        
        
        
        
        buscaBotao.addEventListener('click', function() {
            console.log('Botão de pesquisa clicado.');
            const searchValue = busca.value.trim();
            console.log('Termo de pesquisa:', searchValue);
            if (searchValue !== '') {
                displayFilteredProducts(searchValue);
            }
        });
        
        fetchAndDisplayProducts();
    });
    
    
    
    
    


