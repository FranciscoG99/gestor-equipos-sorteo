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
        document.querySelectorAll('.btn-partido-futbol').forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');
        tipoPartidoSeleccionado = this.getAttribute('data-tipo');
        console.log(`Partido de F${tipoPartidoSeleccionado} seleccionado`);
    });
});

// Función para actualizar la visibilidad del botón "limpiar"
function actualizarBotonLimpiar() {
    const limpiarJugadoresBtn = document.getElementById('limpiar-jugadores');
    if (listaJugadores.length > 0) {
        limpiarJugadoresBtn.style.display = 'block';
    } else {
        limpiarJugadoresBtn.style.display = 'none';
    }
}

// Inicialmente ocultamos el botón de limpiar
document.getElementById('limpiar-jugadores').style.display = 'none';

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
        document.getElementById('jugadorFutbol').focus();
        actualizarBotonLimpiar(); // Mostrar el botón de limpiar si hay jugadores
    }
}

function actualizarListaJugadores() {
    const listaElement = document.getElementById('listaJugadoresFutbol');
    listaElement.innerHTML = '';
    listaJugadores.forEach((jugador, index) => {
        const jugadorDiv = document.createElement('div');
        jugadorDiv.classList.add('jugadorFutbol');
        const jugadorNombre = document.createElement('span');
        jugadorNombre.textContent = jugador;
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'X';
        botonEliminar.classList.add('eliminar');
        botonEliminar.addEventListener('click', function () {
            eliminarJugador(index);
        });
        jugadorDiv.appendChild(jugadorNombre);
        jugadorDiv.appendChild(botonEliminar);
        listaElement.appendChild(jugadorDiv);
    });
}

// Limpiar lista de jugadores
document.getElementById('limpiar-jugadores').addEventListener('click', function () {
    listaJugadores.length = 0; // Vacía el array
    actualizarListaJugadores(); // Actualiza la lista visualmente
    actualizarBotonLimpiar(); // Ocultar el botón de limpiar
});

// Eliminar jugador de la lista
function eliminarJugador(index) {
    listaJugadores.splice(index, 1);
    actualizarListaJugadores();
    actualizarBotonLimpiar(); // Actualizar visibilidad del botón
}

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

    // Mostrar el botón de copiar después de que los equipos se muestren
    document.getElementById('copiarContenidoFutbol').style.display = 'inline-block';
}

// Copiar el contenido de los equipos
const botonCopiar = document.getElementById('copiarContenidoFutbol');
botonCopiar.addEventListener('click', function () {
    const equipo1 = document.getElementById('listaEquipo1Futbol').innerText;
    const equipo2 = document.getElementById('listaEquipo2Futbol').innerText;
    const textoAIniciar = document.getElementById('inicia').innerText;

    const textoCompleto = `Equipo 1:\n${equipo1}\n\nEquipo 2:\n${equipo2}\n\n${textoAIniciar}`;
    navigator.clipboard.writeText(textoCompleto)
        .then(() => {
            botonCopiar.textContent = '¡Copiado!';
            setTimeout(() => {
                botonCopiar.textContent = 'Copiar';
            }, 3000);
        })
        .catch(err => {
            console.error('Error al copiar', err);
        });
});

// Definir qué equipo inicia el partido
function definirInicioPartido() {
    const equipoInicial = Math.random() < 0.5 ? 'Equipo 1' : 'Equipo 2';
    document.getElementById('inicia').textContent = `El ${equipoInicial} inicia el partido.`;
}

// ESTO ES NUEVO Y A CHEQUEAR. BOTONES PARA AGREGAR Y CARGAR JUGADORES
// Lista de jugadores
let jugadoresFutbol = [];

// Función para agregar un jugador
document.getElementById('agregarJugadorFutbol').addEventListener('click', function () {
    const inputJugador = document.getElementById('jugadorFutbol');
    const nombreJugador = inputJugador.value.trim();

    if (nombreJugador !== '') {
        jugadoresFutbol.push(nombreJugador);
        mostrarJugadores();
        inputJugador.value = ''; // Limpiar el campo de entrada
        inputJugador.focus(); // Focalizar nuevamente en el input
    }
});

// Mostrar jugadores en la lista
function mostrarJugadores() {
    const listaJugadoresFutbol = document.getElementById('listaJugadoresFutbol');
    listaJugadoresFutbol.innerHTML = '';

    jugadoresFutbol.forEach((jugador, index) => {
        const li = document.createElement('li');
        li.textContent = jugador;
        // Botón para eliminar jugador
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'X';
        botonEliminar.addEventListener('click', () => {
            jugadoresFutbol.splice(index, 1); // Eliminar jugador de la lista
            mostrarJugadores(); // Actualizar la lista en pantalla
        });

        li.appendChild(botonEliminar);
        listaJugadoresFutbol.appendChild(li);
    });
}

// Guardar jugadores en localStorage
document.getElementById('guardarJugadoresFutbol').addEventListener('click', function () {
    if (jugadoresFutbol.length > 0) {
        localStorage.setItem('jugadoresFutbol', JSON.stringify(jugadoresFutbol));
        alert('Lista de jugadores guardada correctamente.');
    } else {
        alert('No hay jugadores para guardar.');
    }
});

// Cargar jugadores guardados de localStorage
document.getElementById('cargarJugadoresFutbol').addEventListener('click', function () {
    const jugadoresGuardados = localStorage.getItem('jugadoresFutbol');

    if (jugadoresGuardados) {
        jugadoresFutbol = JSON.parse(jugadoresGuardados);
        mostrarJugadores(); // Actualizar la lista en pantalla
        alert('Lista de jugadores cargada correctamente.');
    } else {
        alert('No hay jugadores guardados.');
    }
});
