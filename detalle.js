const loadDetails = () => {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    console.log(id);
    document.getElementById("inicioId").setAttribute("href", "home.html?id="+id);
    document.getElementById("empresa_id").value = id;

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
            document.getElementById("contenidoHTML").innerHTML = response.contenidoHTML;

        })
        .catch((err) => {

        })

}
const form = document.querySelector('.search-form');

form.addEventListener('submit', async function (event) {
    console.log(222)
    
})