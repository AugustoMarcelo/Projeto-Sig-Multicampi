Ext.define('Packt.store.security.Users', {
	extend: 'Ext.data.Store',

	requires: [
		'Packt.model.security.User' 
	],
	model: 'Packt.model.security.User', 

	storeId: 'users',

	autoLoad: true,
	
	proxy: {
		type: 'ajax',
		url: 'php/security/users.php',

		reader: {
			type: 'json',
			root: 'data'
		}
	}
});