(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idNoticia = urlParams.get("id");

    fetch(`http://localhost:8080/noticias/buscar/${idNoticia}`)
        .then(async (res) => {
            const response = await res.json();

            console.log(response);

            document.getElementById("tituloNoticia").innerHTML = response.tituloNoticia;
            document.getElementById("imagenNoticia").src = response.imagenNoticia;
			document.getElementById("tituloNoticia-content").innerHTML = response.tituloNoticia;
            document.getElementById("fechaPublicacion").innerHTML = response.fechaPublicacion;
            document.getElementById("resumenNoticia").innerHTML = response.resumenNoticia;
            document.getElementById("contenidoHTML").innerHTML = response.contenidoHTML;

            const idEmpresa = response.idEmpresa;
			console.log(idEmpresa)

            fetch(`http://localhost:8080/empresas/buscar/${idEmpresa}`)
                .then(async (resEmpresa) => {
                    const responseEmpresa = await resEmpresa.json();

                    console.log(responseEmpresa);

                    document.getElementById("telefono").innerHTML = responseEmpresa.telefono;
                    document.getElementById("horario").innerHTML = responseEmpresa.horarioAtencion;
                    document.getElementById("denominacion-footer").innerHTML = responseEmpresa.denominacion;
                    document.getElementById("denominacion-header").innerHTML = responseEmpresa.denominacion;
                })
                .catch((err) => {
                    console.error("Error al cargar los datos de la empresa:", err);
                });
        })
        .catch((err) => {
            console.error("Error al cargar los datos de la noticia:", err);
        });

})();
