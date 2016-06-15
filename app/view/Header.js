Ext.define('Packt.view.Header', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.appheader',
	height: 30,
	ui: 'footer',
	style: 'border-bottom: 4px solid #4c72a4;',
	items: [
		{
			xtype: 'label',
			html: '<div id="titleHeader"><span style="font-size:16px;">SIG - SISTEMA INTEGRADO DE GESTÃO - UFRN</span></div>'
		},
		{
			xtype: 'tbfill'
		},
		{
			xtype: 'text',
			itemId: 'user',
			text: '', //AQUI É ONDE SETAREI O NOME DO USUÁRIO AUTENTICADO DE ACORCO COM A FUNÇÃO initComponent
			cls: 'userNameText'
		},
		{
			xtype: 'tbseparator'
		},
		{
			xtype: 'splitbutton',
			iconCls: 'splitbuttonicon2',
			text: 'Opções',
			menu: {
				items: [
					{
						xtype: 'menuitem',
						text: 'Alterar senha',
						iconCls: 'edit',
						itemId: 'alterarSenha'
					},					
					{
						xtype: 'menuitem',
						text: translations.logout,
						itemId: 'logout',
						iconCls: 'logout'
					}
				]
			}
		}
		// },
		// {
		// 	xtype: 'button',
		// 	text: 'Alterar senha',
		// 	iconCls: 'edit',
		// 	itemId: 'alterarSenha'
		// },
		// {
		// 	xtype: 'tbseparator'
		// },
		// {
		// 	xtype: 'translation'
		// },
		// {
		// 	xtype: 'tbseparator'
		// },
		// {
		// 	xtype: 'button',
		// 	text: translations.logout,
		// 	itemId: 'logout',
		// 	iconCls: 'logout'
		// }
	],
	initComponent: function () {
        var me = this;
        Ext.Ajax.request({
            method: 'POST',
            url: 'php/security/importUserSession.php',
            success: function (conn, response, options, e0pts) {
                var result = Packt.util.Util.decodeJSON(conn.responseText);
                var componente = Ext.ComponentQuery.query('#user')[0];
                componente.setText(result.nome.toUpperCase());
            }
        });
        me.callParent(arguments);
    }
});