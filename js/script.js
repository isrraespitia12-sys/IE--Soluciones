const track = document.querySelector('.galeria-auto__track');
let posicion = 0;

function moverGaleria(){
    posicion = posicion -1;

    if (posicion<= -600){
        posicion = 0;
    }
   track.style.transform = `translateX(${posicion}px)`;

}
setInterval(moverGaleria, 20);
const btnCotizar = document.getElementById('btnCotizar');

btnCotizar.addEventListener('click', function() {
    const nombre = document.getElementById('nombre').value;
    const ciudad = document.getElementById('ciudad').value;
    const servicio = document.getElementById('servicio').value;
    const detalles = document.getElementById('detalles').value;

    if (nombre === '' || ciudad === '' || servicio === '' || detalles === '') {
        alert('Por favor completa todos los campos antes de cotizar.');
        return;
    }

    const numeroWhatsApp = '573007943475';

    const mensaje = `Hola, vi su página web. Necesito una cotización:\nNombre: ${nombre}\nCiudad/Barrio: ${ciudad}\nServicio: ${servicio}\nDetalles: ${detalles}`;

    const mensajeCodificado = encodeURIComponent(mensaje);

    const url = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

    window.open(url, '_blank');
});