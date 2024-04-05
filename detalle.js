(() => {
    fetch("http://localhost:8080/noticias/buscar-by-id/1")
    .then(async (res) => {
        const response = await res.json();

        console.log(response)

        document.getElementById("")
    })
})()