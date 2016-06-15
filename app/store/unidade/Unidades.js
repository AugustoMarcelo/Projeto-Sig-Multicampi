Ext.define('Packt.store.unidade.Unidades', {
	extend: 'Ext.data.Store',
	alias: 'store.unidades',
	requires: [
		'Packt.model.unidade.Unidade'
	],

	model: 'Packt.model.unidade.Unidade',

	storeId: 'unidades',

	autoLoad: true,

	proxy: {
		type: 'ajax',
		url: 'php/unidade/unidades.php',

		reader: {
			type: 'json',
			root: 'data'
		}
	}
});