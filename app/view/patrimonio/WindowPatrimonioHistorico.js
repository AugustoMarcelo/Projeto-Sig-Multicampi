Ext.define('Packt.view.patrimonio.WindowPatrimonioHistorico', {
	extend: 'Ext.window.Window',
	alias: 'widget.windowpatrimoniohistorico',
	autoShow: true,
	modal: true,
	closable: false,
	title: 'Histórico do Patrimônio', //Título da Janela

	height: 400,
	width: 1000,

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	items: [
		{
			xtype: 'grid',
			border: false,				
			store: '',

			viewConfig: {
				emptyText: 'O patrimônio selecionado ainda não possui histórico'
			},

			columns: [
				{text: 'Categoria', width: '20%'},
				{text: 'Descrição', width: '70%'},
				{text: 'Data', width: '10%'}
			],

			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					items: [
						{
							xtype: 'button',
							text: 'Cadastrar evento',
							iconCls: 'incidente',
							itemId: 'btnAddEvento'
						}
					]
				}
			]
		}
	],

	dockedItems: [
		{
			xtype: 'toolbar',
			dock: 'bottom',
			layout: {
				type: 'vbox',
				align: 'right'
			},
			items: [
				{
					xtype: 'button',
					text: 'Fechar',
					itemId: 'btnFecharHistorico',
					iconCls: 'fechar'
				}
			]
		}
	]	
});