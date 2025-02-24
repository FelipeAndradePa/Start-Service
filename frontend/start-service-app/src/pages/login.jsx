import React from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const getToken = () => localStorage.getItem('token');
const setToken = (token) => localStorage.setItem('token', token);
const getUser = () => localStorage.getItem('user');
const setUser = (user) => localStorage.setItem('user', user);

const Login = () => {
     
    const navigate = useNavigate();
    const [state, setState] = React.useState({
        user: '',
        password: '',
        token: '',
        data: ''
    });

    const handleLogin = async () => {
	
	const { user, password } = state;

	try {
	    setUser(user);
	    console.log(user);
            const response = await axios.post('http://201.16.213.225:6663/api/auth/login', { user, password });
            setState((prev) => ({ ...prev, token: response.data.token }));
            console.log(response.data.token);
            setToken(response.data.token)
            navigate('/content');
	} catch (error) {
	    console.error('Erro ao fazer login: ', error.response.data.error);
	}
    };

    return (
        <div className='bg-gray-700 h-screen flex flex-col items-center justify-center'>
            <div className='bg-white p-8 rounded shadow-md w-96 mt-20'>
                <div className='flex justify-center'>
                    <h1 className='text-2xl font-bold mb-8 text-gray-800'>Autenticação de usuário</h1>
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Usuário:</label>
                    <input className='mt-1 p-2 w-full border rounded-md' type="text" 
                        value={state.user} onChange={(e) => setState((prev) => ({ ...prev, user: e.target.value }))} />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Senha:</label>
                    <input className='mt-1 p-2 w-full border rounded-md' type="password" 
                        value={state.password} onChange={(e) => setState((prev) => ({ ...prev, password: e.target.value }))} />
                </div>
                <button className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300' onClick={handleLogin}>Entrar</button>
                <div className="mt-4 flex justify-center">
                    <p className="text-sm text-gray-700">Não tem uma conta? <Link to="/register" className="text-blue-500">Cadastre-se aqui</Link></p>
                </div>
            </div>
        </div>
    );
}

export { getToken, getUser };
export default Login;
