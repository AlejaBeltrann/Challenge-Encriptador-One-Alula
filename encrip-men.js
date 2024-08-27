const d = document;
const textArea = d.querySelector(".form__input");
const imagenNoTexto = d.querySelector(".resultado__img");
const loaderCargando = d.querySelector(".loader");
const resultadoTitulo = d.querySelector(".resultado__titulo");
const resultadoTexto = d.querySelector(".resultado__texto");
const botonEncriptar = d.querySelector(".btn_1");
const botonDesncriptar = d.querySelector(".btn_2");
const botonCopiar = d.querySelector(".resultado_btn");

const llaves = [
    ["a", "ai"],
    ["e", "enter"],
    ["i", "imes"],
    ["o", "ober"],
    ["u", "ufat"],
];

// Función para encriptar
function encriptarMensaje(mensaje) {
    let mensajeEncriptado = "";
    for (let i = 0; i < mensaje.length; i++) {
        let letra = mensaje[i];
        let encriptada = letra;
        // Reemplaza la vocal por su equivalente encriptado
        for (let j = 0; j < llaves.length; j++) {
            if (letra === llaves[j][0]) {
                encriptada = llaves[j][1];
                break;
            }
        }
        mensajeEncriptado += encriptada;
    }
    return mensajeEncriptado;
}

// Función para desencriptar
function desencriptarMensaje(mensaje) {
    let mensajeDesencriptado = mensaje;
    // Reemplaza el texto encriptado por tu mensaje original
    for (let i = 0; i < llaves.length; i++) {
        let regex = new RegExp(llaves[i][1], "g");
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
    }
    // Devuelve el mensaje desencriptado
    return mensajeDesencriptado;
}

// Validar entrada de texto
textArea.addEventListener("input", (e) => {
    let mensaje = textArea.value;
    // Verificar si hay mayúsculas o acentos
    if (/[A-ZÁÉÍÓÚÜÑáéíóúüñ]/.test(mensaje)) {
        resultadoTexto.textContent = "No se permiten mayúsculas ni acentos.";
        textArea.value = mensaje.replace(/[A-ZÁÉÍÓÚÜÑáéíóúüñ]/g, "");
    } else {
        imagenNoTexto.style.display = "none";
        loaderCargando.classList.remove("hidden");
        resultadoTexto.textContent = "Capturando Mensaje.";
        resultadoTitulo.textContent = "";
    }
});

// Función Encriptar
botonEncriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeEncriptado = encriptarMensaje(mensaje);
    resultadoTitulo.textContent = mensajeEncriptado;
    resultadoTexto.textContent = "Mensaje Encriptado";
    botonCopiar.classList.remove("hidden");
});

// Función Desencriptar
botonDesncriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeDesencriptado = desencriptarMensaje(mensaje);
    resultadoTitulo.textContent = mensajeDesencriptado;
    resultadoTexto.textContent = "Mensaje Desencriptado";
    botonCopiar.classList.remove("hidden");
});

// Función Copiar
botonCopiar.addEventListener('click', () => {
    let textoCopiado = resultadoTitulo.textContent;
    navigator.clipboard.writeText(textoCopiado).then(() => {
        imagenNoTexto.style.display = "block";
        loaderCargando.classList.add("hidden");
        resultadoTitulo.textContent = "Texto copiado";
        botonCopiar.classList.add("hidden");
        resultadoTexto.textContent = "";
    });
});