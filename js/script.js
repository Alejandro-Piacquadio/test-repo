import { getAlumnos, saveAlumnos } from "./storage.js";
import { renderAlumnos } from "./ui.js";

let alumnos = getAlumnos();

function contarPorCurso(alumnos) {
    const conteo = {};

    alumnos.forEach(a => {
        conteo[a.curso] = (conteo[a.curso] || 0) + 1;
    });

    return conteo;
}

let grafica;

function renderGrafica(alumnos) {
    const datos = contarPorCurso(alumnos);

    const ctx = document
        .getElementById("graficaCursos")
        .getContext("2d");

    if (grafica) {
        grafica.destroy();
    }

    grafica = new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(datos),
            datasets: [{
                label: "Número de alumnos",
                data: Object.values(datos)
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    renderAlumnos(alumnos);
    renderGrafica(alumnos);
});

// Formulario
const form = document.getElementById("formAlumno");

form.addEventListener("submit", e => {
    e.preventDefault();

    const id = document.getElementById("alumnoId").value;
    const nombre = document.getElementById("nombre").value;
    const curso = document.getElementById("curso").value;
    const email = document.getElementById("email").value;

    if (id) {
        // EDITAR
        alumnos = alumnos.map(a =>
            a.id == id ? { id: Number(id), nombre, curso, email } : a
        );
    } else {
        // CREAR
        alumnos.push({
            id: Date.now(),
            nombre,
            curso,
            email
        });
    }

    saveAlumnos(alumnos);
    renderAlumnos(alumnos);
    renderGrafica(alumnos);

    form.reset();
    document.getElementById("alumnoId").value = "";

    const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalAlumno")
    );
    modal.hide();
});

document.getElementById("tablaAlumnos").addEventListener("click", e => {

    // ELIMINAR
    if (e.target.classList.contains("eliminar")) {
        const id = e.target.dataset.id;

        Swal.fire({
            title: "¿Eliminar alumno?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar"
        }).then(result => {
            if (result.isConfirmed) {
                alumnos = alumnos.filter(a => a.id != id);
                saveAlumnos(alumnos);
                renderAlumnos(alumnos);
                renderGrafica(alumnos);
            }
        });
    }

    // EDITAR
    if (e.target.classList.contains("editar")) {
        const id = e.target.dataset.id;
        const alumno = alumnos.find(a => a.id == id);

        document.getElementById("alumnoId").value = alumno.id;
        document.getElementById("nombre").value = alumno.nombre;
        document.getElementById("curso").value = alumno.curso;
        document.getElementById("email").value = alumno.email;

        const modal = new bootstrap.Modal(
            document.getElementById("modalAlumno")
        );
        modal.show();
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const toggleDark = document.getElementById("toggleDark");

    if (!toggleDark) return;

    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
        toggleDark.textContent = "Modo claro";
    }

    toggleDark.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const activo = document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", activo);

        toggleDark.textContent = activo
            ? "Modo claro"
            : "Modo oscuro";
    });
});