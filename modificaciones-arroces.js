// Código para integrar con Snipcart y aplicar las modificaciones solicitadas

document.addEventListener('snipcart.ready', function() {
  console.log('Snipcart está listo');
  
  // 1. Personalizar para evitar que los clientes editen opciones después del pedido
  // Esto deshabilita la edición de elementos en el carrito
  Snipcart.api.cart.configure('item_editable', false);
  
  // 2. Redirigir a la página de agradecimiento personalizada después de completar el pedido
  Snipcart.events.on('order.completed', function (order) {
    console.log('Pedido completado, redirigiendo a página de agradecimiento');
    // Redirigir a la página de gracias personalizada
    window.location.href = '/gracias.html';
  });
});
