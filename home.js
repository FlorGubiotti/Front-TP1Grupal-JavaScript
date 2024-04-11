const load = () => {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    console.log(id);

    fetch("http://localhost:8080/empresas/buscar/" + id)
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

    fetch("http://localhost:8080/noticias/noticiasDeEmpresa/" + id)
        .then(async (res) => {
            const response = await res.json();

            const camera_captions = document.querySelectorAll(".camera_caption");

            response.sort((a, b) => b.id - a.id)

            for (let i = 0; i < camera_captions.length; i++) {
            
                const noticia = response[i];
                const camera_caption = camera_captions[i];

                const slide = document.querySelector(`.cameraSlide_${i}`)
                slide.innerHTML = `
                    <img src="https://img.freepik.com/foto-gratis/majestuoso-pico-montana-tranquilo-paisaje-invernal-generado-ia_188544-15662.jpg" class="imgLoaded" style="visibility: visible; height: 507.262px; margin-left: 0px; margin-top: -78.631px; position: absolute; width: 887px;" data-alignment="" data-portrait="" width="626" height="358">
                    <div class="camerarelative" style="width: 887px; height: 350px;"></div>
                `

                if(noticia !== undefined) {
                    const imagen = document.getElementsByClassName("imgLoaded")[i];

                    if (imagen !== undefined) {

                        imagen.src = `${noticia.imagenNoticia}`;
                        camera_caption.querySelector(".tituloNoticia").textContent = noticia.tituloNoticia;

                        camera_caption.querySelector(
                            ".tituloNoticia"
                        ).href = `detalle.html?id=${noticia.id}`;
                        camera_caption.querySelector(".resumenNoticia").textContent =
                            noticia.resumenNoticia;
                        camera_caption.querySelector(
                            ".btn-link"
                        ).href = `detalle.html?id=${noticia.id}`;
                    } else {
                        camera_caption.style.display = "none";
                    }
                }

            }

        })
        .catch((err) => {

        })

}