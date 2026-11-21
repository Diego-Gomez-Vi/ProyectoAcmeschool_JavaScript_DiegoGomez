import { getUsers } from "../data/storage.js";

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = getUsers();

    const userFound = users.find(
        user =>
            user.email === email &&
            user.password === password
    );

    if (!userFound) {
        message.textContent = "Correo o contraseña incorrectos";
        return;
    }

    localStorage.setItem(
        "session",
        JSON.stringify(userFound)
    );

    message.style.color = "green";
    message.textContent = "Inicio de sesión exitoso";

    console.log("Usuario autenticado:", userFound);

    setTimeout(() => {
        window.location.href = "./dashboard.html";
    }, 1000);
});