const loadDetails = () => {
    let titulo = '';
    let resumen = '';
    let img = '/picture/';
    let fecha = '';
    let contenido = '';

    let tituloEditar = '';
    let resumenEditar = '';
    let fechaEditar = '';
    let contenidoEditar = '';

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const idNotice = id;
    console.log(id);
    document.getElementById("inicioId").setAttribute("href", "index.html");
    document.getElementById("empresa_id").value = id;

    fetch("http://localhost:8080/noticias/buscar/" + id)
        .then(async (res) => {
            const response = await res.json();

            console.log(response);
            titulo = response.tituloNoticia;
            resumen = response.resumenNoticia;
            img = response.imagenNoticia;
            fecha = response.fechaPublicacion;
            contenido = response.contenidoHTML;

            document.getElementById("telefono").innerHTML = response.empresa.telefono;
            document.getElementById("horario").innerHTML = response.empresa.horarioAtencion;
            document.getElementById("denominacion-footer").innerHTML = response.empresa.denominacion;
            document.getElementById("denominacion-header").innerHTML = response.empresa.denominacion;
            document.getElementById("tituloNoticia").innerHTML = response.tituloNoticia;
            document.getElementById("imagenNoticia").setAttribute("src", "picture/" + response.imagenNoticia);
            document.getElementById("tituloNoticia-content").innerHTML = response.tituloNoticia;
            document.getElementById("fechaPublicacion").innerHTML = response.fechaPublicacion;
            document.getElementById("resumenNoticia").innerHTML = response.resumenNoticia;
            document.getElementById("contenidoHTML").innerHTML = response.contenidoHTML;

        })
        .catch((err) => {

        })
        const cerrarE = document.getElementById('cerrarE');

        cerrarE.addEventListener('click', function() {
            // Abre la modal de confirmar eliminar cuando se haga clic en el botón de eliminar
            $('#eliminarNoticia').modal('hide');
        });
        const cerrar = document.getElementById('cerrar');

        cerrar.addEventListener('click', function() {
            // Abre la modal de confirmar eliminar cuando se haga clic en el botón de eliminar
            $('#editarNoticia').modal('hide');
        });




        const eliminarBtn = document.getElementById('btnEliminar');

        eliminarBtn.addEventListener('click', function() {
            // Abre la modal de confirmar eliminar cuando se haga clic en el botón de eliminar
            $('#eliminarNoticia').modal('show');
        });
        const editarBtn = document.getElementById('btnEditar');

        editarBtn.addEventListener('click', function() {
            // Abre la modal de confirmar eliminar cuando se haga clic en el botón de eliminar
            $('#editarNoticia').modal('show');

            document.getElementById("tituloEditar").value = titulo;
            document.getElementById("imagenEditar").src = img;
            document.getElementById("fechaPublicacionEditar").value = fecha;
            document.getElementById("resumenEditar").value = resumen;
            document.getElementById("contenidoEditar").value = decodeEntities(contenido);
            
            const form = document.getElementById('editarNoticiaForm');

            form.addEventListener('submit', async function (event) {
                event.preventDefault(); // Evita que se envíe el formulario automáticamente

                tituloEditar = document.getElementById("tituloEditar").value;
                resumenEditar = document.getElementById("resumenEditar").value;
                contenidoEditar = document.getElementById("contenidoEditar").value;
                fechaEditar = document.getElementById("fechaPublicacionEditar").value;
                
                const inputImagen =  document.getElementById("imagenNueva");                
                const formData = new FormData();
                formData.append('file', inputImagen.files[0]);
                console.log(fechaEditar)
                console.log(typeof fechaEditar);

                subirImagenModificar(idNotice, formData, tituloEditar, resumenEditar, contenidoEditar, fechaEditar);
                console.log(tituloEditar)
            })
        });
}

const form = document.querySelector('.search-form');

form.addEventListener('submit', async function (event) {
    console.log(222)
    
})
function decodeEntities(encodedString) {
    console.log('Cadena codificada:', encodedString); // Verifica si la cadena se pasa correctamente
    const textarea = document.createElement('textarea');
    textarea.innerHTML = encodedString;
    const decodedString = textarea.value;
    console.log('Cadena decodificada:', decodedString); // Verifica la cadena decodificada
    return decodedString;
}

function modificarNoticia(id, cambios) {
    fetch(`http://localhost:8080/noticias/modificar/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cambios)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al modificar la noticia');
        }
        return response.json();
    })
    .then(data => {
        console.log('Noticia modificada:', data);
        // Realizar alguna acción adicional si es necesario
    })
    .catch(error => {
        console.error('Error al modificar la noticia:', error.message);
        alert('Error al modificar la noticia, inténtalo de nuevo.');
    });
}

function subirImagenModificar(idNoticia, datos, titulo,resumen, contenido, fecha){
    return fetch('http://localhost:8080/noticias/subirImagen', {
        method: 'POST',
        body: datos
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al crear la noticia');
        }
        return response.text(); // Cambiar a response.text() para leer el nombre del archivo

    })
    .then(data => {
        const noticiaModificar = {
            tituloNoticia: titulo,
            resumenNoticia: resumen,
            contenidoHTML: contenido,
            fechaPublicacion: fecha,
            imagenNoticia: data,    
        };
        console.log(noticiaModificar)
        modificarNoticia(idNoticia, noticiaModificar)
        // Manejar la respuesta del backend, por ejemplo, mostrar un mensaje de éxito
        console.log('Imagen subida exitosamente:', data);
        alert('Imagen subida exitosamente');
        // Redirigir a otra página si es necesario
    })
    .catch(error => {
        // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al subir la imagen:', error.message);
        alert('Error al subir la imagen, intentalo de nuevo.');
    });
}