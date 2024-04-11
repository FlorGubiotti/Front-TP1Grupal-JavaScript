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
                enlace.textContent = "URL PÁGINA HOME";
                celdaPagina.appendChild(enlace);
                fila.appendChild(celdaEmpresa);
                fila.appendChild(celdaPagina);
                tabla.appendChild(fila);
            });
        })
        .catch((error) => {
            console.error("Error al cargar las empresas:", error);
        });
})();


const enviarDatos = async () => {
    try {
        const denominacion = document.getElementById('denominacion').value;
        const telefono = document.getElementById('telefono').value;
        const horarioAtencion = document.getElementById('horarioAtencion').value;
        const quienesSomos = document.getElementById('quienesSomos').value;
        const latitud = document.getElementById('latitud').value;
        const longitud = document.getElementById('longitud').value;
        const domicilio = document.getElementById('domicilio').value;
        const email = document.getElementById('email').value;

        const data = {
            denominacion: denominacion,
            telefono: telefono,
            horarioAtencion: horarioAtencion,
            quienesSomos: quienesSomos,
            latitud: latitud,
            longitud: longitud,
            domicilio: domicilio,
            email: email
            // Agrega más campos aquí según sea necesario
        };

        const response = await fetch('http://localhost:8080/empresas/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
            // Puedes realizar más acciones con la respuesta del servidor aquí
        } else {
            console.error('Error al enviar los datos:', response.status);
            // Puedes manejar el error de alguna manera aquí
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        // Puedes manejar el error de alguna manera aquí
    }
};

document.addEventListener('DOMContentLoaded', function () {

    obtenerEmpresas(); // Llama a la función para iniciar la solicitud
    obtenerNoticias();
    obtenerNoticia();

    const form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
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


        function subirImagenCrearNotice(datos) {
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
                    // Redirigir a otra página si es necesario
                })
                .catch(error => {
                    // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
                    console.error('Error al subir la imagen:', error.message);
                    alert('Error al subir la imagen, intentalo de nuevo.');
                });
        }

        function crearNoticia(data) {
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
function subirImagenModificar(idNoticia, datos) {
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

modificarNoticia(idNoticia, cambios);






