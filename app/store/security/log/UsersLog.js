Ext.define('Packt.store.security.log.UsersLog', {
	extend: 'Ext.data.Store',

	requires: [
		'Packt.model.security.log.Log' 
	],
	model: 'Packt.model.security.log.Log',

	pageSize: 20,

	autoLoad: true,
	 
	proxy: {
		type: 'ajax',

		api: {
			create: 'php/security/log/createLog.php',
			read: 'php/security/log/usersLog.php',
			update: '',
			destroy: 'php/security/log/deleteLogs.php'
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