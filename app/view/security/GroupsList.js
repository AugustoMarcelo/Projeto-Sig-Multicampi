Ext.define('Packt.view.security.GroupsList', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.groupslist',

	title: translations.groupslistTitle,
	frame: true,

	store: 'security.Groups',

	columns: [
		{
			xtype: 'gridcolumn',
			dataIndex: 'name',
			flex: 1,
			text: translations.groupslistTitleColumn
		}
	],
	dockedItems: [
		{
			xtype: 'toolbar',
			dock: 'top',
			items: [
				{
					xtype: 'button',
					itemId: 'add',
					iconCls: 'add',
					text: translations.buttonAdd
				},
				{
					xtype: 'tbseparator'
				},
				{
					xtype: 'button',
					itemId: 'delete',
					iconCls: 'delete',
					text: translations.buttonDelete
				}
			]
		}
	]
});