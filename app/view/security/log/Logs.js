Ext.define('Packt.view.security.log.Logs', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.userlogs',
	frame: true,
	requires: [
		'Packt.view.security.log.UsersLogList' 
	],
	layout: {
		type: 'fit' 
	},
 	items: [
 		{
 			xtype: 'usersloglist' 
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
					iconCls: 'apagar'
				}
			]
		}
	]
});