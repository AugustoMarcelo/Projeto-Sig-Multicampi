Ext.define('Packt.controller.inventory.Entradas_Saidas', {
	extend: 'Ext.app.Controller',

	requires: [
		'Packt.util.Util',
        'Packt.util.Alert',
        'Packt.ux.Alert'
	],

	views: [
		'inventory.entrada_saida.FormEntradaSaida'
	],

	stores: [
		'Packt.store.inventory.Entradas_Saidas'		

	],

	refs: [
		{			
			ref: 'formEntradaSaida',
			selector: 'formentradasaida'
		},
		{
			ref: 'productsList',
			selector: 'productslist',
			autoCreate: true,
			xtype: 'productslist'
		}
	],

	init: function(application) {
		this.control({
			"formentradasaida": {
				render: this.onRender
			},
			"formentradasaida form button#entrada": {
				click: this.onRegistrarOperacao
			},
			"formentradasaida form button#saida": {
				click: this.onRegistrarOperacao
			},
			"formentradasaida grid button#exportar_pdf": {
				click: this.onButtonClickPDF
			}						
		});
	},

	onRender: function(component, options) {				
		component.items.items[0].getStore().load(); 		
	},

	onButtonClickPDF: function(button, e, options) {
		var mainPanel = Ext.ComponentQuery.query('mainpanel')[0];
		var combo = Ext.ComponentQuery.query('#comboEntradaSaida')[0];
		
		newTab = mainPanel.add({
			xtype: 'panel',
			closable: true,
			iconCls: 'pdf',
			title: 'PDF das Entradas e Saídas',
			layout: 'fit',
			html: 'Carregando PDF...',
			items: [{
				xtype: 'uxiframe',
				src: 'php/pdf/exportarControleEstoquePdf.php?operacao='+combo.getDisplayValue()
			}]
		});

		mainPanel.setActiveTab(newTab);
	},

	onRegistrarOperacao: function(button, e, options) {
		var componente = this.getFormEntradaSaida();
		var store = componente.items.items[0].getStore(); //componente.items.items[0] é o primeiro item do componente, ou seja, meu grid
		var form = componente.form;
		var values = form.getValues();
		var dataOp = new Date();
		var operacao;
		var podeRealizar = true;
		//var storeDeProdutos = this.getProductsList().getStore();		
		var storeDeProdutos = Ext.data.StoreManager.lookup('inventory.Products');
		//var storeDeProdutos = Ext.create('Packt.store.inventory.Products');

		//Referência dos fieldsets para limpá-los após uma operação
		var fieldsetInfoProduto = Ext.ComponentQuery.query('#infoDoProduto');
		var imagemDoProduto = Ext.ComponentQuery.query('#imageProduto');
		
		//Laço para procurar a quantidade do produto digitado para saber se a quantidade digitada tem no estoque	
		//console.log(storeDeProdutos);	
		for(var i = 0; i < storeDeProdutos.getCount(); i++) {			
			if(values.produto == storeDeProdutos.data.items[i].data.codigo) {
				var nomeProduto = storeDeProdutos.data.items[i].data.nome;				
				var produtoId = storeDeProdutos.data.items[i].data.id;
				var qtdeProduto = storeDeProdutos.data.items[i].data.quantidade;												
			}			
		}

		if(form.isValid()) {//Condicionais para saber qual o tipo de operação será realizada				
			if(button.itemId == "entrada") {
				operacao = "Entrada";

			} else if (button.itemId == "saida") {
				operacao = "Saída";
				if(values.quantidade > qtdeProduto) {//Verificação do quantidade disponível do produto no estoque
					podeRealizar = false;
				}

			} else {			
				console.log("erro!");
			}
			

			Ext.Ajax.request({//Requisição para pegar o usuário logado no momento
				method: 'POST',
				scope: this,
				url: 'php/security/importUserSession.php',
				success: function(conn, response, options, e0pts) {
					var result = Packt.util.Util.decodeJSON(conn.responseText);					
					var registro = Ext.create('Packt.model.inventory.Entrada_Saida', {
						produto: nomeProduto,
						User_id: result.nome+'| '+result.matricula,
						quantidade: values.quantidade,
						destino: values.destino,
						dataOperacao: dataOp,
						observacoes: values.observacoes,
						operacao: operacao
					});							

					var errors = registro.validate();//Salvando na variável as validações dos campos para testar depois					

					if(podeRealizar == true && errors.isValid() == true) {							
						Ext.Ajax.request({
							method: 'POST',							
							url: 'php/inventory/entrada_saida/updateQuantidade.php',
							params: {
								quantidade: values.quantidade,
								id_produto: produtoId,
								operacao: button.itemId
							},

							failure: function(conn, response, options, e0pts) {
								Pakt.util.Util.decodeJSON(conn.responseText);
							},

							success: function(conn, response, options, e0pts) {
								var result = Packt.util.Util.decodeJSON(conn.responseText);

								if(result.success) {
									if(result.atualizacao) {					
										store.add(registro);
										store.sync();
										store.reload();
										Packt.util.Alert.msg('Sucesso!', 'Estoque atualizado');
										storeDeProdutos.sync();										
									} 

								} else {
									Packt.util.Util.showErrorMsg(result.msg);
								}
							}
						});
						
						form.reset();
						imagemDoProduto[0].setSrc(null);
						fieldsetInfoProduto[0].items.items[0].setText("Produto: ");
						fieldsetInfoProduto[0].items.items[2].setText("Código: ");
						fieldsetInfoProduto[0].items.items[4].setText("Quantidade no Estoque: ");
						fieldsetInfoProduto[0].items.items[6].setText("Quantidade Mínima: ");
						fieldsetInfoProduto[0].items.items[8].setText("Descrição: ");
						
					} else  if (podeRealizar == false){
						Packt.ux.Alert.show('Erro!', 'Seu estoque não possui essa quantidade', 'error');

					} else {						
						this.markInvalidFields(errors);
						//Packt.ux.Alert.show('Erro!', '<b>Campo: </b>'+errors.items[0].field +'<br />'+'<b>Erro: </b>'+errors.items[0].message, 'error');
					}
				}
			});
		}
		
	},

	markInvalidFields: function(validationErros) {
		var form = this.getFormEntradaSaida(),
			invalidCls = Ext.baseCSSPrefix + 'form-invalid',
			fieldSelector, errorString = '';

		validationErros.each(function (validation) {
			errorString += Ext.String.format('{0}<br/>', validation.message);

			fieldSelector = Ext.String.format('field[name={0}]', validation.field);

			form.down(fieldSelector).markInvalid(validation.message);
		});

	}
	
});