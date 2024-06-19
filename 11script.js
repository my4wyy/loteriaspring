document.addEventListener("DOMContentLoaded", function() {
    const employeesContainer = document.getElementById("employees-container");
    const formContainer = document.querySelector('.form-container');
    let employeesData = [];

   
    function loadEmployees() {
        const token = localStorage.getItem('token'); 
    fetch('https://loteriasaojudas.azurewebsites.net/user/get-all', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error('Erro na resposta do servidor');
    }
    return response.json();
})
.then(data => {
    console.log(data);
})
.catch(error => console.error('Erro ao carregar os funcionários:', error));

    }

    function displayEmployees() {
        employeesContainer.innerHTML = '';
        employeesData.forEach(employee => {
            const card = createEmployeeCard(employee);
            employeesContainer.appendChild(card);
        });
    }

    function createEmployeeCard(employee) {
        const card = document.createElement('div');
        card.classList.add('employee-card');
        card.dataset.id = employee.id;

        const name = document.createElement('h3');
        name.classList.add('employee-name');
        name.textContent = employee.name;
        card.appendChild(name);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('employee-buttons');

        const editButton = document.createElement('button');
        editButton.classList.add('edit');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', function() {
            displayEditForm(employee);
        });
        buttonsContainer.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.textContent = 'Deletar';
        deleteButton.addEventListener('click', function() {
            displayDeleteConfirmation(employee);
        });
        buttonsContainer.appendChild(deleteButton);

        card.appendChild(buttonsContainer);

        return card;
    }

    function displayEditForm(employee) {
        formContainer.innerHTML = '';

        const formTitle = document.createElement('h3');
        formTitle.textContent = 'Editar Funcionário';
        formContainer.appendChild(formTitle);

        const form = document.createElement('form');
        form.id = 'employee-form';

        const idInput = document.createElement('input');
        idInput.type = 'hidden';
        idInput.id = 'id';
        idInput.name = 'id';
        idInput.value = employee.id;
        form.appendChild(idInput);

        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Nome:';
        form.appendChild(nameLabel);

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.id = 'name';
        nameInput.name = 'name';
        nameInput.value = employee.name;
        nameInput.disabled = true; 
        form.appendChild(nameInput);

        const passwordLabel = document.createElement('label');
        passwordLabel.textContent = 'Senha:';
        form.appendChild(passwordLabel);

        const passwordInput = document.createElement('input');
        passwordInput.type = 'text';
        passwordInput.id = 'password';
        passwordInput.name = 'password';
        passwordInput.value = employee.password;
        form.appendChild(passwordInput);

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Salvar';
        saveButton.type = 'submit';
        form.appendChild(saveButton);

        formContainer.appendChild(form);
        formContainer.classList.add('active');

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const updatedEmployee = {
                id: idInput.value,
                name: nameInput.value,
                password: passwordInput.value
            };
            editEmployee(updatedEmployee);
        });
    }

    function editEmployee(employee) {
        fetch('https://loteriasaojudas.azurewebsites.net/user/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        })
        .then(response => response.json())
        .then(data => {
            // Atualizar o dado do funcionário no array local
            const index = employeesData.findIndex(emp => emp.id === employee.id);
            if (index !== -1) {
                employeesData[index] = data;
                displayEmployees();
                formContainer.classList.remove('active');
                alert("Funcionário atualizado com sucesso!");
            }
        })
        .catch(error => console.error('Erro ao editar o funcionário:', error));
    }

    function displayDeleteConfirmation(employee) {
        if (confirm('Tem certeza que deseja deletar este funcionário?')) {
            deleteEmployee(employee);
        }
    }

    function deleteEmployee(employee) {
        fetch('https://loteriasaojudas.azurewebsites.net/user/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        })
        .then(response => {
            if (response.ok) {
                const index = employeesData.findIndex(emp => emp.id === employee.id);
                if (index !== -1) {
                    employeesData.splice(index, 1);
                    displayEmployees();
                    alert("Funcionário deletado com sucesso!");
                }
            } else {
                throw new Error('Erro ao deletar funcionário.');
            }
        })
        .catch(error => console.error('Erro ao deletar o funcionário:', error));
    }

    loadEmployees();
});