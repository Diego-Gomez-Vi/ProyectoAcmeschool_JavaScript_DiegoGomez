const currentSession = JSON.parse(
    localStorage.getItem("session")
);

if (!currentSession) {
    window.location.href = "./index.html";
}

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("session");
    window.location.href = "./index.html";
});

console.log("Dashboard cargado");