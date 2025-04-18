// Código mejorado para integrar con Snipcart y aplicar las modificaciones solicitadas

document.addEventListener('DOMContentLoaded', function() {
  console.log('Documento cargado, esperando a Snipcart...');
  
  // Función para verificar si Snipcart está disponible
  function checkSnipcartReady() {
    if (window.Snipcart) {
      console.log('Snipcart está listo');
      configureSnipcart();
    } else {
      console.log('Esperando a Snipcart...');
      setTimeout(checkSnipcartReady, 500);
    }
  }
  
  // Iniciar verificación
  checkSnipcartReady();
  
  // Configurar Snipcart cuando esté disponible
  function configureSnipcart() {
    // 1. Prevenir edición de elementos en el carrito
    Snipcart.api.cart.configure('item_editable', false);
    console.log('Configuración de items no editables aplicada');
    
    // 2. Manejar el evento de orden completada para redirigir a página de gracias
    Snipcart.events.on('order.completed', function (order) {
      console.log('Pedido completado, redirigiendo a página de agradecimiento');
      window.location.href = '/gracias.html';
    });
    
    // 3. Solucionar problema del botón "Continuar a pago"
    Snipcart.events.on('snipcart.ready', function() {
      console.log('Snipcart UI está lista');
      
      // Observador para detectar cuando aparece el botón de continuar a pago
      const observer = new MutationObserver(function(mutations) {
        const continueButton = document.querySelector('.snipcart-button-primary');
        if (continueButton && continueButton.textContent.includes('Continuar a pago')) {
          console.log('Botón de continuar a pago encontrado');
          
          // Reemplazar el evento click del botón
          continueButton.addEventListener('click', function(e) {
            console.log('Botón de continuar a pago clickeado');
            
            // Forzar avance al siguiente paso
            Snipcart.api.theme.cart.next();
          });
        }
      });
      
      // Iniciar observación de cambios en el DOM
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
    
    // 4. Forzar que los items no sean editables después de añadirlos
    Snipcart.events.on('item.added', function (item) {
      console.log('Item añadido, aplicando restricción de edición');
      item.editable = false;
    });
  }
});
