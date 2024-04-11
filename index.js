document.addEventListener("DOMContentLoaded", function () {
    (() => {
        fetch('http://localhost:8080/empresas')
            .then((response) => response.json())
            .then((data) => {
                const tabla = document.getElementById("tabla-empresas");
                tabla.innerHTML = "";
                data.forEach((empresa) => {
                    const fila = document.createElement("tr");
                    const celdaEmpresa = document.createElement("td");
                    celdaEmpresa.textContent = empresa.denominacion;
                    const celdaPagina = document.createElement("td");
                    const enlace = document.createElement("a");
                    enlace.href = `home.html?id=${empresa.id}`;
                    enlace.textContent = `${empresa.denominacion.replace(/\s/g, '')}.com.ar`;
                    celdaPagina.appendChild(enlace);
                    const celdaAcciones = document.createElement("td");
                    const editarBoton = document.createElement("button");
                    editarBoton.className = "btn btn-success";
                    editarBoton.textContent = "Editar";
                    editarBoton.onclick = () => editarEmpresa(empresa.id);
                    const eliminarBoton = document.createElement("button");
                    eliminarBoton.className = "btn btn-danger"
                    eliminarBoton.textContent = "Eliminar";
                    eliminarBoton.onclick = () => modalEliminarEmpresa(empresa.id);
                    celdaAcciones.appendChild(editarBoton);
                    celdaAcciones.appendChild(eliminarBoton);
                    fila.appendChild(celdaEmpresa);
                    fila.appendChild(celdaPagina);
                    fila.appendChild(celdaAcciones);
                    tabla.appendChild(fila);
                });
            })
            .catch((error) => {
                console.error("Error al cargar las empresas:", error);
            });
    })();

    const form = document.getElementById("empresaForm");
    
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente
        
        enviarDatos();
    });
});

