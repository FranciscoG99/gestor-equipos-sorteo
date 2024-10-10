const listaJugadoresVoley = [];
const maxJugadoresPorEquipoVoley = {
    6: 3,
    8: 4,
    12: 6
};

let tipoPartidoSeleccionadoVoley = null;

// Manejar la selección de tipo de partido mediante botones
document.querySelectorAll('.btn-partido-voley').forEach(button => {
    button.addEventListener('click', function () {
        // Remover la clase 'selected' de todos los botones
        document.querySelectorAll('.btn-partido-voley').forEach(btn => btn.classList.remove('selected'));

        // Añadir la clase 'selected' al botón clickeado
        this.classList.add('selected');

        // Guardar el tipo de partido seleccionado
        tipoPartidoSeleccionadoVoley = this.getAttribute('data-tipo-voley');
        console.log(`Partido de ${tipoPartidoSeleccionadoVoley} jugadores seleccionado`);
    });
});

// Agregar jugador
document.getElementById('agregarJugadorVoley').addEventListener('click', function () {
    const nombreJugadorVoley = document.getElementById('jugadorVoley').value.trim();
    if (nombreJugadorVoley) {
        listaJugadoresVoley.push(nombreJugadorVoley);
        actualizarListaJugadoresVoley();
        document.getElementById('jugadorVoley').value = '';
    }
});

// Sortear equipos
document.getElementById('sortearEquiposVoley').addEventListener('click', function () {
    if (!tipoPartidoSeleccionadoVoley) {
        alert('Por favor, selecciona el tipo de partido (3V3, 4V4, 6V6).');
        return;
    }

    const maxJugadoresVoley = maxJugadoresPorEquipoVoley[tipoPartidoSeleccionadoVoley];
    if (listaJugadoresVoley.length < maxJugadoresVoley * 2) {
        alert(`Necesitas al menos ${maxJugadoresVoley * 2} jugadores para un partido de ${tipoPartidoSeleccionadoVoley / 2}V${tipoPartidoSeleccionadoVoley / 2} Jugadores.`);
        return;
    }
    sortearEquiposVoley(tipoPartidoSeleccionadoVoley);
    definirInicioPartidoVoley();
});

// Actualizar lista de jugadores con el nuevo diseño
function actualizarListaJugadoresVoley() {
    const listaElementVoley = document.getElementById('listaJugadoresVoley');
    listaElementVoley.innerHTML = ''; // Limpiar la lista actual

    listaJugadoresVoley.forEach((jugadorVoley, index) => {
        const jugadorDivVoley = document.createElement('div');
        jugadorDivVoley.classList.add('jugadorVoley');

        // Crear el contenido con el nombre del jugador
        const jugadorNombreVoley = document.createElement('span');
        jugadorNombreVoley.textContent = jugadorVoley;

        // Crear la cruz para eliminar al jugador
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'X';
        botonEliminar.classList.add('eliminar');

        // Agregar el evento para eliminar al jugador
        botonEliminar.addEventListener('click', function () {
            eliminarJugadorVoley(index);
        });

        // Agregar el nombre y el botón al div del jugador
        jugadorDivVoley.appendChild(jugadorNombreVoley);
        jugadorDivVoley.appendChild(botonEliminar);

        // Añadir el jugador a la lista de jugadores visualmente
        listaElementVoley.appendChild(jugadorDivVoley);
    });
}

// Agregar jugador con botón y tecla Enter
document.getElementById('jugadorVoley').addEventListener('keydown', function (evento) {
    if (evento.key === 'Enter') {
        agregarJugadorVoley();
    }
});

document.getElementById('agregarJugadorVoley').addEventListener('click', function () {
    agregarJugadorVoley();
});

function agregarJugadorVoley() {
    const nombreJugadorVoley = document.getElementById('jugadorVoley').value.trim();
    if (nombreJugadorVoley) {
        listaJugadoresVoley.push(nombreJugadorVoley);
        actualizarListaJugadoresVoley();
        document.getElementById('jugadorVoley').value = '';
        document.getElementById('jugadorVoley').focus(); // Volver a enfocar el input
    }
}


// Eliminar jugador de la lista
function eliminarJugadorVoley(index) {
    listaJugadoresVoley.splice(index, 1); // Eliminar el jugador de la lista
    actualizarListaJugadoresVoley(); // Actualizar la visualización
}

