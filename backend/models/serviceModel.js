const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now, // Salva a data e horário do atendimento automaticamente
    },
    clientName: {
        type: String,
        required: true,
    },
    licensePlate: {
        type: String,
        required: true,
        uppercase: true, // Garante que a placa seja salva em maiúsculas
        trim: true, // Remove espaços em branco extras
    },
    status: {
        type: String,
        enum: ['Aberto', 'Em Andamento', 'Concluído', 'Cancelado'],
        default: 'Aberto',
    },
    protocol: {
        type: String,
        required: true,
        unique: true, // Garante que o protocolo seja único
    }
});

module.exports = mongoose.model('Ticket', TicketSchema);

