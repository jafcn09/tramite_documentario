window.addEventListener('load', function() {
    setTimeout(function() {
  
        const filterInput = document.querySelector('.filter-container input[type="text"]');
        if (filterInput) {
            filterInput.placeholder = 'Filtrar por etiqueta...';
        }

   
        const translations = {
            'Filter by tag': 'Filtrar por etiqueta',
            'Try it out': 'Probar',
            'Execute': 'Ejecutar',
            'Clear': 'Limpiar',
            'Cancel': 'Cancelar',
            'Response body': 'Cuerpo de respuesta',
            'Response headers': 'Cabeceras de respuesta',
            'Request body': 'Cuerpo de solicitud',
            'Description': 'Descripción',
            'Parameters': 'Parámetros',
            'No parameters': 'Sin parámetros',
            'Responses': 'Respuestas',
            'Response': 'Respuesta',
            'Example Value': 'Valor de ejemplo',
            'Model': 'Modelo',
            'Loading...': 'Cargando...',
            'Server response': 'Respuesta del servidor',
            'Code': 'Código',
            'Details': 'Detalles',
            'Headers': 'Cabeceras',
            'Request URL': 'URL de solicitud',
            'Curl': 'Curl'
        };

        // Aplicar traducciones
        document.querySelectorAll('*').forEach(function(el) {
            if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
                const text = el.textContent.trim();
                if (translations[text]) {
                    el.textContent = translations[text];
                }
            }
        });

        // Observer para cambios dinámicos
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) {
                            const filterInput = node.querySelector && node.querySelector('.filter-container input[type="text"]');
                            if (filterInput) {
                                filterInput.placeholder = 'Filtrar por etiqueta...';
                            }
                        }
                    });
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }, 1000);
});