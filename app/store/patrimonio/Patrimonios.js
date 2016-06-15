Ext.define('Packt.store.patrimonio.Patrimonios', {
	extend: 'Ext.data.Store',
	alias: 'store.patrimonios',
	requires: [
		'Packt.model.patrimonio.Patrimonio'
	],

	model: 'Packt.model.patrimonio.Patrimonio',

	storeId: 'patrimoniosStore',

	autoLoad: true,

	proxy: {
		type: 'ajax',
		url: 'php/patrimonio/patrimonios.php',

		reader: {
			type: 'json',
			root: 'data'
		}
	}
});