// Para el funcionamiento de Canva.
const mainCanvas = document.getElementById("main-canva");
const context = mainCanvas.getContext("2d");

let initialX;
let initialY;

const coordenadasBolitas = [];
const lines = [];

const dibujar = (cursorX, cursorY) => {
    context.beginPath();
    context.moveTo(initialX, initialY);
    context.lineWidth = 5; // Ajustar el ancho de línea
    context.strokeStyle = "#FF0000";
    context.lineCap = "round"; // Ajustar que sea redonda la línea.
    context.lineJoin = "round";
    context.lineTo(cursorX, cursorY);
    context.stroke();

    lines.push([{x: initialX, y: initialY}, {x: cursorX, y: cursorY}]); // Guarda la línea dibujada
    initialX = cursorX;
    initialY = cursorY;
}

const mouseDown = (evt) => {
    initialX = evt.offsetX;
    initialY = evt.offsetY;
    mainCanvas.addEventListener("mousemove", mouseMoving);
};

const mouseMoving = (evt) => {
    dibujar(evt.offsetX, evt.offsetY);
}

const mouseUp = () => {
    mainCanvas.removeEventListener("mousemove", mouseMoving);
}

mainCanvas.addEventListener("mousedown", mouseDown);
mainCanvas.addEventListener("mouseup", mouseUp);

// Funcionalidad del prompt
document.addEventListener('DOMContentLoaded', (event) => {
    openPrompt();
});

function openPrompt() {
    document.getElementById('customPrompt').style.display = 'flex';
}

function closePrompt() {
    document.getElementById('customPrompt').style.display = 'none';
    
}

function submitPrompt() {
    const userInput = document.getElementById('promptInput').value;
    closePrompt();
    generarJugadores(parseInt(userInput));
    dibujarBolitas(context, coordenadasBolitas);
}

function generarJugadores(cantidadJugadores) {
    const espaciosJugadores = document.querySelector('.espacioJugadores'); // Toma el valor de los espacios de los Jugadores.
    espaciosJugadores.innerHTML = ''; // Limpiar el contenedor antes de generar nuevas cajas

    if (isNaN(cantidadJugadores) || cantidadJugadores < 1 || cantidadJugadores > 3) { //Ingresa el valor válido.
        alert('Ingrese un valor válido para jugadores');
        location.reload();
        return;
    }

    for (let i = 1; i <= cantidadJugadores; i++) { //Se crean los espacios para los puntajes y cuántos jugadores
        const cajasJugador = document.createElement("div"); // Espacio donde va todo
        cajasJugador.className = 'CajaJugador';

        const tituloJugador = document.createElement('h2'); // Titulo
        tituloJugador.textContent = `Jugador ${i}`;

        const jugadorPuntos = document.createElement('p'); //Puntaje
        jugadorPuntos.textContent = `Puntaje: `

        cajasJugador.appendChild(tituloJugador);
        cajasJugador.appendChild(jugadorPuntos);

        espaciosJugadores.appendChild(cajasJugador);
    }
}

// Función para generar coordenadas Y aleatorias dentro del rango deseado (900px de altura)
function generarCoordenadaY() {
    return Math.random() * 900;
}

// Función para dibujar las bolitas en posiciones aleatorias
function dibujarBolitas(context, bolitas) {
    const numBolitas = 10;
    const radio = 20;
    const separacion = 128; // Espaciado entre cada bolita en un espacio de 1280px
    const startX = 50; // Posición inicial X de la primera bolita

    for (let i = 0; i < numBolitas; i++) {
        const x = startX + i * separacion;
        const y = generarCoordenadaY(); // Generar una coordenada Y aleatoria
        coordenadasBolitas.push({ x, y }); // Almacena las coordenadas de la bolita
        dibujarBola(context, x, y, radio, i + 1);
    }
}

// Función para dibujar una bolita en una posición dada
function dibujarBola(context, x, y, radio, numero) {
    context.beginPath();
    context.arc(x, y, radio, 0, 2 * Math.PI);
    context.fillStyle = "#000";
    context.fill();
    context.fillStyle = "#fff";
    context.font = "20px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(numero, x, y);
    context.closePath();
}

// Verifica la intersección entre las líneas dibujadas y actualiza el puntaje de los jugadores
function verificarIntersecciones() {
    lines.forEach(function(line1) {
        lines.forEach(function(line2) {
            if (line1 !== line2 && interseccionLineas(line1[0], line1[1], line2[0], line2[1])) {
                // Aquí se cruza una línea con otra, entonces actualiza el puntaje de los jugadores
                // playerScore++;
                console.log("Se cruzaron dos líneas");
            }
        });
    });
}

// Suponiendo que tienes una función para verificar la intersección entre dos líneas
function interseccionLineas(p0, p1, p2, p3) {
    // Implementación de la función interseccionLineas
    // ...
}

// Llamar a la función para dibujar las bolitas cuando se cargue la página
window.addEventListener("load", function() {
    dibujarBolitas(context, coordenadasBolitas);
    verificarIntersecciones(); // Verificar intersecciones una vez que se hayan dibujado todas las líneas
});
