import { getUsers, saveUsers } from "../data/storage.js";

const currentSession = JSON.parse(
    localStorage.getItem("session")
);

if (!currentSession) {
    window.location.href = "./index.html";
}

const tableBody = document.getElementById("usersTableBody");

const userForm = document.getElementById("userForm");

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
                    <button class="btn-edit">
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

    const newUser = {
        id: identificacion,
        nombre,
        email,
        telefono,
        cargo,
        password
    };

    users.push(newUser);

    saveUsers(users);

    renderUsers();

    userForm.reset();
});