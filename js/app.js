const listaJugadores = [];
const maxJugadoresPorEquipo = {
    5: 5,
    7: 7,
    11: 11
};

let tipoPartidoSeleccionado = null;

// Manejar la selección de tipo de partido mediante botones
document.querySelectorAll('.btn-partido-futbol').forEach(button => {
    button.addEventListener('click', function () {
        // Remover la clase 'selected' de todos los botones
        document.querySelectorAll('.btn-partido-futbol').forEach(btn => btn.classList.remove('selected'));

        // Añadir la clase 'selected' al botón clickeado
        this.classList.add('selected');

        // Guardar el tipo de partido seleccionado
        tipoPartidoSeleccionado = this.getAttribute('data-tipo');
        console.log(`Partido de F${tipoPartidoSeleccionado} seleccionado`);
    });
});

// Agregar jugador
document.getElementById('agregarJugadorFutbol').addEventListener('click', function () {
    const nombreJugador = document.getElementById('jugadorFutbol').value.trim();
    if (nombreJugador) {
        listaJugadores.push(nombreJugador);
        actualizarListaJugadores();
        document.getElementById('jugadorFutbol').value = '';
    }
});

// Sortear equipos
document.getElementById('sortearEquiposFutbol').addEventListener('click', function () {
    if (!tipoPartidoSeleccionado) {
        alert('Por favor, selecciona el tipo de partido (F5, F7, F11).');
        return;
    }

    const maxJugadores = maxJugadoresPorEquipo[tipoPartidoSeleccionado];
    if (listaJugadores.length < maxJugadores * 2) {
        alert(`Necesitas al menos ${maxJugadores * 2} jugadores para un partido de F${tipoPartidoSeleccionado}.`);
        return;
    }
    sortearEquipos(tipoPartidoSeleccionado);
    definirInicioPartido();
});

// Actualizar lista de jugadores con el nuevo diseño
function actualizarListaJugadores() {
    const listaElement = document.getElementById('listaJugadoresFutbol');
    listaElement.innerHTML = ''; // Limpiar la lista actual

    listaJugadores.forEach((jugador, index) => {
        const jugadorDiv = document.createElement('div');
        jugadorDiv.classList.add('jugadorFutbol');

        // Crear el contenido con el nombre del jugador
        const jugadorNombre = document.createElement('span');
        jugadorNombre.textContent = jugador;

        // Crear la cruz para eliminar al jugador
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'X';
        botonEliminar.classList.add('eliminar');

        // Agregar el evento para eliminar al jugador
        botonEliminar.addEventListener('click', function () {
            eliminarJugador(index);
        });

        // Agregar el nombre y el botón al div del jugador
        jugadorDiv.appendChild(jugadorNombre);
        jugadorDiv.appendChild(botonEliminar);

        // Añadir el jugador a la lista de jugadores visualmente
        listaElement.appendChild(jugadorDiv);
    });
}

// Agregar jugador con botón y tecla Enter
document.getElementById('jugadorFutbol').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        agregarJugadorFutbol();
    }
});

document.getElementById('agregarJugadorFutbol').addEventListener('click', function () {
    agregarJugadorFutbol();
});

function agregarJugadorFutbol() {
    const nombreJugador = document.getElementById('jugadorFutbol').value.trim();
    if (nombreJugador) {
        listaJugadores.push(nombreJugador);
        actualizarListaJugadores();
        document.getElementById('jugadorFutbol').value = '';
        document.getElementById('jugadorFutbol').focus(); // Volver a enfocar el input
    }
}


// Eliminar jugador de la lista
function eliminarJugador(index) {
    listaJugadores.splice(index, 1); // Eliminar el jugador de la lista
    actualizarListaJugadores(); // Actualizar la visualización
}

