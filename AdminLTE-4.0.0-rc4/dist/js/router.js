document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los links con data-pagina
    const menuLinks = document.querySelectorAll('[data-pagina]');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pagina = this.getAttribute('data-pagina');
            cargarPagina(pagina);
        });
    });
});

function cargarPagina(nombrePagina) {
    const contenedor = document.getElementById('root');
    
    // Hacemos el "include" dinámico
    fetch(`views/${nombrePagina}.html`)
        .then(response => {
            if (!response.ok) throw new Error("Página no encontrada");
            return response.text();
        })
        .then(html => {
            contenedor.innerHTML = html;
            
            // IMPORTANTE: Re-inicializar validación de formularios después de cargar
            initFormValidation();
            
            // Si la página necesita cargar datos de la API, 
            // llamamos a la función correspondiente aquí
            // if (nombrePagina === 'inventario') {
            //     listarProductosEnTabla(); 
            // }
        })
        .catch(error => {
            contenedor.innerHTML = "<h2>Error 404: La página no existe.</h2>";
        });
}

// Función para inicializar validación de formularios
function initFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach((form) => {
        // Remover listeners antiguos
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);
        
        // Agregar nuevo listener
        newForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();

            if (!this.checkValidity()) {
                this.classList.add('was-validated');
                console.warn('Formulario inválido - Completa los campos correctamente');
            } else {
                this.classList.add('was-validated');
                console.log('Formulario válido');
                alert('Formulario enviado correctamente');
            }
        });
    });
}