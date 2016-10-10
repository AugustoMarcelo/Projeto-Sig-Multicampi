Ext.define('Packt.controller.protocolo.Protocolos', {
	extend: 'Ext.app.Controller',
	

	views: [
		'protocolo.Protocolos',
		'protocolo.ProtocolosList',
		'protocolo.FormEmprestimo',
		'protocolo.FormDevolucao'
	],

	stores: [
		'protocolo.Protocolos'		
	],

	refs: [
		{
			ref: 'protocolosList',
			selector: 'protocoloslist'
		}
	],

	init: function(application) {		
		this.control({			
			"protocoloslist": {
				render: this.onRender
			},
			"protocolos button#emprestimo": {
				click: this.onButtonClickEmprestimo
			},
			"protocolos button#devolucao": {
				click: this.onButtonClickDevolucao
			},
			"formemprestimo button#cancelar": {
				click: this.onButtonClickCancelar
			},
			"formdevolucao button#cancelar": {
				click: this.onButtonClickCancelar
			},
			"formemprestimo button#confirmar": {
				click: this.onButtonClickConfirmarEmprestimo
			},
			"formdevolucao button#confirmar": {
				click: this.onButtonClickConfirmarDevolucao
			}			
		});
	},

	onRender: function(component, options) {
		component.getStore().load();
	},

	onButtonClickEmprestimo: function(button, e, options) {
		var win = Ext.create('Packt.view.protocolo.FormEmprestimo');        
	},

	onButtonClickDevolucao: function(button, e, options) {
		var win = Ext.create('Packt.view.protocolo.FormDevolucao');		
	},

	onButtonClickCancelar: function(button, e, options) {
		button.up('window').close();
	},

	onButtonClickConfirmarEmprestimo: function(button, e, options) {
		var form = button.up('window').down('form');		
		var store = this.getProtocolosList().getStore();
		if(form.getForm().isValid()) {
			form.getForm().submit({
				clientValidation: true,
				url: 'php/protocolo/saveEmprestimo.php',
				
				success: function(form, action) {
					var result = action.result;
					if(result.success) {
						Packt.util.Alert.msg('Sucesso!', 'Empréstimo realizado com sucesso.');
						store.load();
						button.up('window').close();
					} else {
						Packt.util.Alert.msg(result.msg);
					}
				},

				failure: function(form, action) {
					switch(action.failureType) {
						case Ext.form.action.Action.CLIENT_INVALID:
							Ext.Msg.alert('Erro', 'O formulário pode ter sido preenchido com valores inválidos');
							break;
						case Ext.form.action.Action.CONNECT_FAILURE:
							Ext.Msg.alert('Erro', 'Falha na conexão com o servidor');
							break;
						case Ext.form.action.Action.SERVER_INVALID:
							Ext.Msg.alert('Erro', action.result.msg);
					}
				}
			});
		}		
	},

	onButtonClickConfirmarDevolucao: function(button, e, options) {
		var form = button.up('window').down('form');
		var store = this.getProtocolosList().getStore();
		if(form.getForm().isValid()) {
			form.getForm().submit({
				clientValidation: true,
				url: 'php/protocolo/saveDevolucao.php',
				
				success: function(form, action) {
					var result = action.result;
					if(result.success) {
						Packt.util.Alert.msg('Sucesso!', 'Devolução realizada com sucesso.');
						store.load();
						button.up('window').close();
					} else {
						Packt.util.Alert.msg(result.msg);
					}
				},

				failure: function(form, action) {
					switch(action.failureType) {
						case Ext.form.action.Action.CLIENT_INVALID:
							Ext.Msg.alert('Erro', 'O formulário pode ter sido preenchido com valores inválidos.');
							break;
						case Ext.form.action.Action.CONNECT_FAILURE:
							Ext.Msg.alert('Erro', 'Falha na conexão com o servidor');
							break;
						case Ext.form.action.Action.SERVER_INVALID:
							Ext.Msg.alert('Erro', action.result.msg);
					}
				}
			});
		}
	}

});