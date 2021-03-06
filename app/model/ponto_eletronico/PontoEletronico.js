Ext.define('Packt.model.ponto_eletronico.PontoEletronico', {
	extend: 'Ext.data.Model',

	idProperty: 'id',

	fields: [
		{name: 'id', type: 'integer'},
		{name: 'usuarioId', type: 'integer'},
		{name: 'nomeUsuario', type: 'string', persist: false},				//CAMPO UTILIZADO PARA MOSTRAR NO GRID O NOME DO USUÁRIO AO INVÉS DE BUSCAR NA STORE E EVITAR PROBLEMAS DE NULIDADE 
		{name: 'dataPonto', type: 'date', dateFormat: 'Y-m-d'},
		{name: 'ip', type: 'string'},
		{name: 'entrada01', type: 'date', dateFormat: 'H:i:s'},
		{name: 'saida01', type: 'date', dateFormat: 'H:i:s'},
		{name: 'entrada02', type: 'date', dateFormat: 'H:i:s'},
		{name: 'saida02', type: 'date', dateFormat: 'H:i:s'},
		{name: 'totaldia', type: 'date', dateFormat: 'H:i:s'}
	]
});