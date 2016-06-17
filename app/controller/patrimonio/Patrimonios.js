Ext.define('Packt.controller.patrimonio.Patrimonios', {
	extend: 'Ext.app.Controller',

	requires: [
		'Ext.ux.grid.column.ActionButtonColumn',
		'Packt.util.Util',
		'Packt.util.Alert'
	],

	views: [
		'patrimonio.Patrimonios',
		'patrimonio.PatrimoniosList',
		'patrimonio.FormPatrimonio',
		'patrimonio.WindowPatrimonioHistorico'
	],

	stores: [
		'patrimonio.Patrimonios',
	],

	refs: [
		{
			ref: 'patrimonios',
			selector: 'patrimonios'
		},
		{
			ref: 'patrimoniosList',
			selector: 'patrimonioslist'
		},
		{
			ref: 'patrimonioImagem',
			selector: 'formpatrimonio image'
		},
		{
			ref: 'formPatrimonio',
			selector: 'formpatrimonio',
			autoCreate: true,
			xtype: 'formpatrimonio'
		}
	],

	init: function(application) {		
		this.control({
			"patrimonioslist": {
				render: this.onRender,
				selectionchange: this.onHabilitarBotoes
			},								
			"patrimonios button#addPatrimonio": {
				click: this.onButtonAddPatrimonio
			},
			"patrimonios button#editPatrimonio": {
				click: this.onButtonEditarPatrimonio
			},
			"patrimonios button#delPatrimonio": {
				click: this.onButtonDeletarPatrimonio
			},
			"patrimonios button#verHistorico": {
				click: this.onButtonVerHistorico
			},
			"formpatrimonio button#salvar": {
				click: this.onButtonSalvarPatrimonio
			},
			"formpatrimonio button#cancelar": {
				click: this.onButtonFecharWindow
			},
			"formpatrimonio filefield": {
				change: this.onFileFieldChange
			},
			"windowpatrimoniohistorico button#btnFecharHistorico": {
				click: this.onButtonFecharWindow
			}
		});
		
		if(!Ext.getStore('unidades')) {
            Ext.create('Packt.store.unidade.Unidades');
        }
	},

	onRender: function(component, options) {
		component.getStore().load();
	},

	//Função para habilitar os botões de editar e excluir quando o usuário selecionar um registro	
	onHabilitarBotoes: function(model, selected, e0pts) {		
		var grid = this.getPatrimonios();					
		var btnDel = grid.down('#delPatrimonio');
		var btnEdit = grid.down('#editPatrimonio');
		var btnHist = grid.down('#verHistorico');
		if(selected[0]) {
			if(btnDel.isDisabled()) {
				btnDel.setDisabled(false);
			}
			if(btnEdit.isDisabled()) {
				btnEdit.setDisabled(false);
			}
			if(btnHist.isDisabled()) {
				btnHist.setDisabled(false);
			}
		} else {
			if(!btnDel.isDisabled()) {
				btnDel.setDisabled(true);
			}
			if(!btnEdit.isDisabled()) {
				btnEdit.setDisabled(true);
			}
			if(!btnHist.isDisabled()) {
				btnHist.setDisabled(true);
			}
		}
	},

	onButtonAddPatrimonio: function(button, e, options) {
		var win = Ext.create('Packt.view.patrimonio.FormPatrimonio');		
	},

	onButtonFecharWindow: function(button, e, options) {
		var win = button.up('window');
		win.close();
	},

	onButtonSalvarPatrimonio: function(button, e, options) {		
		var win = button.up('window'),
			form = win.down('form'),
			//store = this.getPatrimoniosList().getStore();
			store = this.getPatrimonioPatrimoniosStore();					
		if(form.getForm().isValid()) {
			form.getForm().submit({
				clientValidation: true,
				url: 'php/patrimonio/savePatrimonio.php',
				success: function(form, action) {
					var result = action.result;
					if(result.success) {
						Packt.util.Alert.msg('Sucesso!', 'Patrimônio salvo.');										
						store.load();
						win.close();
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

	onButtonDeletarPatrimonio: function(button, e, options) {
		var grid = this.getPatrimoniosList();
		var record = grid.getSelectionModel().getSelection();
		var store = grid.getStore();

		Ext.Msg.show({
			title: 'Excluir patrimônio',
			msg: 'Deseja mesmo excluir o patrimônio selecionando?',
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			fn: function(buttonId) {
				if(buttonId == 'yes') {
					Ext.Ajax.request({
						url: 'php/patrimonio/deletarPatrimonio.php',
						params: {
							id: record[0].get('id'),
							imagem: record[0].get('imagem')
						},
						success: function(conn, response, options, e0pts) {
							
							var result = Packt.util.Util.decodeJSON(conn.responseText);

							if(result.success) {
								Packt.util.Alert.msg('Sucesso', 'Patrimônio excluído');
								store.load();								
							} else {
								Packt.util.Util.showErrorMsg(conn.responseText);
							}
						},
						failure: function(conn, response, options, e0pts) {
							Packt.util.Util.showErrorMsg(conn.responseText);
						}
					});
				}
			}
		});
	},

	onFileFieldChange: function(filefield, value, options) {
		var file = filefield.fileInputEl.dom.files[0];
		var imagem = this.getPatrimonioImagem();

		if(typeof FileReader !== "undefined" && (/image/i).test(file.type)) {
			var reader = new FileReader();
			reader.onload = function(e) {
				imagem.setSrc(e.target.result);
			};
			reader.readAsDataURL(file);
		} else if(!(/image/i).test(file.type)) {
			Ext.Msg.alert("Aviso", "Você só pode inserir arquivos de imagens!");
			filefield.reset();
		}
	},

	onButtonEditarPatrimonio: function(button, e, options) {
		var grid = button.up('panel').down('grid');
		record = grid.getSelectionModel().getSelection();		
		if(record[0]) {
			var editWindow = this.getFormPatrimonio();
			//var editWindow = this.getPatrimonioFormPatrimonioView();
			editWindow.down('form').loadRecord(record[0]);		
			if(record[0].get('imagem')) {
				var img = editWindow.down('image');
				img.setSrc('resources/patrimonioImages/'+record[0].get('imagem'));
			}
			editWindow.setTitle(record[0].get('denominacao'));
			editWindow.show();
		}
	},

	onButtonVerHistorico: function(button, e, options) {
		var janela = Ext.create('Packt.view.patrimonio.WindowPatrimonioHistorico');		
	}
});