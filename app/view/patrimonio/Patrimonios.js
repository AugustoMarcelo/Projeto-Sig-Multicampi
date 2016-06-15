Ext.define('Packt.view.patrimonio.Patrimonios', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.patrimonios',

	frame: true,

	requires: [
		'Packt.view.patrimonio.PatrimoniosList'
	],

	layout: {
		type: 'fit'
	},

	items: [
		{
			xtype: 'patrimonioslist'
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
					iconCls: 'add',
					itemId: 'addPatrimonio'
				},
				{
					xtype: 'tbseparator'
				},
				{
					xtype: 'button',
					text: 'Editar',
					iconCls: 'edit',
					itemId: 'editPatrimonio',
					disabled: true
				},
				{
					xtype: 'tbseparator'
				},
				{
					xtype: 'button',
					text: 'Patrimônio|Histórico',
					iconCls: 'timeline',
					itemId: 'verHistorico',
					disabled: true
				},				
				{
					xtype: 'tbseparator'
				},
				{
					xtype: 'button',
					text: 'Exportar para PDF',
					iconCls: 'pdf',
					itemId: 'exportarPdf'
				},
				{
					xtype: 'tbseparator'
				},
				{
					xtype: 'button',
					text: 'Excluir',
					iconCls: 'delete',
					itemId: 'delPatrimonio',
					disabled: true
				}
			]
		}
	]
});