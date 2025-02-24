import React, { useState, useEffect } from 'react';
import { getUser } from '../pages/login';
import axios from 'axios';

const Header = () => {

    const [name, setName] = useState('');
    let user = '';

    useEffect(() => {
        const getName = async () => {
            try {
		user = getUser();
                const response = await axios.get(`http://201.16.213.225:6663/api/auth/getName/${user}`);
                if (response.status === 200) {
                    setName(response.data); // Supondo que o backend retorna { name: "Fulano" }
                } else {
                    setName('Usuário não encontrado');
                }
            } catch (error) {
                console.error('Erro na verificação de autenticação:', error);
                setName('Erro ao buscar nome');
            }
        };

        getName();
    }, [user]); // Este efeito só roda quando `user` for atualizado
    
    return (
        <header className="py-12 flex flex-row justify-end">
            <div>
               <span>Olá, {name}!</span>
            </div>
        </header>
    );
};

export default Header;
