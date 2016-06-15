Ext.define('Packt.view.inventory.MaterialForm', {
	extend: 'Ext.window.Window',
	alias: 'widget.materialform',

	//frame: true,
	modal: true,
	height: '60%',
	width: '45%',
	title: 'Gerenciar Tipos de Materiais',
	requires: [
		'Packt.store.inventory.Materiais'
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
			store: 'inventory.Materiais',
			columnLines: true,
			title: 'Materiais Cadastrados',
			columns: [
				{
					xtype: 'rownumberer'
				},
				{
					width: '100%',
					dataIndex: 'name',
					text: 'Material'
				}
			],
			forceFit: true,
			dockedItems: [
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					store: 'inventory.Materiais',
					displayInfo: true
				}
			]
		}
	]
});