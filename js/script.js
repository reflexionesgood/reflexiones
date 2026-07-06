async function getVerse() {

    try {

        const response = await fetch("js/versiculos.json");
        const verses = await response.json();

        const today = new Date();

        // Día del año (1-365)
        const start = new Date(today.getFullYear(), 0, 0);
        const diff = today - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const day = Math.floor(diff / oneDay);

        // Siempre el mismo versículo durante ese día
        const verse = verses[(day - 1) % verses.length];

        document.getElementById("verse-box").innerHTML = `
            <p>${verse.texto}</p>
            <br>
            <strong>${verse.referencia}</strong>
        `;

    } catch (error) {

        document.getElementById("verse-box").innerText =
            "No se pudo cargar el versículo.";

    }

}



getVerse();