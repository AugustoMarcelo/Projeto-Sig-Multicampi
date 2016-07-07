Ext.define('Packt.store.ponto_eletronico.PontoEletronico', {
	extend: 'Ext.data.Store',

	alias: 'store.pontoeletronico',
	requires: [
		'Packt.model.ponto_eletronico.PontoEletronico'
	],

	model: 'Packt.model.ponto_eletronico.PontoEletronico',

	storeId: 'pontoeletronico',
	autoDestroy: true,
	autoLoad: true,
	
	proxy: {
		type: 'ajax',		
		url: 'php/ponto_eletronico/listaPontoEletronico.php',

		reader: {
			type: 'json',
			root: 'data'
		}
	}
});