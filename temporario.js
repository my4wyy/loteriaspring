document.addEventListener("DOMContentLoaded", function() {
    const employeesContainer = document.getElementById("employees-container");
    const formContainer = document.querySelector('.form-container');
    const deleteConfirmationPopup = document.querySelector('.confirmation-popup');
    
   
    if (!deleteConfirmationPopup) {
        console.error("Element with class 'confirmation-popup' not found.");
    }
    let employeesData = [
        { id: 3, name: "maisa", password: "maisasenha" },
        { id: 5, name: "salim", password: "salimsenha" },
        { id: 6, name: "lukinhas", password: "lukinhassenha" },
        { id: 7, name: "miguel", password: "miguelsenha" },
        { id: 8, name: "duda", password: "dudasenha" },
        { id: 9, name: "faria", password: "fariasenha" },
        { id: 10, name: "novo", password: "novasenha" }
    ];

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
            displayDeleteConfirmation(employee.id);
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

        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Nome:';
        formContainer.appendChild(nameLabel);

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.value = employee.name;
        nameInput.disabled = true; 
        formContainer.appendChild(nameInput);

        const passwordLabel = document.createElement('label');
        passwordLabel.textContent = 'Senha:';
        formContainer.appendChild(passwordLabel);

        const passwordInput = document.createElement('input');
        passwordInput.type = 'text';
        passwordInput.value = employee.password;
        formContainer.appendChild(passwordInput);

        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Confirmar';
        confirmButton.addEventListener('click', function() {
            editEmployee(employee.id, passwordInput.value);
        });
        formContainer.appendChild(confirmButton);

        formContainer.classList.add('active');
    }

    function editEmployee(employeeId, newPassword) {
        const index = employeesData.findIndex(employee => employee.id === employeeId);
        if (index !== -1) {
            employeesData[index].password = newPassword;
            displayEmployees();
            formContainer.classList.remove('active');
            alert("Senha do funcionário editada com sucesso!");
        }
    }

    function displayDeleteConfirmation(employeeId) {
        const deleteConfirmationPopup = document.querySelector('.confirmation-popup');
        if (deleteConfirmationPopup) {
            deleteConfirmationPopup.classList.add('active');
            const confirmedButton = document.getElementById('confirm-delete');
            if (confirmedButton) {
                confirmedButton.onclick = function() {
                    deleteEmployee(employeeId);
                    deleteConfirmationPopup.classList.remove('active');
                };
            } else {
                console.error("Element with id 'confirm-delete' not found.");
            }
        } else {
            console.error("Element with class 'confirmation-popup' not found.");
        }
    }
    
    

    function deleteEmployee(employeeId) {
        const index = employeesData.findIndex(employee => employee.id === employeeId);
        if (index !== -1) {
            employeesData.splice(index, 1);
            displayEmployees();
            alert("Funcionário deletado com sucesso!");
        }
    }

    displayEmployees();
});
