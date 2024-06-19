document.addEventListener("DOMContentLoaded", function() {
    const productForm = document.getElementById('product-form');

    productForm.addEventListener('submit', function(event) {
        event.preventDefault();
        saveProduct();
    });

    
    function fillFormWithProductData(product) {
        document.getElementById('nome').value = product.name;
        document.getElementById('preco').value = product.price;
        document.getElementById('codigo').value = product.code;
        document.getElementById('vendido').value = product.type;
        document.getElementById('detalhes').value = product.additionalDetails;
        document.getElementById('funcionario').value = product.employeeWhoRegistered;
    }

    function fetchAndFillProductData(productId) {
        fetch(`https://loteriasaojudas.azurewebsites.net/products/get-all`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erro ao buscar produtos para edição');
        })
        .then(products => {
            const product = products.find(p => p.id === productId);
            if (product) {
                fillFormWithProductData(product);
            } else {
                throw new Error(`Produto com ID ${productId} não encontrado`);
            }
        })
        .catch(error => {
            console.error('Erro ao buscar produto para edição:', error);
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    const product = location.search;
    console.log(product);

    if (productId) {
        fetchAndFillProductData(productId);
    }

    

   

    function saveProduct() {
        const productData = {
            name: document.getElementById('nome').value,
            price: parseFloat(document.getElementById('preco').value),
            code: document.getElementById('codigo').value,
            type: document.getElementById('vendido').value,
            additionalDetails: document.getElementById('detalhes').value,
            employeeWhoRegistered: document.getElementById('funcionario').value
        };

        fetch('https://loteriasaojudas.azurewebsites.net/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
        .then(response => {
            if (!response.ok) {
                alert("erro");
                throw new Error('Erro ao salvar o produto');
            }
            alert("Produto salvo com sucesso!");
            window.location.href = '/03estoque.html'
        })
    }


    
    
});
