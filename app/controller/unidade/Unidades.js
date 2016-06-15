Ext.define('Packt.controller.unidade.Unidades', {
	extend: 'Ext.app.Controller',

	requires: [

	],

	views: [
		'unidade.Unidades',
		'unidade.UnidadesList',
		'unidade.FormUnidade'
	],

	stores: [
		'unidade.Unidades'
	],

	refs: [
		{
			ref: 'formUnidade',
			selector: 'formunidade',
			autoCreate: true,
			xtype: 'formunidade'
		},
		{
			ref: 'unidadesList',
			selector: 'unidadeslist'
		},
		{
			ref: 'unidades',
			selector: 'unidades'
		}
	],


	init: function(application) {		
		this.control({
			"unidadeslist": {
				render: this.onRender
			},
			"unidadeslist": {
				itemclick: this.onHabilitarBotoes
			},
			"unidades button#addUnidade": {
				click: this.onAddUnidade
			},
			"unidades button#editarUnidade": {
				click: this.onEditarUnidade
			},
			"formunidade button#salvar": {
				click: this.onSalvarUnidade
			},
			"formunidade button#cancelar": {
				click: this.onCancelar
			}
		});
	},

	onRender: function(component, options) {
		component.getStore().load();
	},

	//Função para habilitar os botões de editar e excluir quando o usuário selecionar um registro
	onHabilitarBotoes: function(grid, record, item, index, e, e0pts) {
		var grid = this.getUnidades();
		var btnDel = grid.down('#excluirUnidade');
		var btnEdit = grid.down('#editarUnidade');
		if(btnDel.isDisabled()) {
			btnDel.setDisabled(false);
		}
		if(btnEdit.isDisabled()) {
			btnEdit.setDisabled(false);
		}
	},

	onCancelar: function(button, e, options) {
		var win = this.getFormUnidade();
		win.close();
	},

	onAddUnidade: function(button, e, options) {
		var win = Ext.create('Packt.view.unidade.FormUnidade');		
	},

	onEditarUnidade: function(button, e, options) {
		var grid = this.getUnidadesList();
		record = grid.getSelectionModel().getSelection();

		//Se algum registro for selecionado
		if(record[0]) {
			var editWindow = this.getFormUnidade();
			editWindow.down('form').loadRecord(record[0]);
		}
	},

	onSalvarUnidade: function(button, e, options) {
		var win = this.getFormUnidade();
		var form = this.getFormUnidade().down('form');
		var store = this.getUnidadesList().getStore();
		if(form.getForm().isValid()) {
			form.getForm().submit({
				clienValidation: true,
				url: 'php/unidade/saveUnidade.php',
				success: function(form, action) {
					var result = action.result;
					if(result.success) {
						store.load();
						Packt.util.Alert.msg('Sucesso!', 'Unidade cadastrada com successo.');
						win.close();
					}
				},
				failure: function(form, action) {
					switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Ext.Msg.alert('Erro', 'Form fields may not be submitted with invalid values');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.alert('Erro', 'Falha na conexão com o servidor.');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Ext.Msg.alert('Erro', action.result.msg);
                    }
				}
			});
		}
	}
});