Ext.define('Packt.controller.localizacao.Localizacoes', {
	extend: 'Ext.app.Controller',

	requires: [

	],

	views: [
		'localizacao.Localizacoes',
		'localizacao.LocalizacoesList',
		'localizacao.FormLocalizacao'
	],

	stores: [
		'localizacao.Localizacoes'
	],

	refs: [
		{
			ref: 'localizacoesList',
			selector: 'localizacoeslist'
		}
	],

	init: function(application) {
		this.control({
			'localizacoeslist': {
				render: this.onRender
			},
			'localizacoes button#addLocal': {
				click: this.onAddLocal
			},
			'formlocalizacao button#cancelar': {
				click: this.onFecharForm
			},
			'formlocalizacao button#salvar': {
				click: this.onSalvarLocal
			}
		});
	},

	onRender: function(component, options) {
		component.getStore().load();
	},
	
	onAddLocal: function(button, e, options) {
		var janela = Ext.create('Packt.view.localizacao.FormLocalizacao');	
	},
	
	onFecharForm: function(button, e, options) {
		var janela = button.up('window');
		janela.close();
	},
	
	onSalvarLocal: function(button, e, options) {
		var form = button.up('window').down('form');
		//var store = this.getLocalizacaoLocalizacoesStore(); PROBLEMAS COM INSTÂNCIAS DIFERENTES
		var grid = this.getLocalizacoesList();
		if(form.getForm().isValid()) {
			form.getForm().submit({
				clientValidation: true,
				waitMsg: 'Salvando..',
				url: 'php/localizacao/saveLocalizacao.php',
				success: function(form, action) {
					var result = action.result;
					if(result.success) {
						Packt.util.Alert.msg('Sucesso!', 'Local cadastrado com sucesso.');												
						button.up('window').close();						
						grid.getStore().load();
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
	}
});