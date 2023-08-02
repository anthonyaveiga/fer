var socket = io.connect(window.location.protocol + '//' + document.domain + ':' + location.port, {
    transports: ['websocket']
});
socket.on('connect', function () {
    console.log("Connected...!", socket.connected)
});


var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
const video = document.querySelector("#videoElement");

video.width = 400;
video.height = 300;


if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
        video: true
    })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function (err0r) {

        });
}

const FPS = 10;
setInterval(() => {
    width = video.width;
    height = video.height;
    context.drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL('image/jpeg', 0.5);
    context.clearRect(0, 0, width, height);
    socket.emit('image', data);
}, 1000 / FPS);

socket.on('processed_image', function (image) {
    photo.setAttribute('src', image);

});

socket.on('processed_image2', function (image) {
    photo2.setAttribute('src', image);

});


socket.on('actualizar_valor', function (data) {
    document.getElementById('valor_fluctuante').textContent = data;
});



function toggleButton() {
    const button = document.getElementById("toggle-button");
    const status = button.innerHTML === "Activar" ? true : false;
    const additionalValue = document.getElementById("additional-value").value;
    const selectedOption = document.getElementById("select-option").value;

    if (status) {
        // Activar
        button.innerHTML = "Desactivar ";
        toggleTimer(); // Inicia el cronómetro cuando se activa

        // Si se cumple la condición, agregamos la clase al botón
        const spinnerSpan = document.createElement('span');
        spinnerSpan.classList.add('spinner-grow', 'spinner-grow-sm');
        button.appendChild(spinnerSpan);

    } else {
        // Desactivar
        button.innerHTML = "Activar";
        resetTimer(); // Detiene y reinicia el cronómetro cuando se desactiva
    }

    fetch('/update_button_status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: status, additionalValue: additionalValue, selectedOption: selectedOption }),
    })
        .then(response => response.json())
        .catch(error => {
            console.error('Error:', error);
        });
}




