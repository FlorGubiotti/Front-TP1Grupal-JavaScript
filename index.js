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
