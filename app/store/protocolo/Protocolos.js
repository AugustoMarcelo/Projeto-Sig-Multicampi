Ext.define('Packt.store.protocolo.Protocolos', {
	extend: 'Ext.data.Store',

	requires: [
		'Packt.model.protocolo.Protocolo' 
	],
	
	model: 'Packt.model.protocolo.Protocolo', 

	storeId: 'protocolos',

	autoLoad: true,
	
	proxy: {
		type: 'ajax',
		url: 'php/protocolo/protocolos.php',

		reader: {
			type: 'json',
			root: 'data'
		}
	}
});