const enviarDatos = async () => {
    try {
        // Obtener los datos del formulario
        const denominacion = document.getElementById('denominacion').value;
        const telefono = document.getElementById('telefono').value;
        const horarioAtencion = document.getElementById('horarioAtencion').value;
        const quienesSomos = document.getElementById('quienesSomos').value;
        const latitud = document.getElementById('latitud').value;
        const longitud = document.getElementById('longitud').value;
        const domicilio = document.getElementById('domicilio').value;
        const email = document.getElementById('email').value;

        // Crear un objeto con los datos
        const data = {
            denominacion: denominacion,
            telefono: telefono,
            horarioAtencion: horarioAtencion,
            quienesSomos: quienesSomos,
            latitud: latitud,
            longitud: longitud,
            domicilio: domicilio,
            email: email
            // Agregar más campos aquí según sea necesario
        };

        // Enviar los datos al servidor
        const response = await fetch('http://localhost:8080/empresas/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Verificar si la solicitud fue exitosa
        if (response.ok) {
            // Mostrar una alerta
            alert('La empresa se creó correctamente.');
            
            // Cerrar la modal
            const modal = new bootstrap.Modal(document.getElementById("agregarProductoModal"));
            modal.hide();

            // Recargar la página
            window.location.reload();
        } else {
            console.error('Error al enviar los datos:', response.status);
            // Puedes manejar el error de alguna manera aquí
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        // Puedes manejar el error de alguna manera aquí
    }
};

// Función para editar una empresa
const editarEmpresa = async (id) => {
    try {
        // Obtener los datos de la empresa del servidor
        const response = await fetch(`http://localhost:8080/empresas/buscar/${id}`);
        const empresa = await response.json();

        // Rellenar los campos del formulario con los datos de la empresa
        document.getElementById('denominacionEditar').value = empresa.denominacion;
        document.getElementById('telefonoEditar').value = empresa.telefono;
        document.getElementById('horarioAtencionEditar').value = empresa.horarioAtencion;
        document.getElementById('quienesSomosEditar').value = empresa.quienesSomos;
        document.getElementById('latitudEditar').value = empresa.latitud;
        document.getElementById('longitudEditar').value = empresa.longitud;
        document.getElementById('domicilioEditar').value = empresa.domicilio;
        document.getElementById('emailEditar').value = empresa.email;

        // Mostrar la modal
        const modal = new bootstrap.Modal(document.getElementById("editarEmpresa"));
        modal.show();

        const form2 = document.getElementById("editarEmpresaForm");
    
        form2.addEventListener("submit", function (event) {
            event.preventDefault(); // Evita que el formulario se envíe automáticamente
            actualizarDatos(id);
        });
    } catch (error) {
        console.error('Error al obtener los datos de la empresa:', error);
        // Puedes manejar el error de alguna manera aquí
    }
};

const actualizarDatos = async (idEmpresa) => {
    try {
        // Obtener los datos del formulario
        const denominacion = document.getElementById('denominacionEditar').value;
        const telefono = document.getElementById('telefonoEditar').value;
        const horarioAtencion = document.getElementById('horarioAtencionEditar').value;
        const quienesSomos = document.getElementById('quienesSomosEditar').value;
        const latitud = parseFloat(document.getElementById('latitudEditar').value);
        const longitud = parseFloat(document.getElementById('longitudEditar').value);
        const domicilio = document.getElementById('domicilioEditar').value;
        const email = document.getElementById('emailEditar').value;
    
        
        console.log(typeof latitud); // Verifica que la latitud es de tipo 'number'
        console.log(typeof longitud); // Verifica que la longitud es de tipo 'number'
        
        // Crear un objeto con los datos
        const data = {
            denominacion: denominacion,
            telefono: telefono,
            horarioAtencion: horarioAtencion,
            quienesSomos: quienesSomos,
            // latitud: latitud, // Convertir a número
            // longitud: longitud, // Convertir a número
            domicilio: domicilio,
            email: email
            // Agregar más campos aquí según sea necesario
        };
        console.log(data)
        // Enviar los datos al servidor mediante una solicitud PUT
        const response = await fetch(`http://localhost:8080/empresas/modificar/${idEmpresa}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        // Verificar si la solicitud fue exitosa
        if (response.ok) {
            // Mostrar una alerta
            alert('La empresa se actualizo correctamente.');
            
            // Cerrar la modal
            const modal = new bootstrap.Modal(document.getElementById("editarEmpresa"));
            modal.hide();

            // Recargar la página
            window.location.reload();
        } else {
            console.error('Error al actualizar los datos:', response.status);
            // Puedes manejar el error de alguna manera aquí
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        // Puedes manejar el error de alguna manera aquí
    }
};

// Función para eliminar una empresa
const modalEliminarEmpresa = async (id) => {
    try {
        // Obtener los datos de la empresa del servidor
        const response = await fetch(`http://localhost:8080/empresas/buscar/${id}`);
        const empresa = await response.json();

        // Rellenar los campos del formulario con los datos de la empresa
        let denominacion = document.getElementById('denominacionEditar').value = empresa.denominacion;

        let name = document.getElementById("nombreEmpresaEliminar")
        name.textContent =`¿Estás seguro que quieres eliminar la empresa: ${denominacion}?`;
        // Mostrar la modal
        const modal = new bootstrap.Modal(document.getElementById("eliminarEmpresa"));
        modal.show();

        const form2 = document.getElementById("eliminarEmpresaForm");
    
        form2.addEventListener("submit", function (event) {
            event.preventDefault(); // Evita que el formulario se envíe automáticamente
            eliminarEmpresa(id);
        });
    } catch (error) {
        console.error('Error al obtener los datos de la empresa:', error);
        // Puedes manejar el error de alguna manera aquí
    }

    console.log("eliminar empresa "+id)
};
const eliminarEmpresa = async (idEmpresa) => {
    try {
        const response = await fetch(`http://localhost:8080/empresas/delete/${idEmpresa}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // Mostrar una alerta o realizar cualquier acción necesaria
            alert('La empresa se eliminó correctamente.');

            // Recargar la página u otra acción necesaria
            window.location.reload();
        } else {
            console.error('Error al eliminar la empresa:', response.status);
            // Puedes manejar el error de alguna manera aquí
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        // Puedes manejar el error de alguna manera aquí
    }
};

document.addEventListener('DOMContentLoaded', function() {

    obtenerEmpresas(); // Llama a la función para iniciar la solicitud
    obtenerNoticias();
    obtenerNoticia();

    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente
        var editor = tinymce.get('contenidoHTML');

        // Capturar los valores de los campos del formulario
       // Capturar los valores de los campos del formulario
       const idEmpresa = document.getElementById('idEmpresa').value;
       const tituloNoticia = document.getElementById('tituloNoticia').value;
       const resumenNoticia = document.getElementById('resumenNoticia').value;
       const contenidoHTML = editor.getContent();
       const publicada = document.getElementById('publicada').checked; // Usar checked para obtener el estado de la casilla de verificación
       const fechaPublicacion = document.getElementById('fechaPublicacion').value;
       const imagen = document.getElementById('imagen').files[0];

       // Construir el objeto JSON
       const noticiaData = {
           idEmpresa: idEmpresa,
           noticia: {
               tituloNoticia: tituloNoticia,
               resumenNoticia: resumenNoticia,
               imagenNoticia: "",
               contenidoHTML: contenidoHTML,
               publicada: publicada ? "Y" : "N", // Convertir el valor booleano a "Y" o "N"
               fechaPublicacion: fechaPublicacion
           }
       };
        const formData = new FormData();
        formData.append('file', imagen);
        

        function subirImagenCrearNotice(datos){
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
                noticiaData.noticia.imagenNoticia = data;
                crearNoticia(noticiaData);
                // Manejar la respuesta del backend, por ejemplo, mostrar un mensaje de éxito
                console.log('Imagen subida exitosamente:', data);
                // alert('Imagen subida exitosamente');
                // Redirigir a otra página si es necesario
            })
            .catch(error => {
                // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
                console.error('Error al subir la imagen:', error.message);
                alert('Error al subir la imagen, intentalo de nuevo.');
            });
        }

        function crearNoticia(data){
            // Enviar la solicitud POST al backend
            return fetch('http://localhost:8080/noticias/crear', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al crear la noticia');
                }
                return response.text();
            })
            .then(data => {
                console.log('Respuesta del servidor:', data);
                alert('Noticia creada exitosamente');
                // Redirigir a otra página si es necesario
            })
            .catch(error => {
                console.error('Error al crear la noticia:', error.message);
                alert('Error al crear la noticia. Por favor, inténtelo de nuevo.');
            });
        }
        // crearNoticia(noticiaData)
        subirImagenCrearNotice(formData)

    });
});

function subirImagenModificar(idNoticia, datos){
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
            imagenNoticia: data,    
        };
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
function obtenerEmpresas() {
    let empresas = document.getElementById("idEmpresa");
    fetch('http://localhost:8080/empresas', {
        method: 'GET' // Cambiar el método a GET
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener las empresas');
        }
        return response.json(); // Cambiar a response.json() para obtener el contenido JSON de la respuesta
    })
    .then(data => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            id = data[i].id;
            denominacioin = data[i].denominacion;
            let option = document.createElement('option');
            option.value = data[i].id; // Establecemos el valor de la opción como el id de la empresa
            option.textContent = data[i].denominacion; // Establecemos el texto de la opción como la denominación de la empresa
            empresas.appendChild(option);        
        }
        // Aquí puedes manejar los datos de las empresas, como mostrarlas en la página o realizar alguna otra acción
    })
    .catch(error => {
        console.error('Error al obtener las empresas:', error.message);
        alert('Error al obtener empresas, inténtalo de nuevo.');
    });
}
function obtenerNoticias() {
    const apiUrl = 'http://localhost:8080/noticias';

    fetch(`${apiUrl}`, {
        method: 'GET' // Cambiar el método a GET
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener las noticias');
        }
        return response.json(); // Obtener el contenido JSON de la respuesta
    })
    .then(data => {
        console.log(data);
        // Obtener el contenedor donde se agregarán las cards
        const contenedor = document.getElementById('contenedor-noticias');

        // Función para manejar el evento click del botón "Upload imagen"
        function handleUploadImagen(idNotice) {
            return function() {
                const inputImagen = document.getElementById(`uploadImagen_${idNotice}`);
                const formData = new FormData();
                formData.append('file', inputImagen.files[0]);
                subirImagenModificar(idNotice, formData);
            };
        }

        // Iterar sobre cada noticia en los datos recibidos
        data.forEach(noticia => {
            // Crear un div para la card de la noticia
            const card = document.createElement('div');
            card.classList.add('card');

            const idNotice = noticia.id;
            // Agregar el contenido de la noticia a la card
            card.innerHTML = `
                <h2>${noticia.tituloNoticia}</h2>
                <p>${noticia.resumenNoticia}</p>
                <img src="picture/${noticia.imagenNoticia}" alt="Imagen de la noticia" width="30%">
                <input type="file" id="uploadImagen_${idNotice}" style="display: none;">
                <button class="btn btn-primary col-md-2" onclick="document.getElementById('uploadImagen_${idNotice}').click()">Upload imagen</button>
                <div>${decodeEntities(noticia.contenidoHTML)}</div>
                <p>Publicada: ${noticia.publicada}</p>
                <p>Fecha de publicación: ${noticia.fechaPublicacion}</p>
            `;
            // Adjuntar un event listener al input de archivo para escuchar cambios
            const inputImagen = card.querySelector(`#uploadImagen_${idNotice}`);
            inputImagen.addEventListener('change', handleUploadImagen(idNotice));
            // Agregar la card al contenedor
            contenedor.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error al obtener las noticias:', error.message);
    });
}

function obtenerNoticia() {
    const apiUrl = 'http://localhost:8080/noticias/buscar/1';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener la noticia');
            }
            return response.json(); // Obtener el contenido JSON de la respuesta
        })
        .then(noticia => {
            const idNotice = noticia.id;
            // Obtener el contenedor donde se agregará la card
            const contenedor = document.getElementById('contenedor-noticia');

            // Crear un div para la card de la noticia
            const card = document.createElement('div');
            card.classList.add('card');

            // Agregar el contenido de la noticia a la card
            card.innerHTML = `
                <h2>${noticia.tituloNoticia}</h2>
                <p>${noticia.resumenNoticia}</p>
                <img src="picture/${noticia.imagenNoticia}" alt="Imagen de la noticia" width="30%">
                <input type="file" id="uploadImagen" style="display: none;">
                <button class="btn btn-primary col-md-2" onclick="document.getElementById('uploadImagen').click()">Upload imagen</button>
                <div>${decodeEntities(noticia.contenidoHTML)}</div>
                <p>Publicada: ${noticia.publicada}</p>
                <p>Fecha de publicación: ${noticia.fechaPublicacion}</p>
            `;
            // Adjuntar un event listener al input de archivo para escuchar cambios
            const inputImagen = card.querySelector('#uploadImagen');
            inputImagen.addEventListener('change', () => {
                const formData = new FormData();
                formData.append('file', inputImagen.files[0]);
                // console.log('Archivo seleccionado:', inputImagen.files[0]);
                subirImagenModificar(idNotice, formData);
            });
            // Agregar la card al contenedor
            contenedor.appendChild(card);
        })
        .catch(error => {
            console.error('Error al obtener la noticia:', error.message);
        });
}

function obtenerImagen(nombreArchivo) {
    const urlImagen = `picture/${nombreArchivo}`;
    document.getElementById('img').src = urlImagen;
}
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

// Ejemplo de cómo llamar a la función modificarNoticia con un ID de noticia y cambios
const idNoticia = 1; // ID de la noticia que deseas modificar
const cambios = {
    // Aquí define los cambios que deseas aplicar a la noticia
    // Por ejemplo:
    // tituloNoticia: 'Nuevo título',
    // resumenNoticia: 'Nuevo resumen',
    // imagenNoticia: 'Nueva URL de imagen',
    // contenidoHTML: 'Nuevo contenido HTML',
    // publicada: true/false, etc.
};

// modificarNoticia(idNoticia, cambios);
