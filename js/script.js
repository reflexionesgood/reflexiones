const verses = [
    "john+3:16",
    "psalms+23:1",
    "jeremiah+33:3",
    "isaiah+41:10",
    "philippians+4:13",
    "romans+8:28",
    "matthew+11:28",
    "psalms+27:1",
    "john+14:27",
    "philippians+4:6"
];

const reflexiones = [
    "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te fortalezco.",
    "El Señor es mi pastor, nada me falta. En verdes pastos me hace descansar.",
    "Porque yo sé los planes que tengo para ustedes, planes de bienestar y no de calamidad.",
    "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.",
    "La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da."
];

async function getVerse() {
    const verseBox = document.getElementById("verse-box");
    const spinner = verseBox.querySelector('.loading-spinner');
    const textElement = verseBox.querySelector('p');
    
    // Mostrar loading
    spinner.style.display = 'block';
    textElement.textContent = 'Cargando palabra de vida...';
    
    const random = Math.floor(Math.random() * verses.length);
    const verse = verses[random];

    try {
        const response = await fetch(`https://bible-api.com/${verse}`);
        const data = await response.json();
        
        if (data.text && data.reference) {
            textElement.textContent = `${data.text} - ${data.reference}`;
        } else {
            throw new Error('Datos incompletos');
        }
    } catch (error) {
        textElement.textContent = "No se pudo cargar el versículo. Por favor, intenta de nuevo.";
        console.log(error);
    } finally {
        spinner.style.display = 'none';
    }
}

// Cargar reflexión aleatoria
function loadReflexion() {
    const reflexionText = document.getElementById('reflexion-text');
    const random = Math.floor(Math.random() * reflexiones.length);
    reflexionText.textContent = reflexiones[random];
}

// Función para manejar errores de iframe
function handleIframeError() {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.addEventListener('error', function() {
            this.style.display = 'none';
            const parent = this.parentElement;
            const errorMsg = document.createElement('div');
            errorMsg.className = 'video-error';
            errorMsg.innerHTML = `
                <i class="fas fa-exclamation-circle"></i>
                <p>No se pudo cargar el video</p>
            `;
            errorMsg.style.cssText = `
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 50px 20px;
                background: #f8f9ff;
                border-radius: 15px;
                color: #666;
            `;
            parent.appendChild(errorMsg);
        });
    });
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    getVerse();
    loadReflexion();
    handleIframeError();
    
    // Animación de entrada
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});
