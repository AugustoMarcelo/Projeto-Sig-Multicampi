Ext.define('Packt.controller.Login', {
	extend: 'Ext.app.Controller',

	requires: [
		'Packt.util.MD5',
		'Packt.util.Util',
		'Packt.util.SessionMonitor',
		//Packt.util.Alert
	],

	views: [
		'Login',
		'authentication.CapsLockTooltip',
		'Header',
		'security.ChangePasswordView'
	],

	refs: [
		{
			ref: 'capslockTooltip',
			selector: 'capslocktooltip'
		}
	],

	init: function (application) {
		this.control({
			"login form button#submit": {
				click: this.onButtonClickSubmit
			},
			"login form button#cancel": {
				click: this.onButtonClickCancel
			},
			"login form textfield": {
				specialkey: this.onTextfieldSpecialKey
			},
			"login form textfield[name=password]": {
				keypress: this.onTextfieldKeyPress
			},
			"appheader menuitem#logout": {
				click: this.onButtonClickLogout
			},
			"appheader menuitem#alterarSenha": {
				click: this.alterarSenhaView
			},
			"changepasswordview button#save": {
				click: this.salvarNovaSenha
			},
			"changepasswordview button#cancel": {
				click: this.cancelar
			}

		});
	},

	onButtonClickSubmit: function (button, e, options) {
		var formPanel = button.up('form'),
			login = button.up('login'),
			user = formPanel.down('textfield[name=user]').getValue(),
			pass = formPanel.down('textfield[name=password]').getValue();

		if (formPanel.getForm().isValid()) {
			pass = Packt.util.MD5.encode(pass);
			Ext.get(login.getEl()).mask("Autenticando... Por favor, espere...", 'loading');
			Ext.Ajax.request({
				url: 'php/login.php',
				params: {
					user: user,
					password: pass
				},

				failure: function (conn, response, options, eOpts) {
					Ext.get(login.getEl()).unmask();
					Packt.util.Util.decodeJSON(conn.responseText);
				},

				success: function (conn, response, options, eOpts) {
					Ext.get(login.getEl()).unmask();
					var result = Packt.util.Util.decodeJSON(conn.responseText);

					if (result.success) {
						login.close();
						Ext.create('Packt.view.MyViewport');
						Packt.util.SessionMonitor.start();
						Ext.Ajax.request({
							method: 'POST',
							url: 'php/security/importUserSession.php',
							success: function (conn, response, options, e0pts) {
								var usuario = Packt.util.Util.decodeJSON(conn.responseText);
								Packt.util.Alert.msg(translations.msgWelcome, usuario.nome);
							}
						});


					} else {
						//Packt.ux.Alert.show('Operação inválida', result.msg, 'error')
						Packt.util.Alert.msg("Operação inválida", result.msg);
						//Packt.util.Util.showErrorMsg("Para que você possa acessar, certifique-se de que não há outras sessões abertas neste computador.");
					}
				}
			});
		}
	},

	onButtonClickCancel: function (button, e, options) {
		button.up('form').getForm().reset();
	},

	onTextfieldSpecialKey: function (field, e, options) {
		if (e.getKey() == e.ENTER) {
			var submitBtn = field.up('form').down('button#submit');
			submitBtn.fireEvent('click', submitBtn, e, options);
		}
	},

	onTextfieldKeyPress: function (field, e, options) {
		var charCode = e.getCharCode();

		if ((e.shiftKey && charCode >= 97 && charCode <= 122) || (!e.shiftKey && charCode >= 65 && charCode <= 90)) {
			if (this.getCapslockTooltip() === undefined) {
				Ext.widget('capslocktooltip');
			}
			this.getCapslockTooltip().show();

		} else {
			if (this.getCapslockTooltip() !== undefined) {
				this.getCapslockTooltip().hide();
			}
		}
	},

	onButtonClickLogout: function (button, e, options) {
		Ext.Ajax.request({
			url: 'php/logout.php',
			success: function (conn, response, options, eOpts) {
				var result = Packt.util.Util.decodeJSON(conn.responseText);
				if (result.success) {
					button.up('mainviewport').destroy();
					window.location.reload();
				} else {
					Packt.util.Util.showErrorMsg(conn.responseText);
				}
			},
			failure: function (conn, response, options, eOpts) {
				Packt.util.Util.showErrorMsg(conn.responseText);
			}
		});
	},

	alterarSenhaView: function (button, e, options) {
		Ext.create('Packt.view.security.ChangePasswordView');
	},

	salvarNovaSenha: function (button, e, options) {
		var form = button.up('window').down('form');
		var novaSenha = form.down('textfield[name=novasenha]').getValue();
		Ext.Msg.show({
			title: 'Atenção',
			msg: 'Para que os dados sejam completamente homologados, a sua sessão será reiniciada após alterar a nova senha. Deseja continuar?',
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.WARNING,
			fn: function (buttonId) {
				if (buttonId == 'yes') {
					if (form.getForm().isValid()) {
						novaSenha = Packt.util.MD5.encode(novaSenha);
						Ext.Ajax.request({
							url: 'php/security/alterarSenha.php',
							params: {
								novasenha: novaSenha
							},

							failure: function (conn, response, options, eOpts) {
								Packt.util.Util.decodeJSON(conn.responseText)
							},

							success: function (conn, response, options, eOpts) {
								var result = Packt.util.Util.decodeJSON(conn.responseText);
								if (result.success) {
									Packt.util.Alert.msg('Senha alterada com sucesso', '');
									button.up('window').close();
									window.location.reload();
								} else {
									Packt.util.Util.showErrorMsg(result.msg);
								}
							}
						});
					} else {
						Ext.Msg.show({
							title: 'Erro',
							msg: 'O campo está em branco!',
							buttons: Ext.Msg.OK
						});
					}
				}
			}
		});
	},

	cancelar: function (button, e, options) {
		button.up('window').close();
	}
});