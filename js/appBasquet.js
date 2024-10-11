const listaJugadoresBasquet = [];
const maxJugadoresPorEquipoBasquet = {
    6: 3,
    10: 5,
};

let tipoPartidoSeleccionadoBasquet = null;

// Manejar la selección de tipo de partido mediante botones
document.querySelectorAll('.btn-partido-basquet').forEach(button => {
    button.addEventListener('click', function () {
        // Remover la clase 'selected' de todos los botones
        document.querySelectorAll('.btn-partido-basquet').forEach(btn => btn.classList.remove('selected'));

        // Añadir la clase 'selected' al botón clickeado
        this.classList.add('selected');

        // Guardar el tipo de partido seleccionado
        tipoPartidoSeleccionadoBasquet = this.getAttribute('data-tipo-basquet');
        console.log(`Partido de ${tipoPartidoSeleccionadoBasquet} jugadores seleccionado`);
    });
});

// Agregar jugador
document.getElementById('agregarJugadorBasquet').addEventListener('click', function () {
    const nombreJugadorBasquet = document.getElementById('jugadorBasquet').value.trim();
    if (nombreJugadorBasquet) {
        listaJugadoresBasquet.push(nombreJugadorBasquet);
        actualizarListaJugadoresBasquet();
        document.getElementById('jugadorBasquet').value = '';
    }
});

// Sortear equipos
document.getElementById('sortearEquiposBasquet').addEventListener('click', function () {
    if (!tipoPartidoSeleccionadoBasquet) {
        alert('Por favor, selecciona el tipo de partido (3V3, 5V5).');
        return;
    }

    const maxJugadoresBasquet = maxJugadoresPorEquipoBasquet[tipoPartidoSeleccionadoBasquet];
    if (listaJugadoresBasquet.length < maxJugadoresBasquet * 2) {
        alert(`Necesitas al menos ${maxJugadoresBasquet * 2} jugadores para un partido de ${tipoPartidoSeleccionadoBasquet / 2}V${tipoPartidoSeleccionadoBasquet / 2}.`);
        return;
    }
    sortearEquiposBasquet(tipoPartidoSeleccionadoBasquet);
    definirInicioPartidoBasquet();
});

// Actualizar lista de jugadores
function actualizarListaJugadoresBasquet() {
    const listaElementBasquet = document.getElementById('listaJugadoresBasquet');
    listaElementBasquet.innerHTML = ''; // Limpiar la lista actual

    listaJugadoresBasquet.forEach((jugadorBasquet, index) => {
        const jugadorDivBasquet = document.createElement('div');
        jugadorDivBasquet.classList.add('jugadorBasquet');

        // Crear el contenido con el nombre del jugador
        const jugadorNombreBasquet = document.createElement('span');
        jugadorNombreBasquet.textContent = jugadorBasquet;

        // Crear la cruz para eliminar al jugador
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'X';
        botonEliminar.classList.add('eliminar');

        // Agregar el evento para eliminar al jugador
        botonEliminar.addEventListener('click', function () {
            eliminarJugadorBasquet(index);
        });

        // Agregar el nombre y el botón al div del jugador
        jugadorDivBasquet.appendChild(jugadorNombreBasquet);
        jugadorDivBasquet.appendChild(botonEliminar);

        // Añadir el jugador a la lista de jugadores visualmente
        listaElementBasquet.appendChild(jugadorDivBasquet);
    });
}

// Agregar jugador con botón y tecla Enter
document.getElementById('jugadorBasquet').addEventListener('keydown', function (evento) {
    if (evento.key === 'Enter') {
        agregarJugadorBasquet();
    }
});

document.getElementById('agregarJugadorBasquet').addEventListener('click', function () {
    agregarJugadorBasquet();
});

function agregarJugadorBasquet() {
    const nombreJugadorBasquet = document.getElementById('jugadorBasquet').value.trim();
    if (nombreJugadorBasquet) {
        listaJugadoresBasquet.push(nombreJugadorBasquet);
        actualizarListaJugadoresBasquet();
        document.getElementById('jugadorBasquet').value = '';
        document.getElementById('jugadorBasquet').focus(); // Volver a enfocar el input
    }
}


// Eliminar jugador de la lista
function eliminarJugadorBasquet(index) {
    listaJugadoresBasquet.splice(index, 1); // Eliminar el jugador de la lista
    actualizarListaJugadoresBasquet(); // Actualizar la visualización
}

