Ext.define('Packt.model.inventory.Entrada_Saida', {
	extend: 'Ext.data.Model',

	idProperty: 'id',

	fields: [
		{name: 'id'},
		{name: 'produto'},
		{name: 'User_id'},
		{name: 'quantidade', type: 'integer'},
		{name: 'destino', type: 'string'},
		{name: 'dataOperacao', type: 'date', dateFormat: 'Y-m-d H:i:s'},
		{name: 'observacoes'},
		{name: 'operacao'}
	],

	init: function() {

		Ext.data.validations.rangeMessage = 'O campo deve conter entre {0} e {1} dígitos.';
		Ext.data.validations.formatMessage = 'Tipo de dado inválido.';

		Ext.data.validations.range = function(config, value) {			
			if(value === undefined) {
				return false;
			}
			var min = config.min,
			max = config.max;			
			if((value.length < min) || (value.length > max)) {
				config.message = Ext.String.format(this.rangeMessage, min, max);
				return false;
			} else {
				return true;
			}
		}
	},

	validations: [		
		{type: 'range', field: 'destino', min: 4, max: 30},
		{type: 'format', field: 'destino', matcher: /([a-zA-Z]+)/},
		{type: 'presence', field: 'destino', message: 'Especifique um destino'},
		{type: 'format', field: 'quantidade', matcher: /([0-9])/}
	],
    
});

