document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.search-form');
    const tablaNoticias = document.getElementById('tabla-noticias').getElementsByTagName('tbody')[0];

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        const input = document.querySelector('.search-form_input');
        const parametro = input.value.trim(); // Obtener el valor del input y eliminar espacios en blanco al inicio y al final

        if (parametro.length === 0) {
            alert('Por favor ingrese un término de búsqueda');
            return;
        }

        try {
            const url = `http://localhost:8080/noticias/buscador/${encodeURIComponent(parametro)}`;
            console.log('URL de búsqueda:', url);

            const response = await fetch(url);

            if (response.ok) {
                const noticias = await response.json();
                // Limpiar la tabla antes de agregar nuevas filas
                tablaNoticias.innerHTML = '';

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
                            <div>
                                ${noticia.resumenNoticia} <a href="detalle.html" style="color:blue">Leer Más - ${noticia.fechaPublicacion}</a>                                            
                            </div>
                        </td>
                    `;
                    tablaNoticias.appendChild(fila);
                });
            } else {
                console.error('Error en la solicitud:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    });
});
