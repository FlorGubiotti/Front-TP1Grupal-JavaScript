document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("empresa_id");
    const textoBuscado = urlParams.get("buscar");
    console.log(textoBuscado)
    console.log(id)
    if(textoBuscado != ''){
        realizarBusqueda(textoBuscado, id)
    }
    fetch("http://localhost:8080/empresas/buscar/" + id)
    .then(async (res) => {
        const response = await res.json();

        console.log(response)

        document.getElementById("telefono").textContent = response.telefono;
        document.getElementById("horario").textContent = response.horarioAtencion;
        document.getElementById("denominacion-header").textContent = response.denominacion;

    })
    .catch((err) => {
        console.log(err)
    })



    const form = document.querySelector('.search-form');

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        const input = document.querySelector('.search-form_input');
        const parametro = input.value.trim(); // Obtener el valor del input y eliminar espacios en blanco al inicio y al final

        if (parametro.length === 0) {
            alert('Por favor ingrese un término de búsqueda');
            return;
        }

        realizarBusqueda(parametro, id)
    });
});

async function realizarBusqueda(textoBuscado, idEmpresa) {
    const tablaNoticias = document.getElementById('tabla-noticias').getElementsByTagName('tbody')[0];

    if (textoBuscado !== '') {
        try {
            document.getElementById("textoBuscado").textContent = textoBuscado;
            const url = `http://localhost:8080/noticias/buscador/${encodeURIComponent(textoBuscado)}/${idEmpresa}`;
            console.log('URL de búsqueda:', url);

            const response = await fetch(url);

            if (response.ok) {
                const noticias = await response.json();
                // Limpiar la tabla antes de agregar nuevas filas
                tablaNoticias.innerHTML = '';
                if (noticias.length == 0) {
                    const fila = document.createElement('tr');
                    fila.innerHTML = "<h4 class='text-danger'>Sin resultados para tu búsqueda</h4>"
                    tablaNoticias.appendChild(fila);

                    // alert("No se encontraron resultados para la búsqueda.");
                } else {
                    let cont = 0;
                    // Iterar sobre las noticias y agregarlas a la tabla
                    noticias.forEach(noticia => {
                        if(cont <= 20){
                            if(noticia.empresa.id == idEmpresa){
                                cont++;
                                console.log(noticia)
                                const fila = document.createElement('tr');
                                let url = `detalle.html?id=${noticia.id}`;
                                fila.innerHTML = `
                                    <td>
                                        <a href="${url}">
                                            <img width="250px" class="imgNoticia" src="picture/${noticia.imagenNoticia}" alt="${noticia.tituloNoticia}">
                                        </a>
                                    </td>
                                    <td width="25"></td>
                                    <td style="text-align:justify;" valign="top">
                                        <a style="text-align:justify; font-size:20px" href="${url}" class="banner">${noticia.tituloNoticia}</a>
                                        <div>
                                            ${noticia.resumenNoticia} <a href="${url}" style="color:blue">Leer Más - ${noticia.fechaPublicacion}</a>
                                        </div>
                                    </td>
                                `;
                                tablaNoticias.appendChild(fila);
                            }
                        }
                        
                    });
                }
            } else {
                console.error('Error en la solicitud:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    }else{
        alert("Por favor ingrese una palabra a buscar")
    }
}