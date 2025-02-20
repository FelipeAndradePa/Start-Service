const axios = require('axios');
const FormData = require('form-data');

const searchClient = async () => {

    try {
	const { plate } = req.params;
	const { documents, phone, codRef } = req.body;

	// Criando os dados do formulário
	let data = new FormData();
	data.append('login', 'techline');
	data.append('senha', '3biTObwmCnyZcqndXWaoDipOoILA4C');
	data.append('documento', documents || '');
	data.append('telefone', phone || '');
	data.append('placa', plate || '');
	data.append('codigoReferencia', codRef || '');

	// Configuração da requisição
	let config = {
	    method: 'post',
	    maxBodyLength: Infinity,
	    url: 'https://sistemas.infornet.com.br/webassist/rsassist/wba/api/api_ura/selecionarBeneficiario',
	    headers: { 
		...data.getHeaders()
            },                                                                                       data: data                                                                           };
	
	const response = await axios(config);

	return res.status(200).json(response.data);

    } catch (error) {
	console.error('Erro ao buscar cliente:', error);
        return res.status(500).json({ message: 'Erro ao buscar cliente', error: error.message });
    }               
}

const iniciateService = async () => {

}

module.exports = { searchClient, iniciateService } 
