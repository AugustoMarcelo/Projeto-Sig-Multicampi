Ext.define('Packt.store.inventory.log.ProductsLog', {
	extend: 'Ext.data.Store',

	requires: [
		'Packt.model.inventory.log.Log' 
	],
	model: 'Packt.model.inventory.log.Log',

	pageSize: 20,

	autoLoad: true,
	 
	proxy: {
		type: 'ajax',
		//url: 'php/inventory/log/productsLog.php',

		api: {
			create: 'php/inventory/log/createLog.php',
			read: 'php/inventory/log/productsLog.php',
			update: '',
			destroy: 'php/inventory/log/deleteLogs.php'
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