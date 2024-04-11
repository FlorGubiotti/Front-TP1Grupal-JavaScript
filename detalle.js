const loadDetails = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    console.log(id);

    fetch("http://localhost:8080/noticias/buscar/" + id)
        .then(async (res) => {
            const response = await res.json();

            console.log(response);

            document.getElementById("telefono").innerHTML = response.empresa.telefono;
            document.getElementById("horario").innerHTML = response.empresa.horarioAtencion;
            document.getElementById("denominacion-footer").innerHTML = response.empresa.denominacion;
            document.getElementById("denominacion-header").innerHTML = response.empresa.denominacion;
            document.getElementById("tituloNoticia").innerHTML = response.tituloNoticia;
            document.getElementById("imagenNoticia").setAttribute("src", "picture/" + response.imagenNoticia);
            document.getElementById("tituloNoticia-content").innerHTML = response.tituloNoticia;
            document.getElementById("fechaPublicacion").innerHTML = response.fechaPublicacion;
            document.getElementById("resumenNoticia").innerHTML = response.resumenNoticia;
            document.getElementById("contenidoHTMLMain").innerHTML = response.contenidoHTML;

            mostrarModal();
        })
        .catch((err) => {
            console.error(err);
        });
}



    






