Ext.define('Packt.view.inventory.log.Logs', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.logs',
	frame: true,
	requires: [
		'Packt.view.inventory.log.ProductsLogList' 
	],
	layout: {
		type: 'fit' 
	},
 	items: [
 		{
 			xtype: 'productsloglist' 
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
					text: 'Deletar histórico',
					itemId: 'deleteLogs',
					iconCls: 'apagar',
					hidden: true
				},
				{
					xtype: 'tbfill'
				}
			]
		}
	]
});