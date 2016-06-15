Ext.define('Packt.view.unidade.Unidades', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.unidades',

	frame: true,

	requires: [
		'Packt.view.unidade.UnidadesList'
	],

	layout: {
		type: 'fit'
	},

	items: [
		{
			xtype: 'unidadeslist'
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
					itemId: 'addUnidade',
					iconCls: 'add'
				},
				{
					xtype: 'tbseparator'
				},
				{
					xtype: 'button',
					text: 'Editar',
					itemId: 'editarUnidade',
					iconCls: 'edit',
					disabled: true
				},
				{
					xtype: 'tbseparator'
				},
				{
					xtype: 'button',
					text: 'Excluir',
					itemId: 'excluirUnidade',
					iconCls: 'delete',
					disabled: true
				}				
			]
		}
	]
});