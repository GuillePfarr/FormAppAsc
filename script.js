//Este código fué revisado el 8deJuliodel23
//Funciona correctamente 

const $canvas = document.querySelector("#canvas");
const $btnDescargar = document.querySelector("#btnDescargar");
const $btnLimpiar = document.querySelector("#btnLimpiar");
const $btnGenerarDocumento = document.querySelector("#btnGenerarDocumento");
const contexto = $canvas.getContext("2d");
const COLOR_PINCEL = "black";
const COLOR_FONDO = "white";
const GROSOR = 2;
let xAnterior = 0, yAnterior = 0, xActual = 0, yActual = 0;
let haComenzadoDibujo = false;

const obtenerXReal = (clientX) =>
  clientX - $canvas.getBoundingClientRect().left;
const obtenerYReal = (clientY) =>
  clientY - $canvas.getBoundingClientRect().top;

const limpiarCanvas = () => {
  contexto.fillStyle = COLOR_FONDO;
  contexto.fillRect(0, 0, $canvas.width, $canvas.height);
};

limpiarCanvas();

$btnLimpiar.onclick = limpiarCanvas;

$btnDescargar.onclick = () => {
  const enlace = document.createElement("a");
  enlace.download = "Firma.png";
  enlace.href = $canvas.toDataURL();
  enlace.click();
};

window.obtenerImagen = () => {
  return $canvas.toDataURL();
};

$btnGenerarDocumento.onclick = () => {
  window.open("doc.html");
};

const handleMouseDown = (evento) => {
  xAnterior = xActual;
  yAnterior = yActual;
  xActual = obtenerXReal(evento.clientX || evento.touches[0].clientX);
  yActual = obtenerYReal(evento.clientY || evento.touches[0].clientY);
  contexto.beginPath();
  contexto.fillStyle = COLOR_PINCEL;
  contexto.fillRect(xActual, yActual, GROSOR, GROSOR);
  contexto.closePath();
  haComenzadoDibujo = true;
};

const handleMouseMove = (evento) => {
  if (!haComenzadoDibujo) {
    return;
  }
  xAnterior = xActual;
  yAnterior = yActual;
  xActual = obtenerXReal(evento.clientX || evento.touches[0].clientX);
  yActual = obtenerYReal(evento.clientY || evento.touches[0].clientY);
  contexto.beginPath();
  contexto.moveTo(xAnterior, yAnterior);
  contexto.lineTo(xActual, yActual);
  contexto.strokeStyle = COLOR_PINCEL;
  contexto.lineWidth = GROSOR;
  contexto.stroke();
  contexto.closePath();
};

const handleMouseUp = () => {
  haComenzadoDibujo = false;
};

$canvas.addEventListener("mousedown", handleMouseDown);
$canvas.addEventListener("mousemove", handleMouseMove);
$canvas.addEventListener("mouseup", handleMouseUp);

$canvas.addEventListener("touchstart", (evento) => {
  evento.preventDefault();
  handleMouseDown(evento.touches[0]);
});

$canvas.addEventListener("touchmove", (evento) => {
  evento.preventDefault();
  handleMouseMove(evento.touches[0]);
});

$canvas.addEventListener("touchend", handleMouseUp);
$canvas.addEventListener("touchcancel", handleMouseUp);
