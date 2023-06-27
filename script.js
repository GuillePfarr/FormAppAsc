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

$canvas.addEventListener("mousedown", (evento) => {
  xAnterior = xActual;
  yAnterior = yActual;
  xActual = obtenerXReal(evento.clientX);
  yActual = obtenerYReal(evento.clientY);
  contexto.beginPath();
  contexto.fillStyle = COLOR_PINCEL;
  contexto.fillRect(xActual, yActual, GROSOR, GROSOR);
  contexto.closePath();
  haComenzadoDibujo = true;
});

$canvas.addEventListener("mousemove", (evento) => {
  if (!haComenzadoDibujo) {
    return;
  }
  xAnterior = xActual;
  yAnterior = yActual;
  xActual = obtenerXReal(evento.clientX);
  yActual = obtenerYReal(evento.clientY);
  contexto.beginPath();
  contexto.moveTo(xAnterior, yAnterior);
  contexto.lineTo(xActual, yActual);
  contexto.strokeStyle = COLOR_PINCEL;
  contexto.lineWidth = GROSOR;
  contexto.stroke();
  contexto.closePath();
});

$canvas.addEventListener("mouseup", () => {
  haComenzadoDibujo = false;
});

$canvas.addEventListener("mouseout", () => {
  haComenzadoDibujo = false;
});

$canvas.addEventListener("touchstart", (evento) => {
  const touch = new Touch({
    identifier: evento.touches[0].identifier,
    target: $canvas,
    clientX: obtenerXReal(evento.touches[0].clientX),
    clientY: obtenerYReal(evento.touches[0].clientY),
    pageX: evento.touches[0].pageX,
    pageY: evento.touches[0].pageY,
  });
  const touchEvent = new TouchEvent("touchstart", {
    touches: [touch],
    targetTouches: [touch],
    changedTouches: [touch],
    bubbles: true,
    cancelable: true,
    composed: true,
  });
  $canvas.dispatchEvent(touchEvent);
});

$canvas.addEventListener("touchmove", (evento) => {
  const touch = new Touch({
    identifier: evento.touches[0].identifier,
    target: $canvas,
    clientX: obtenerXReal(evento.touches[0].clientX),
    clientY: obtenerYReal(evento.touches[0].clientY),
    pageX: evento.touches[0].pageX,
    pageY: evento.touches[0].pageY,
  });
  const touchEvent = new TouchEvent("touchmove", {
    touches: [touch],
    targetTouches: [touch],
    changedTouches: [touch],
    bubbles: true,
    cancelable: true,
    composed: true,
  });
  $canvas.dispatchEvent(touchEvent);
});
