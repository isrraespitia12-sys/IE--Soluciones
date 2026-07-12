exports.handler = async function (event) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Método no permitido' };
    }

    try {
        const datos = JSON.parse(event.body);
        const { nombre, ciudad, calificacion, comentario } = datos;

        if (!nombre || !ciudad || !calificacion || !comentario) {
            return { statusCode: 400, body: 'Faltan datos de la reseña' };
        }

        const token = process.env.GITHUB_TOKEN;
        const repo = 'isrraespitia12-sys/IE--Soluciones';
        const slug = nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
        const ruta = `content/resenas/${slug}.json`;

        const contenidoJson = JSON.stringify({ nombre, ciudad, calificacion, comentario }, null, 2);
        const contenidoBase64 = Buffer.from(contenidoJson).toString('base64');

        const respuestaGitHub = await fetch(`https://api.github.com/repos/${repo}/contents/${ruta}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Aprobar reseña de ${nombre}`,
                content: contenidoBase64
            })
        });

        if (!respuestaGitHub.ok) {
            const errorTexto = await respuestaGitHub.text();
            return { statusCode: 500, body: `Error de GitHub: ${errorTexto}` };
        }

        return { statusCode: 200, body: 'Reseña aprobada y publicada' };

    } catch (error) {
        return { statusCode: 500, body: `Error interno: ${error.message}` };
    }
};