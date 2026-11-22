const USERS_KEY = "users";

export function initializeData() {

    const users = JSON.parse(localStorage.getItem(USERS_KEY));

    if (!users || users.length === 0) {

        const adminUser = [
            {
                id: "1000",
                nombre: "Administrador",
                email: "admin@acmeschool.com",
                telefono: "3000000000",
                cargo: "Administrativo",
                password: "123456"
            }
        ];

        localStorage.setItem(
            USERS_KEY,
            JSON.stringify(adminUser)
        );
    }
}

export function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

export function saveUsers(users) {
    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );
}

const EXAMS_KEY = "exams";

export function getExams() {
    return JSON.parse(
        localStorage.getItem(EXAMS_KEY)
    ) || [];
}

export function saveExams(exams) {
    localStorage.setItem(
        EXAMS_KEY,
        JSON.stringify(exams)
    );
}