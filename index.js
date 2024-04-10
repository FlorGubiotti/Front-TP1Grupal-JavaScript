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
                    fila.appendChild(celdaEmpresa);
                    fila.appendChild(celdaPagina);
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
