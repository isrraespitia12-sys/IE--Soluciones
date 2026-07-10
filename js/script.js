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
async function cargarGaleria() {
    const contenedor = document.querySelector('.galeria-trabajos__grid');

    try {
        const respuestaLista = await fetch('https://api.github.com/repos/isrraespitia12-sys/IE--Soluciones/contents/content/galeria');
        const listaArchivos = await respuestaLista.json();

        if (!Array.isArray(listaArchivos) || listaArchivos.length === 0) {
            return;
        }

        const promesasContenido = listaArchivos.map(archivo => fetch(archivo.download_url).then(r => r.json()));
        const entradas = await Promise.all(promesasContenido);

        contenedor.innerHTML = '';

        entradas.forEach(entrada => {
            const div = document.createElement('div');
            div.classList.add('foto-placeholder');
            div.style.backgroundImage = `url(${entrada.imagen})`;
            div.style.backgroundSize = 'cover';
            div.style.backgroundPosition = 'center';
            div.style.color = 'transparent';
            div.title = entrada.titulo;
            contenedor.appendChild(div);
        });

    } catch (error) {
        console.error('No se pudo cargar la galería:', error);
    }
}

cargarGaleria();
async function cargarHero() {
    try {
        const respuesta = await fetch('https://api.github.com/repos/isrraespitia12-sys/IE--Soluciones/contents/content/hero.json');
        const archivo = await respuesta.json();
        const contenidoDecodificado = decodeURIComponent(escape(atob(archivo.content)));
        const datos = JSON.parse(contenidoDecodificado);

        document.getElementById('hero-titulo').textContent = datos.titulo;
        document.getElementById('hero-subtitulo').textContent = datos.subtitulo;

        const contenedorImagen = document.getElementById('hero-imagen');
        contenedorImagen.style.backgroundImage = `url(${datos.imagen})`;
        contenedorImagen.textContent = '';
    } catch (error) {
        console.error('No se pudo cargar el Hero (puede que todavía no exista content/hero.json):', error);
    }
}

cargarHero();
async function cargarSobreNosotros() {
    try {
        const respuesta = await fetch('https://api.github.com/repos/isrraespitia12-sys/IE--Soluciones/contents/content/sobre-nosotros.json');
        const archivo = await respuesta.json();
        const contenidoDecodificado = decodeURIComponent(escape(atob(archivo.content)));
        const datos = JSON.parse(contenidoDecodificado);

        document.getElementById('sobre-nosotros-texto').textContent = datos.texto;

    } catch (error) {
        console.error('No se pudo cargar Sobre Nosotros (puede que todavía no exista el archivo):', error);
    }
}

cargarSobreNosotros();