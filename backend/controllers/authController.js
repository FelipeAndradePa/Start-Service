const User = require('../models/userModel');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { user, password } = req.body;

        const account  = await User.findOne({ user });
        if (!account) return res.status(400).json({ message: 'Usuário não encontrado!' });

       	const [ storedHash, storedSalt] = account.password.split(':');
	
	const hash = crypto.createHmac('sha256', storedSalt)
			   .update(password)
			   .digest('hex');

	
	if (hash !== storedHash) return res.status(400).json({ message: 'Senha incorreta!' });

        const token = jwt.sign({ id: account._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login bem-sucedido!', token });

    } catch (error) {
	console.error('❌ Erroo: ', error);
        res.status(500).json({ message: 'Erro no servidor', error });
    }
}

const register = async (req, res) => {
    try {
        const { name, user, password } = req.body;
	
        const existingUser = await User.findOne({ user });
        if (existingUser) return res.status(400).json({ message: 'Usuário já cadastrado!' });
       
        const salt = crypto.randomBytes(16).toString('hex');
	const hash = crypto.createHmac('sha256', salt)
			   .update(password)
			   .digest('hex');

        const newUser = new User({ name, user, password: hash + ':' + salt });
        await newUser.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });

    } catch (error) {
	console.error('❌ Erro ao registrar usuário:', error);
       	res.status(500).json({ message: 'Erro no servidor', error });	                                                                                     }
}

const verify = (req, res) => {
    res.status(200).json({ message: 'Usuário autenticado com sucesso', user: req.user });
}      

const getName = async (req, res) => {
    try {
	const { user } = req.params;
	const selectUser = await User.findOne({ user });

	res.status(200).json(selectUser.name);

    } catch (error) {
	res.status(500).json({ message: 'Usuário não encontrado', error });
    }

}
 
module.exports = { register, login, verify, getName };
        
