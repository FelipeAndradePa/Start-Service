import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
 
    const navigate = useNavigate();

    const handleNavigation = () => {
	navigate('/content');
    }

    return (
	<nav>
	    <div className='mx-auto py-8 max-w-7xl px-2 sm:px-6 lg:px-8'>
		<button className="hover:bg-zinc-50 p-2 rounded-lg w-full flex flex-row justify-start items-center typo">
                     <FontAwesomeIcon  icon="circle-user" className="typo"/>
                     <span className="ms-2">Iniciar atendimento</span>
                </button>
		<button className="hover:bg-zinc-50 p-2 rounded-lg w-full flex flex-row justify-start items-center typo">
                     <FontAwesomeIcon  icon="circle-user" className="typo"/>
                     <span className="ms-2">Relatórios</span>
                </button> 
	    </div>
	</nav>
    );
} 

export default Navbar;
