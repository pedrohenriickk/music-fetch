async function buscarMusica() {

    const campoMusica = document.getElementById("musica");
    const resultado = document.getElementById("resultado");

    const musicaBuscada = campoMusica.value.trim();

    // Valida se o usuário digitou algo
    if (campoMusica === "") {
        resultado.innerHTML = ">Digite uma música ou artista";
        return;
    }

    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(musicaBuscada)}&media=music`;

    resultado.innerHTML = "<p class='carregando'>Buscando músicas...</p>";

    try {
        const response = await fetch(url);
        const dados = await response.json();
        const musica = dados.results;
        console.log(musica);
        resultado.innerHTML = "";

        musica.forEach(musica => {

            resultado.innerHTML += `
    <div class="card">
        <img src="${musica.artworkUrl100.replace('100x100', '600x600')}" alt="${musica.trackName}">
        <h2>${musica.trackName}</h2>
        <p><strong>Artista:</strong> ${musica.artistName}</p>
        <p><strong>Álbum:</strong> ${musica.collectionName}</p>
        <audio controls>
            <source src="${musica.previewUrl}" type="audio/mpeg">
        </audio>
    </div>
`;

        });

    } catch (error) {

        resultado.innerHTML = '<p class="erro">Erro ao buscar a música.</p>';
        console.error(error);

    }
}