import React, { useState, useEffect } from 'react';
import { getUser } from '../pages/login';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {

    const [name, setName] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    
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
    
    const toggleDropdown = () => {
	let dropdown = document.querySelector('#dropdownButton #dropdown');
	dropdown.classList.toggle("hidden");
    };

    return (
	<header className="py-12 flex flex-row justify-end">
	    <div className="relative" id="dropdownButton">
               <div onClick={toggleDropdown} className="border-solid border-gray-400 border-{1px} px-5 py-2 rounded cursor-pointer font-bold flex justify-between w-[200px] bg-white shadow-sm">
                   <FontAwesomeIcon  icon="circle-user" className="text-lg" />
                   {name}
               </div>
	       <div id="dropdown" className="rounded border-[1px] border-gray-300 bg-white absolute top-[40px] w-[200px] shadow-md hidden">
	      	   <div className="cursor-pointer p-4"> Sair </div>
	       </div>
             </div>
        </header>   
    );
};

export default Header;
