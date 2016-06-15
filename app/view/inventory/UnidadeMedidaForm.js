Ext.define('Packt.view.inventory.UnidadeMedidaForm', {
	extend: 'Ext.window.Window',
	alias: 'widget.unidademedidaform',

	//frame: true,
	modal: true,
	title: 'Gerenciar Unidades de Medida',
	height: '60%',
	width: '45%',
	autoShow: true,
	requires: [
		'Packt.store.inventory.UnidadesMedida'
	],

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	items: [		
		{
			xtype: 'form',			
			bodyPadding: 10,
			defaults: {
				xtype: 'textfield',
				labelWidth: 70				
			},
			items: [
				{
					xtype: 'hiddenfield',
					fieldLabel: 'Label',
					name: 'id'
				},
				{
					fieldLabel: 'Nome',
					name: 'name'					
				}
			],
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'bottom',
					layout: {
						pack: 'start',
						type: 'hbox'
					},
					items: [
						{
							xtype: 'button',
							text: 'Adicionar',
							itemId: 'salvar',
							iconCls: 'add',
							disabled: true
						},
						{
							xtype: 'tbseparator'
						},
						{
							xtype: 'button',
							text: 'Editar',
							itemId: 'editar',
							iconCls: 'edit',
							disabled: true
						},
						{
							xtype: 'tbseparator'
						},
						{
							xtype: 'button',
							text: 'Limpar',
							itemId: 'clear',
							iconCls: 'limpar',
							disabled: true
						},
						{
							xtype: 'tbseparator'
						},						
						{
							xtype: 'button',
							text: 'Cancelar',
							itemId: 'cancelar',
							iconCls: 'cancel'
						}
					]
				}
			]
		},
		{
			xtype: 'grid',
			store: 'inventory.UnidadesMedida',
			columnLines: true,
			title: 'Unidades de Medida cadastradas',
			columns: [
				{
					xtype: 'rownumberer'
				},
				{
					width: '100%',
					dataIndex: 'name',
					text: 'Unidade de Medida'
				}
			],
			forceFit: true,
			dockedItems: [
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					store: 'inventory.UnidadesMedida',
					displayInfo: true
				}
			]
		}
	]
});