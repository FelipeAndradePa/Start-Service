import React from 'react';
import axios from 'axios';

const Initial = () => {

    const [state, setState] = React.useState({
	plate: '',
	documents: '',
	phone: '',
	codRef: ''
    });
    const [beneficiarios, setBeneficiarios] = React.useState([]);
 
    const searchClient = async (e) => {
	
	e.preventDefault();

	const { plate, documents, phone, codRef } = state;
	try {
            const response = await axios.post(`http://201.16.213.225:6663/api/client/${plate}`, { documents, phone, codRef });
	    const { data } = response;
            
	    if (data.beneficiarios && data.beneficiarios.length > 0) {
                setBeneficiarios(data.beneficiarios);
            } else {
                setBeneficiarios([]); // Limpa a lista se não houver beneficiários
                console.log("Nenhum beneficiário encontrado.");
            }
	} catch (error) {
	    console.error('Erro ao fazer login: ', error.response.data.error);
	}
    };

    return (
	<div className="flex flex-col justify-center items-center  p-4">
           <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md">
              <form id="formPesquisa" className="mt-8">
                  <div className="flex flex-row justify-between px-4">
                     <div className="mb-4">
                        <label htmlFor="plate" className="block text-sm font-medium mb-2">Placa:</label>
                        <input
                                type="text"
                                id="plate"
                                name="plate"
                                value={state.plate}
                                onChange={(e) => setState((prev) => ({ ...prev, plate: e.target.value }))}
                                className="w-96 p-2 border border-gray-300 rounded-lg"
                        />
                     </div>
         	     <div className="mb-4">
                        <label htmlFor="document" className="block text-sm font-medium mb-2">Documento:</label>
                        <input
                                type="text"
                                id="document"
                                name="document"
                                value={state.documents}
                                onChange={(e) => setState((prev) => ({ ...prev, documents: e.target.value }))}
                                className="w-96 p-2 border border-gray-300 rounded-lg"
                        />
                     </div>
                  </div>
                  <div className="flex justify-end px-4">
                     <button onClick={(e) => searchClient(e)} className="w-48 mt-4 mb-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Pesquisar</button>
                  </div>
              </form>
	   </div>
	   <div className="mt-6 w-full max-w-4xl">
                {beneficiarios.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {beneficiarios.map((beneficiario, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-700">{beneficiario.nome}</h3>
                                <p className="text-sm text-gray-500">Documento: {beneficiario.documento}</p>
                                <p className="text-sm text-gray-500">Situação: {beneficiario.situacao === "A" ? "Ativo" : "Inativo"}</p>
                                <p className="text-sm text-gray-500">Endereço: {beneficiario.logradouro}, {beneficiario.numero}, {beneficiario.bairro}, {beneficiario.cidade} - {beneficiario.estado}</p>
                                <p className="text-sm text-gray-500">CEP: {beneficiario.cep}</p>
                                <p className="text-sm text-gray-500">Cliente: {beneficiario.cliente}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center mt-4">Nenhum beneficiário encontrado.</p>
                )}
            </div>
	</div>
    );
}

export default Initial;
