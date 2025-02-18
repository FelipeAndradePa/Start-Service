const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require("dotenv-safe").config();

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Definição das rotas
app.use('/api/auth', authRoutes);

// Rota Padrão
app.get('/', (req, res) => {
    res.send('API está rodando...');
});
