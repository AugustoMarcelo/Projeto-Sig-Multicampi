Ext.define('Packt.store.inventory.Products', {
	extend: 'Ext.data.Store',
	
	requires: [
		'Packt.model.inventory.Product' 
	],
	
	model: 'Packt.model.inventory.Product', 

	storeId: 'products',

	autoLoad: true,
	
	proxy: {
		type: 'ajax',
		url: 'php/inventory/products.php',
		
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});