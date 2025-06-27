// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Variables para controlar el scroll
    let lastScrollTop = 0;
    let scrollThreshold = 5; // Píxeles mínimos para activar el efecto
    
    // Obtener el header
    const header = document.getElementById('header');
    
    // Verificar que el header existe
    if (!header) {
        console.error('Header element not found');
        return;
    }

    // Función para manejar el scroll
    function handleScroll() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Evitar valores negativos en algunos navegadores
        if (currentScrollTop < 0) {
            return;
        }

        // Solo procesar si hay un cambio significativo en el scroll
        if (Math.abs(lastScrollTop - currentScrollTop) <= scrollThreshold) {
            return;
        }

        // Si estamos en la parte superior de la página, siempre mostrar
        if (currentScrollTop <= 100) {
            header.classList.remove('header--hidden');
            header.classList.add('header--visible');
        }
        // Si scrolleamos hacia abajo, ocultar
        else if (currentScrollTop > lastScrollTop && !header.classList.contains('header--hidden')) {
            header.classList.add('header--hidden');
            header.classList.remove('header--visible');
        }
        // Si scrolleamos hacia arriba, mostrar
        else if (currentScrollTop < lastScrollTop && header.classList.contains('header--hidden')) {
            header.classList.remove('header--hidden');
            header.classList.add('header--visible');
        }

        lastScrollTop = currentScrollTop;
    }

    // Throttle function para optimizar el rendimiento
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Event listener con throttle para optimizar el rendimiento
    window.addEventListener('scroll', throttle(handleScroll, 10));

    // Inicializar el estado de la navbar
    if (window.pageYOffset <= 100) {
        header.classList.add('header--visible');
    }
});