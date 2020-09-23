const {io} = require('../index');

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente Conectado');
    client.on('disconnect', () => {
        console.log('Cliente Desconectado');
    });
    // Excuchando 'mensaje'
    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);
        // Emitimos a todos los clientes
        io.emit('mensaje', { admin: 'Nuevo mensaje' });


    });
});
