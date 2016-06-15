Ext.define('Packt.model.unidade.Unidade', {
	extend: 'Ext.data.Model',

	idProperty: 'id',

	fields: [
		{name: 'id'},
		{name: 'codigo'},
		{name: 'nomeUnidade'},
		{name: 'responsavel'}
	]
});