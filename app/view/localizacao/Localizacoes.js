Ext.define('Packt.view.localizacao.Localizacoes', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.localizacoes',

	frame: true,

	requires: [
		'Packt.view.localizacao.LocalizacoesList'
	],

	layout: {
		type: 'fit'
	},

	items: [
		{
			xtype: 'localizacoeslist',
			emptyText: 'Nenhuma localização cadastrada'
		}
	],

	dockedItems: [
		{
			xtype: 'toolbar',
			dock: 'top',
			items: [
				{
					xtype: 'button',
					text: 'Adicionar',
					itemId: 'addLocal',
					iconCls: 'add'
				},
				{
					xtype: 'tbseparator'
				},
				{
					xtype: 'button',
					text: 'Editar',
					itemId: 'editLocal',
					iconCls: 'edit',
					disabled: true
				},
				{
					xtype: 'tbseparator'
				},
				{
					xtype: 'button',
					text: translations.buttonDelete,
					itemId: 'delLocal',
					iconCls: 'delete',
					disabled: true
				}
			]
		}
	]
});