const axios = require('axios');
const FormData = require('form-data');
const searchByRamal = require('../AMI/searchCall.js'); 
const searchClient = async (req, res) => {

    try {
	const { plate } = req.params;
	const { documents, phone, codRef } = req.body;

	console.log("Passei aqui");
	// Criando os dados do formulário
	let data = new FormData();
	data.append('login', 'techline');
	data.append('senha', '3biTObwmCnyZcqndXWaoDipOoILA4C');
	data.append('documento', documents || '');
	data.append('telefone', phone || '');
	data.append('placa', plate || '');
	data.append('codigoReferencia', codRef || '');

	// Configuração da requisição
	const config = {
	    method: 'post',
	    maxBodyLength: Infinity,
	    url: 'https://sistemas.infornet.com.br/webassist/rsassist/wba/api/api_ura/selecionarBeneficiario',
	    headers: { 
		...data.getHeaders()
            },                                                                                       
	    data: data                                                                           
	};
	
	const response = await axios(config);

	console.log(response.data);
	return res.status(200).json(response.data);

    } catch (error) {
	console.error('Erro ao buscar cliente:', error);
        return res.status(500).json({ message: 'Erro ao buscar cliente', error: error.message });
    }               
}

const iniciateService = async (req, res) => {
   
    try {
	const { codigoUsuario, documento } = req.body;
	console.log(documento);
        const arquivos = '';
	const data = {
	    login: 'techline',
	    senha: '3biTObwmCnyZcqndXWaoDipOoILA4C',
	    documento,
            codigoUsuario,
	    arquivos
	};

	const config = {
	    method: 'post',
	    maxBodyLength: Infinity,
	    url: "https://sistemas.infornet.com.br/webassist/rsassist/wba/api/api_ura/iniciarAtendimento",
	    headers: {
                "Content-Type": "application/json"
            },
	    data
	};

	const response = await axios(config);

	return res.status(200).json(response.data);

    } catch (error) {
	console.error('Erro ao iniciar atendimento:', error);
	return res.status(500).json({ message: 'Erro ao iniciar atendimento', error: error.message });
    }
}

module.exports = { searchClient, iniciateService } 
