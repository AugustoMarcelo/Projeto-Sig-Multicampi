Ext.define('Packt.view.security.Users', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.users',
	frame: true,
	requires: [
		'Packt.view.security.UsersList' 
	],
	layout: {
		type: 'fit' 
	},
 	items: [
 		{
 			xtype: 'userslist' 
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
					xtype: 'tbseparator'
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
					xtype: 'button',
					text: translations.buttonDelete,
					itemId: 'delete',
					iconCls: 'delete',
					disabled: true
				}
			]
		}
	]
});