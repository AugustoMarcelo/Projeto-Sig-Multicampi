Ext.define('Packt.store.inventory.ProductsWarning', {
	extend: 'Ext.data.Store',
	storeId: 'productsWarning',

	requires: [
		'Packt.model.inventory.Product' 
	],
	model: 'Packt.model.inventory.Product', 

	pageSize: 20,

	autoLoad: true,

	proxy: {
		type: 'ajax',
		url: 'php/inventory/productswarning.php',

		reader: {
			type: 'json',
			root: 'data'
		}
	}

});