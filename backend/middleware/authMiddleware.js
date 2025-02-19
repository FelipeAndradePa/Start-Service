const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization'); // O token deve ser enviado no cabeçalho

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido!' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded; // Adiciona os dados do usuário ao request
        next(); // Permite o acesso à rota
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido!' });
    }
};

module.exports = authMiddleware;

