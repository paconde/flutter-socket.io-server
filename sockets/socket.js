const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Metallica'));
bands.addBand(new Band('Iron Maiden'));
bands.addBand(new Band('AC-DC'));


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente Conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente Desconectado');
    });

    // Excuchando 'mensaje'
    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);
        // Emitimos a todos los clientes
        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
    
    client.on('add-band', (payload) => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    // client.on('emitir-mensaje', (payload)=>{
    //     // console.log(payload);
    //     //io.emit('nuevo-mensaje', payload); // Emite a todos
    //     client.broadcast.emit('nuevo-mensaje', payload); // Emite a todos menos al que lo emitió
    // });

});
