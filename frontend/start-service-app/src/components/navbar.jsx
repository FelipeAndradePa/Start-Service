import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
 
    const navigate = useNavigate();

    const handleNavigation = () => {
	navigate('/content');
    }

    return (
	<nav>
	    <div className='mx-auto py-8 max-w-7xl sm:px-6 lg:px-8'>
		<button className="hover:bg-zinc-50 py-2 rounded-lg w-full flex flex-row justify-start items-center">
                     <FontAwesomeIcon  icon="circle-user" className="text-lg"/>
                     <Link to='' className="ms-2 text-lg">Realizar consulta</Link>
                </button>
		<button className="hover:bg-zinc-50 py-2 rounded-lg w-full flex flex-row justify-start items-center">
                     <FontAwesomeIcon  icon="list" className="text-lg"/>
                     <Link to='reports' className="ms-2 text-lg">Relatórios</Link>
                </button> 
	    </div>
	</nav>
    );
} 

export default Navbar;
