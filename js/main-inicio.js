
function mostrarSeccion(deporte) {
    // Ocultar la selección inicial
    document.getElementById('sorteo-seleccion').style.display = 'none';

    // Mostrar la sección del deporte seleccionado
    document.getElementById(deporte + '-seccion').style.display = 'block';
}

function volver() {
    // Ocultar todas las secciones de deporte
    let secciones = document.querySelectorAll('.seccion-deporte');
    secciones.forEach(function (seccion) {
        seccion.style.display = 'none';
    });

    // Mostrar la selección inicial
    document.getElementById('sorteo-seleccion').style.display = 'block';
}