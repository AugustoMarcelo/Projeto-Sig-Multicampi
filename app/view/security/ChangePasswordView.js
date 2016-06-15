Ext.define('Packt.view.security.ChangePasswordView', {
	extend: 'Ext.window.Window',
	alias: 'widget.changepasswordview',
	modal: true,
	autoShow: true,

	height: 100,
	width: 300,

	//layout: 'fit',

	title: 'Alterar Senha',
	items: [
		{
			xtype: 'form',
			bodyPadding: 10,			
			defaults: {
				anchor: '100%',	
				xtype: 'textfield',			
				allowBlank: false,
				labelWidth: 90
			},
			items: [
				{				
					inputType: 'password',	
					fieldLabel: 'Nova Senha',
					name: 'novasenha',
					itemId: 'novaSenha',
					minLength: 3
				}
			]
		}
	],
	dockedItems: [
		{
			xtype: 'toolbar',
			flex: 1,
			dock: 'bottom',
			ui: 'footer',
			layout: {
				type: 'hbox',
				pack: 'end'
			},
			items: [
        		{
            		xtype: 'button',
            		text: translations.cancel,
            		itemId: 'cancel',
            		iconCls: 'cancel'
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