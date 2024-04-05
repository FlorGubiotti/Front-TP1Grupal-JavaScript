(() => {

    fetch("http://localhost:8080/empresas/buscar-by-id/1")
        .then(async (res) => {
            const response = await res.json();

            console.log(response)

            document.getElementById("telefono").innerHTML = response.telefono
            document.getElementById("quienes-somos").innerHTML = response.quienesSomos
            document.getElementById("horario").innerHTML = response.horarioAtencion
            document.getElementById("denominacion-footer").innerHTML = response.denominacion
            document.getElementById("denominacion-header").innerHTML = response.denominacion



            const linkMapa = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11270.125646913215!2d${response.latitud}!3d${response.longitud}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1615335513448!5m2!1ses-419!2sar`

            document.getElementById("mapa-iframe").src= linkMapa

        })
        .catch((err) => {

        })



})()