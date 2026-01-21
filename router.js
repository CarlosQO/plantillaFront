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