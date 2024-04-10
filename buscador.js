const buscar = async () => {
    try {
        const parametro = document.getElementById('buscar').value;

        const response = await fetch(`http://localhost:8080/noticias/buscador/${parametro}`);

        if (response.ok) {
            const noticias = await response.json();
            // Ordenar las noticias por fecha de publicación descendente
            noticias.sort((a, b) => new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion));
            // Actualizar la interfaz de usuario con las noticias ordenadas
            mostrarNoticiasOrdenadas(noticias);
        } else {
            console.error('Error en la solicitud:', response.statusText);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

const mostrarNoticiasOrdenadas = (noticias) => {
    // Limpiar el contenedor de la tabla
    const tabla = document.getElementById('tabla-noticias');
    tabla.innerHTML = '';

    // Iterar sobre las noticias y agregarlas a la tabla
    noticias.forEach(noticia => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>
                <a href="detalle.html">
                    <img width="250px" class="imgNoticia" src="${noticia.imagenNoticia}" alt="${noticia.tituloNoticia}">
                </a>
            </td>
            <td width="25"></td>
            <td style="text-align:justify;" valign="top">
                <a style="text-align:justify; font-size:20px" href="detalle.html" class="banner">${noticia.tituloNoticia}</a>
                <div class="verOcultar">
                    ${noticia.resumenNoticia} <a href="detalle.html" style="color:blue">Leer Más - ${noticia.fechaPublicacion}</a>                                            
                </div>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

