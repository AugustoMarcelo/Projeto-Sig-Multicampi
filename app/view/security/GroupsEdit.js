Ext.define('Packt.view.security.GroupsEdit', {
	extend: 'Ext.form.Panel',
	alias: 'widget.groupsedit',

	requires: [
		'Packt.util.Util',
		'Packt.view.security.GroupPermissions',
		'Packt.view.security.UsersList'
	],

	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	bodyPadding: 10,
	title: translations.panelTitleGroupEdit,

	items: [
		{
			xtype: 'fieldset',
			height: 100,
			title: translations.fieldsetTitleGroup,
			defaults: {
				afterLabelTextTpl: Packt.util.Util.required,
				anchor: '100%',
				xtype: 'textfield',
				allowBlank: false,
				msgTarget: 'under'
			},
			items: [
				{
					xtype: 'hiddenfield',
					fieldLabel: 'Label',
					name: 'id'
				},
				{
					fieldLabel: translations.fieldlabelGroupName,
					name: 'name',
					maxLength: 45,
					minLength: 3
				}
			]
		},
		{
			xtype: 'grouppermissions',
			flex: 2
		},
		{
			xtype: 'userslist',
			emptyText: translations.gridEmptyText,
			title: translations.userlistGridTitle,
			hideGroup: true,
			flex: 1
		}
	],
	dockedItems: [
		{
			xtype: 'toolbar',
			flex: 1,
			dock: 'bottom',
			layout: {
				pack: 'end',
				type: 'hbox'
			},
			items: [
				{
					xtype: 'button',
					text: translations.cancel,
					itemId: 'cancel',
					iconCls: 'cancel'
				},
				{
					xtype: 'tbseparator'
				},
				{
					xtype: 'button',
					text: translations.save,
					itemId: 'save',
					iconCls: 'save'
				}
			]
		}
	]
});