// Sortear equipos
function sortearEquiposVoley(tipoPartidoVoley) {
    const jugadoresBarajadosVoley = [...listaJugadoresVoley].sort(() => 0.5 - Math.random());
    const equipo1Voley = jugadoresBarajadosVoley.slice(0, maxJugadoresPorEquipoVoley[tipoPartidoVoley]);
    const equipo2Voley = jugadoresBarajadosVoley.slice(maxJugadoresPorEquipoVoley[tipoPartidoVoley], maxJugadoresPorEquipoVoley[tipoPartidoVoley] * 2);

    mostrarEquiposVoley(equipo1Voley, equipo2Voley);
}

function mostrarEquiposVoley(equipo1Voley, equipo2Voley) {
    const listaEquipo1Voley = document.getElementById('listaEquipo1Voley');
    const listaEquipo2Voley = document.getElementById('listaEquipo2Voley');

    listaEquipo1Voley.innerHTML = '';
    listaEquipo2Voley.innerHTML = '';

    equipo1Voley.forEach(jugadorVoley => {
        const liVoley = document.createElement('li');
        liVoley.textContent = jugadorVoley;
        listaEquipo1Voley.appendChild(liVoley);
    });

    equipo2Voley.forEach(jugador => {
        const li = document.createElement('li');
        li.textContent = jugadorVoley;
        listaEquipo2Voley.appendChild(liVoley);
    });
}

const botonCopiarVoley = document.getElementById('copiarContenidoVoley');

// Función para mostrar los equipos y el botón de copiar
function mostrarEquiposVoley(equipo1Voley, equipo2Voley) {
    const listaEquipo1Voley = document.getElementById('listaEquipo1Voley');
    const listaEquipo2Voley = document.getElementById('listaEquipo2Voley');

    listaEquipo1Voley.innerHTML = '';
    listaEquipo2Voley.innerHTML = '';

    equipo1Voley.forEach(jugadorVoley => {
        const li = document.createElement('li');
        li.textContent = jugadorVoley;
        listaEquipo1Voley.appendChild(li);
    });

    equipo2Voley.forEach(jugadorVoley => {
        const li = document.createElement('li');
        li.textContent = jugadorVoley;
        listaEquipo2Voley.appendChild(li);
    });

    // Mostrar el botón de copiar después de que los equipos se muestren
    botonCopiar.style.display = 'inline-block';
}

const botonParaCopiarVoley = document.getElementById('copiarContenidoVoley');

// Función para mostrar los equipos y el botón de copiar
function mostrarEquiposVoley(equipo1Voley, equipo2Voley) {
    const listaEquipo1Voley = document.getElementById('listaEquipo1Voley');
    const listaEquipo2Voley = document.getElementById('listaEquipo2Voley');

    listaEquipo1Voley.innerHTML = '';
    listaEquipo2Voley.innerHTML = '';

    equipo1Voley.forEach(jugadorVoley => {
        const li = document.createElement('li');
        li.textContent = jugadorVoley;
        listaEquipo1Voley.appendChild(li);
    });

    equipo2Voley.forEach(jugadorVoley => {
        const li = document.createElement('li');
        li.textContent = jugadorVoley;
        listaEquipo2Voley.appendChild(li);
    });

    // Mostrar el botón de copiar después de que los equipos se muestren
    botonParaCopiarVoley.style.display = 'inline-block';
}

// Función para copiar el contenido de los equipos
botonParaCopiarVoley.addEventListener('click', function () {
    const equipo1Voley = document.getElementById('listaEquipo1Voley').innerText;
    const equipo2Voley = document.getElementById('listaEquipo2Voley').innerText;
    const textoAIniciarVoley = document.getElementById('inicia').innerText;

    const textoCompletoVoley = `Equipo 1:\n${equipo1Voley}\n\nEquipo 2:\n${equipo2Voley}\n\n${textoAIniciarVoley}`;

    // Copiar el contenido al portapapeles
    navigator.clipboard.writeText(textoCompletoVoley)
        .then(() => {
            // Cambiar el texto del botón a "Copiado"
            botonParaCopiarVoley.textContent = '¡Copiado!';

            // Esperar 3 segundos y volver a cambiar el texto al original
            setTimeout(() => {
                botonParaCopiarVoley.textContent = 'Copiar';
            }, 3000);
        })
        .catch(err => {
            console.error('Error al copiar', err);
        });
});

function definirInicioPartidoVoley() {
    const equipoInicialVoley = Math.random() < 0.5 ? 'Equipo 1' : 'Equipo 2';
    document.getElementById('iniciaVoley').textContent = `El ${equipoInicialVoley} inicia el partido.`;
}
