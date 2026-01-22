export function getAlumnos() {
    return JSON.parse(localStorage.getItem("alumnos")) || [];
}

export function saveAlumnos(alumnos) {
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
}
