document.getElementById('search-book-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene el envío del formulario

    // Generar valores predeterminados
    const generateISBN = () => Math.floor(Math.random() * 10000000000000);
    
    const generateAuthor = () => {
        const firstNames = ["Juan", "María", "Carlos", "Ana", "Luis", "Elena", "Pedro", "Carmen"];
        const lastNames = ["García", "Rodríguez", "Martínez", "Hernández", "López", "González", "Pérez", "Sánchez"];
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        return `${firstName} ${lastName}`;
    };

    const generateDate = () => {
        const start = new Date(1900, 0, 1); // Fecha de inicio: 1 de enero de 1900
        const end = new Date(2024, 5, 1); // Fecha de fin: 1 de junio de 2024
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return date.toISOString().split('T')[0];
    };

    const generateTitle = () => "Título Desconocido";
    
    const generateExemplars = () => Math.floor(Math.random() * 51); // Genera un número entre 0 y 50

    const generateAvailability = () => {
        const options = ["físico", "electrónico", "físico y electrónico"];
        return options[Math.floor(Math.random() * options.length)];
    };

    const generateTopic = () => {
        const topics = ["Historia", "Ciencia Ficción", "Romance", "Fantasía", "Misterio", "Biografía", "Tecnología", "Economía", "Biologia", "Ciencias Sociales", "Educativo"];
        return topics[Math.floor(Math.random() * topics.length)];
    };

    // Función para capitalizar la primera letra de una cadena
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // Obtener valores del formulario o usar valores predeterminados
    let titulo = document.getElementById('titulo').value || generateTitle();
    titulo = capitalizeFirstLetter(titulo); // Transformar la primera letra a mayúscula
    const isbn = document.getElementById('isbn').value || generateISBN();
    const autor = document.getElementById('autor').value || generateAuthor();
    const fechaEdicion = document.getElementById('fecha-edicion').value || generateDate();
    const ejemplares = generateExemplars();
    const disponibilidad = generateAvailability();
    const tema = generateTopic();

    const rightContent = document.getElementById('right-content');
    const leftContent = document.getElementById('left-content');

    // Probabilidad de encontrar un libro
    const foundBook = Math.random() < 0.7;

    if (foundBook) {
        rightContent.innerHTML = `
            <h3>Información del Libro</h3>
            <p><strong>Título:</strong> ${titulo}</p>
            <p><strong>ISBN:</strong> ${isbn}</p>
            <p><strong>Autor:</strong> ${autor}</p>
            <p><strong>Fecha de Edición:</strong> ${fechaEdicion}</p>
            <p><strong>No ejemplares disponibles:</strong> ${ejemplares}</p>
            <p><strong>Libro disponible en:</strong> <span class="no-wrap">${disponibilidad}</span></p>
            <p><strong>Tema:</strong> ${tema}</p>
        `;
        rightContent.classList.remove('not-found');
        rightContent.classList.add('found-book');
    } else {
        rightContent.innerHTML = `
            <h3>Resultado de la Búsqueda</h3>
            <p>El libro "${titulo}" no se encuentra...</p>
        `;
        rightContent.classList.remove('found-book');
        rightContent.classList.add('not-found');
    }

    // Ajusta la altura del left-content para que coincida con el right-content
    setTimeout(() => {
        leftContent.style.height = rightContent.offsetHeight + 'px';
    }, 100); // Esperar un poco para asegurarse de que el contenido esté completamente renderizado
});