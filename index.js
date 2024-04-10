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