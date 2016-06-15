Ext.define('Packt.store.localizacao.Localizacoes', {
	extend: 'Ext.data.Store',
	alias: 'store.localizacoes',
	requires: [
		'Packt.model.localizacao.Localizacao'
	],

	model: 'Packt.model.localizacao.Localizacao',

	storeId: 'localizacoes',

	autoLoad: true,

	proxy: {
		type: 'ajax',
		url: 'php/localizacao/localizacoes.php',

		reader: {
			type: 'json',
			root: 'data'
		}
	}
});