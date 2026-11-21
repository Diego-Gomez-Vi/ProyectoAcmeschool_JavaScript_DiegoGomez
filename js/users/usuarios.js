import { getUsers, saveUsers } from "../data/storage.js";

const currentSession = JSON.parse(
    localStorage.getItem("session")
);

if (!currentSession) {
    window.location.href = "./index.html";
}

const tableBody = document.getElementById("usersTableBody");

const userForm = document.getElementById("userForm");

const submitBtn = document.getElementById("submitBtn");

let editingUserId = null;

function renderUsers() {

    const users = getUsers();

    tableBody.innerHTML = "";

    users.forEach(user => {

        tableBody.innerHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.nombre}</td>
                <td>${user.email}</td>
                <td>${user.cargo}</td>
                <td>
                    <button
                        class="btn-edit"
                        data-id="${user.id}"
                    >
                        Editar
                    </button>

                    <button 
                        class="btn-delete"
                        data-id="${user.id}"
                    >
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });

    const deleteButtons =
        document.querySelectorAll(".btn-delete");

    deleteButtons.forEach(button => {

        button.addEventListener("click", () => {

            const userId =
                button.dataset.id;

            deleteUser(userId);

        });

    });

    const editButtons =
        document.querySelectorAll(".btn-edit");

    editButtons.forEach(button => {

        button.addEventListener("click", () => {

            const userId =
                button.dataset.id;

            editUser(userId);

        });

    });
}

renderUsers();

function deleteUser(userId) {

    const users = getUsers();

    const filteredUsers = users.filter(
        user => user.id !== userId
    );

    saveUsers(filteredUsers);

    renderUsers();
}

function editUser(userId) {

    const users = getUsers();

    const user = users.find(
        user => user.id === userId
    );

    if (!user) return;

    document.getElementById("identificacion").value =
        user.id;

    document.getElementById("nombre").value =
        user.nombre;

    document.getElementById("email").value =
        user.email;

    document.getElementById("telefono").value =
        user.telefono;

    document.getElementById("cargo").value =
        user.cargo;

    document.getElementById("password").value =
        user.password;

    editingUserId = userId;

    submitBtn.textContent = "Actualizar Usuario";
}

console.log("Módulo de usuarios cargado");

userForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const identificacion =
        document.getElementById("identificacion").value;

    const nombre =
        document.getElementById("nombre").value;

    const email =
        document.getElementById("email").value;

    const telefono =
        document.getElementById("telefono").value;

    const cargo =
        document.getElementById("cargo").value;

    const password =
        document.getElementById("password").value;

    const users = getUsers();

    if (editingUserId) {

        const userIndex = users.findIndex(
            user => user.id === editingUserId
        );

        users[userIndex] = {
            id: identificacion,
            nombre,
            email,
            telefono,
            cargo,
            password
        };

        editingUserId = null;

        submitBtn.textContent = "Guardar Usuario";

    } else {

        const newUser = {
            id: identificacion,
            nombre,
            email,
            telefono,
            cargo,
            password
        };

        users.push(newUser);

    }

    saveUsers(users);

    renderUsers();

    userForm.reset();
});