Ext.define('Packt.store.inventory.Entradas_Saidas', {
	extend: 'Ext.data.Store',

	requires: [
		'Packt.model.inventory.Entrada_Saida'
	],

	model: 'Packt.model.inventory.Entrada_Saida',

	//pageSize: 25,

	autoLoad: true,

	proxy: {
		type: 'ajax',

		api: {
			create: 'php/inventory/entrada_saida/createEntradaSaida.php',
			read: 'php/inventory/entrada_saida/listaEntradaSaida.php',
			update: '',
			destroy: 'php/inventory/entrada_saida/deleteEntradaSaida.php'
		},

		reader: {
			type: 'json',
			root: 'data'
		},

		writer: {
			type: 'json',
			root: 'data',
			encode: true
		}
	}
});