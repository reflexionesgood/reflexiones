const verses = [
    "john+3:16",
    "psalms+23:1",
    "jeremiah+33:3",
    "isaiah+41:10",
    "philippians+4:13"
];

async function getVerse() {
    const random = Math.floor(Math.random() * verses.length);
    const verse = verses[random];

    try {
        const response = await fetch(`https://bible-api.com/${verse}`);
        const data = await response.json();

        document.getElementById("verse-box").innerText =
            `${data.text} - ${data.reference}`;
    } catch (error) {
        document.getElementById("verse-box").innerText =
            "No se pudo cargar el versículo.";
        console.log(error);
    }
}

getVerse();