Ext.define('Packt.view.inventory.Products', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.products',
	frame: true,
	requires: [
		'Packt.view.inventory.ProductsList'
	],
	layout: {
		type: 'fit'
		/*type: 'border',
		padding: 5*/
	},
	items: [
		{
			xtype: 'productslist'/*,
 			region: 'center'*/
		}
	],
	dockedItems: [
		{
			xtype: 'toolbar',
			flex: 1,
			dock: 'top',
			items: [
				{
					xtype: 'button',
					text: translations.buttonAdd,
					itemId: 'add',
					iconCls: 'add'
				},
				{
					xtype: 'tbseparator',
					itemId: 'tbseparator1'
				},
				{
					xtype: 'button',
					text: translations.buttonEdit,
					itemId: 'edit',
					iconCls: 'edit',
					disabled: true
				},
				{
					xtype: 'tbseparator'
				},				
				{
					xtype: 'splitbutton',
					iconCls: 'splitbuttonicon',
					text: 'Outros',
					menu: {
						items: [
							{
								xtype: 'menuitem',
								text: 'Inserir tipo de material',
								itemId: 'material',
								iconCls: 'tipoMaterial'
							},
							{
								xtype: 'menuitem',
								text: 'Inserir Unidades de Medidas',
								itemId: 'unidadeMedida',
								iconCls: 'medidas'
							}
						]
					}
				},				
				{
					xtype: 'tbseparator'
				},
				{
					xtype: 'button',
					text: 'Exportar para PDF',
					itemId: 'exportar_pdf',
					iconCls: 'pdf'
				},
				{
					xtype: 'tbseparator'
				},
				{
					xtype: 'button',
					text: translations.buttonDelete,
					itemId: 'delete',
					iconCls: 'delete',
					disabled: true
				},
			]
		}
	]
});