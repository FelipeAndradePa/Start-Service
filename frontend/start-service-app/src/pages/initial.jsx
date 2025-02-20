import React from 'react';
import axios from 'axios';

const Initial = () => {

    const [state, setState] = React.useState({
	plate: '',
	documents: '',
    });
    
    const searchClient = async () => {
	
	const { plate, documents } = state;

	try {
            const response = await axios.post(`http://201.16.213.225:6663/api/client/${plate}`, { plate, documents });
            setState((prev) => ({ ...prev, token: response.data.token }));
            console.log(response.data.token);
	} catch (error) {
	    console.error('Erro ao fazer login: ', error.response.data.error);
	}
    };

    return (
	<div class="flex justify-center p-4">
           <div class="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md">
              <form id="formPesquisa" class="mt-8">
                  <div class="flex flex-row justify-between px-4">
                     <div class="mb-4">
                        <label for="plate" class="block text-sm font-medium mb-2">Placa:</label>
                        <input type="text" id="plate" name="plate" class="w-96 p-2 border border-gray-300 rounded-lg">
                     </div>
         	     <div class="mb-4">
                        <label for="document" class="block text-sm font-medium mb-2">Documento:</label>
                        <input type="text" id="document" name="document" class="w-96 p-2 border border-gray-300 rounded-lg">
                     </div>
                  </div>
                  <div class="flex justify-end px-4">
                     <button onClick={searchClient} class="w-48 mt-4 mb-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Pesquisar</button>
                  </div>
              </form>
	   </div>
	</div>
    );
}

exports default Initial;
