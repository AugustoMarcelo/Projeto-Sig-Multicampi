Ext.define('Packt.model.localizacao.Localizacao', {
	extend: 'Ext.data.Model',

	idProperty: 'id',

	fields: [
		{name: 'id'},
		{name: 'numSala'},
		{name: 'nomeDoLocal'},
		{name: 'responsavel'}
	],
	
	validations: [
		{type: 'presence', field: 'numSala', message: 'Determine o número para a sala'},
		{type: 'presence', field: 'responsavel', message: 'Especifique o responsável pelo ambiente'}
	]
});