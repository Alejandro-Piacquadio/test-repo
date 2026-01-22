export function renderAlumnos(alumnos) {
  const tbody = document.getElementById("tablaAlumnos");
  tbody.innerHTML = "";

  alumnos.forEach(alumno => {
    tbody.innerHTML += `
      <tr>
        <td>${alumno.nombre}</td>
        <td>${alumno.curso}</td>
        <td>${alumno.email}</td>
        <td>
          <button class="btn btn-warning btn-sm editar" data-id="${alumno.id}">
          </button>
          <button class="btn btn-danger btn-sm eliminar" data-id="${alumno.id}">
          </button>
        </td>
      </tr>
    `;
  });
}
