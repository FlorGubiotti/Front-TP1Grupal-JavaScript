(() => {

    const parametro="tu_parametro:aqui";

    fetch(`http://localhost:8080/buscar/${parametro}`)
        .then(async (res) => {
            const response = await res.json();

            console.log(response)

            document.getElementById("telefono").innerHTML = response.telefono
            
            document.getElementById("horario").innerHTML = response.horarioAtencion


        })
        .catch((err) => {

        })
})()