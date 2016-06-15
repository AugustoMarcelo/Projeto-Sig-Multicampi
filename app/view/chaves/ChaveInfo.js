Ext.define('Packt.view.chaves.ChaveInfo', {
	extend: 'Ext.window.Window',
	alias: 'widget.chavesinfo',

	title: 'Informações sobre a chave',
	autoShow: true,
	modal: true,

	items: [
		{
			defaults: {
				xtype: 'text'
			},
			items: [
				{
					text: 'Nº Chave: ',
					itemId: 'chaveId'
				},
				{
					text: 'Operacação: ',
					itemId: 'chaveOp'
				},
				{
					text: 'Entregou: ',
					itemId: 'chaveEntrega'
				},
				{
					text: 'Portador: ',
					itemId: 'chavePort'
				},
				{
					text: 'Data da Operacação: ',
					itemId: 'chaveData'
				}
			]
		}
	]
});