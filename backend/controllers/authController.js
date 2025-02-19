const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { user, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Usuário não encontrado!' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Credenciais inválidas!' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login bem-sucedido!', token });

    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
}

const register = async (req, res) => {
    try {
        const { name, user, password } = req.body;

        const existingUser = await User.findOne({ user });
        if (existingUser) return res.status(400).json({ message: 'Usuário já cadastrado!' });
       
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });

    } catch (error) {
       	res.status(500).json({ message: 'Erro no servidor', error });
	                                                                                     }
}
       
module.exports = { register, login };
        
