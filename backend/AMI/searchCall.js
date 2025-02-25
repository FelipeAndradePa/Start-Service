const AsteriskAmi = require('asterisk-ami-client');

const client = new AsteriskAmi({
    reconnect: true,
    keepAlive: true
});

const amiConfig = {
    host: '127.0.0.1',
    port: 5038,
    username: 'admin',
    password: 'Algar@!1'
};

const searchByRamal = async (ramal) => {
    try {
        await client.connect(amiConfig.username, amiConfig.password, amiConfig.host, amiConfig.port);
        console.log('✅ Conectado ao AMI do Asterisk');

        const response = await client.action({ Action: 'CoreShowChannels' });

	const chamadas = response.events.filter(event => 
            event.Channel.includes(ramal) || event.CallerIDNum === ramal
        );

        if (chamadas.length > 0) {
            console.log(`📞 Chamada encontrada para o ramal ${ramal}:`, chamadas);
            return chamadas;
        } else {
            console.log(`❌ Nenhuma chamada ativa encontrada para o ramal ${ramal}`);
            return null;
        }
    } catch (error) {
        console.error('❌ Erro ao buscar ligação:', error);
        return null;
    } finally {
        client.disconnect();
    }
};

module.exports = { searchByRamal }