// Sortear equipos
function sortearEquipos(tipoPartido) {
    const jugadoresBarajados = [...listaJugadores].sort(() => 0.5 - Math.random());
    const equipo1 = jugadoresBarajados.slice(0, maxJugadoresPorEquipo[tipoPartido]);
    const equipo2 = jugadoresBarajados.slice(maxJugadoresPorEquipo[tipoPartido], maxJugadoresPorEquipo[tipoPartido] * 2);

    mostrarEquipos(equipo1, equipo2);
}

function mostrarEquipos(equipo1, equipo2) {
    const listaEquipo1 = document.getElementById('listaEquipo1Futbol');
    const listaEquipo2 = document.getElementById('listaEquipo2Futbol');

    listaEquipo1.innerHTML = '';
    listaEquipo2.innerHTML = '';

    equipo1.forEach(jugador => {
        const li = document.createElement('li');
        li.textContent = jugador;
        listaEquipo1.appendChild(li);
    });

    equipo2.forEach(jugador => {
        const li = document.createElement('li');
        li.textContent = jugador;
        listaEquipo2.appendChild(li);
    });
}

const botonCopiar = document.getElementById('copiarContenidoFutbol');

// Función para mostrar los equipos y el botón de copiar
function mostrarEquipos(equipo1, equipo2) {
    const listaEquipo1 = document.getElementById('listaEquipo1Futbol');
    const listaEquipo2 = document.getElementById('listaEquipo2Futbol');

    listaEquipo1.innerHTML = '';
    listaEquipo2.innerHTML = '';

    equipo1.forEach(jugador => {
        const li = document.createElement('li');
        li.textContent = jugador;
        listaEquipo1.appendChild(li);
    });

    equipo2.forEach(jugador => {
        const li = document.createElement('li');
        li.textContent = jugador;
        listaEquipo2.appendChild(li);
    });

    // Mostrar el botón de copiar después de que los equipos se muestren
    botonCopiar.style.display = 'inline-block';
}

const botonParaCopiar = document.getElementById('copiarContenidoFutbol');

// Función para mostrar los equipos y el botón de copiar
function mostrarEquipos(equipo1, equipo2) {
    const listaEquipo1 = document.getElementById('listaEquipo1Futbol');
    const listaEquipo2 = document.getElementById('listaEquipo2Futbol');

    listaEquipo1.innerHTML = '';
    listaEquipo2.innerHTML = '';

    equipo1.forEach(jugador => {
        const li = document.createElement('li');
        li.textContent = jugador;
        listaEquipo1.appendChild(li);
    });

    equipo2.forEach(jugador => {
        const li = document.createElement('li');
        li.textContent = jugador;
        listaEquipo2.appendChild(li);
    });

    // Mostrar el botón de copiar después de que los equipos se muestren
    botonParaCopiar.style.display = 'inline-block';
}

// Función para copiar el contenido de los equipos
botonParaCopiar.addEventListener('click', function () {
    const equipo1 = document.getElementById('listaEquipo1Futbol').innerText;
    const equipo2 = document.getElementById('listaEquipo2Futbol').innerText;
    const textoAIniciar = document.getElementById('inicia').innerText;

    const textoCompleto = `Equipo 1:\n${equipo1}\n\nEquipo 2:\n${equipo2}\n\n${textoAIniciar}`;

    // Copiar el contenido al portapapeles
    navigator.clipboard.writeText(textoCompleto)
        .then(() => {
            // Cambiar el texto del botón a "Copiado"
            botonParaCopiar.textContent = '¡Copiado!';

            // Esperar 3 segundos y volver a cambiar el texto al original
            setTimeout(() => {
                botonParaCopiar.textContent = 'Copiar';
            }, 3000);
        })
        .catch(err => {
            console.error('Error al copiar', err);
        });
});

function definirInicioPartido() {
    const equipoInicial = Math.random() < 0.5 ? 'Equipo 1' : 'Equipo 2';
    document.getElementById('inicia').textContent = `El ${equipoInicial} inicia el partido.`;
}