// Sortear equipos
function sortearEquiposBasquet(tipoPartidoBasquet) {
    const jugadoresBarajadosBasquet = [...listaJugadoresBasquet].sort(() => 0.5 - Math.random());
    const equipo1Basquet = jugadoresBarajadosBasquet.slice(0, maxJugadoresPorEquipoBasquet[tipoPartidoBasquet]);
    const equipo2Basquet = jugadoresBarajadosBasquet.slice(maxJugadoresPorEquipoBasquet[tipoPartidoBasquet], maxJugadoresPorEquipoBasquet[tipoPartidoBasquet] * 2);

    mostrarEquiposBasquet(equipo1Basquet, equipo2Basquet);
}

function mostrarEquiposBasquet(equipo1Basquet, equipo2Basquet) {
    const listaEquipo1Basquet = document.getElementById('listaEquipo1Basquet');
    const listaEquipo2Basquet = document.getElementById('listaEquipo2Basquet');

    listaEquipo1Basquet.innerHTML = '';
    listaEquipo2Basquet.innerHTML = '';

    equipo1Basquet.forEach(jugadorBasquet => {
        const liBasquet = document.createElement('li');
        liBasquet.textContent = jugadorBasquet;
        listaEquipo1Basquet.appendChild(liBasquet);
    });

    equipo2Basquet.forEach(jugador => {
        const li = document.createElement('li');
        li.textContent = jugadorBasquet;
        listaEquipo2Basquet.appendChild(liBasquet);
    });
}

const botonCopiarBasquet = document.getElementById('copiarContenidoBasquet');

// Función para mostrar los equipos y el botón de copiar
function mostrarEquiposBasquet(equipo1Basquet, equipo2Basquet) {
    const listaEquipo1Basquet = document.getElementById('listaEquipo1Basquet');
    const listaEquipo2Basquet = document.getElementById('listaEquipo2Basquet');

    listaEquipo1Basquet.innerHTML = '';
    listaEquipo2Basquet.innerHTML = '';

    equipo1Basquet.forEach(jugadorBasquet => {
        const li = document.createElement('li');
        li.textContent = jugadorBasquet;
        listaEquipo1Basquet.appendChild(li);
    });

    equipo2Basquet.forEach(jugadorBasquet => {
        const li = document.createElement('li');
        li.textContent = jugadorBasquet;
        listaEquipo2Basquet.appendChild(li);
    });

    // Mostrar el botón de copiar después de que los equipos se muestren
    botonCopiar.style.display = 'inline-block';
}

const botonParaCopiarBasquet = document.getElementById('copiarContenidoBasquet');

// Función para mostrar los equipos y el botón de copiar
function mostrarEquiposBasquet(equipo1Basquet, equipo2Basquet) {
    const listaEquipo1Basquet = document.getElementById('listaEquipo1Basquet');
    const listaEquipo2Basquet = document.getElementById('listaEquipo2Basquet');

    listaEquipo1Basquet.innerHTML = '';
    listaEquipo2Basquet.innerHTML = '';

    equipo1Basquet.forEach(jugadorBasquet => {
        const li = document.createElement('li');
        li.textContent = jugadorBasquet;
        listaEquipo1Basquet.appendChild(li);
    });

    equipo2Basquet.forEach(jugadorBasquet => {
        const li = document.createElement('li');
        li.textContent = jugadorBasquet;
        listaEquipo2Basquet.appendChild(li);
    });

    // Mostrar el botón de copiar después de que los equipos se muestren
    botonParaCopiarBasquet.style.display = 'inline-block';
}

// Función para copiar el contenido de los equipos
botonParaCopiarBasquet.addEventListener('click', function () {
    const equipo1Basquet = document.getElementById('listaEquipo1Basquet').innerText;
    const equipo2Basquet = document.getElementById('listaEquipo2Basquet').innerText;
    const textoAIniciarBasquet = document.getElementById('iniciaBasquet').innerText;

    const textoCompletoBasquet = `Equipo 1:\n${equipo1Basquet}\n\nEquipo 2:\n${equipo2Basquet}\n\n${textoAIniciarBasquet}`;

    // Copiar el contenido al portapapeles
    navigator.clipboard.writeText(textoCompletoBasquet)
        .then(() => {
            // Cambiar el texto del botón a "Copiado"
            botonParaCopiarBasquet.textContent = '¡Copiado!';

            // Esperar 3 segundos y volver a cambiar el texto al original
            setTimeout(() => {
                botonParaCopiarBasquet.textContent = 'Copiar';
            }, 3000);
        })
        .catch(err => {
            console.error('Error al copiar', err);
        });
});

function definirInicioPartidoBasquet() {
    const equipoInicialBasquet = Math.random() < 0.5 ? 'Equipo 1' : 'Equipo 2';
    document.getElementById('iniciaBasquet').textContent = `El ${equipoInicialBasquet} inicia el partido.`;
}
