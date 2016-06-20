Ext.define('Packt.controller.ponto_eletronico.PontoEletronico', {
	extend: 'Ext.app.Controller',

	requires: [
		'Ext.form.field.Time'
	],

	views: [
		'ponto_eletronico.PontoEletronicoUsuario',
		'ponto_eletronico.PontoEletronicoAdmin',
		'ponto_eletronico.JustificaPontoForm'
	],

	stores: [
		'ponto_eletronico.PontoEletronico'
	],

	refs: [
		{
			ref: 'pontoEletronicoUsuario',
			selector: 'pontoeletronicousuario'
		}
	],

	init: function (application) {
		this.control({
			"pontoeletronicousuario": {
				render: this.onRenderContainer
			},
			"pontoeletronicoadminlist": {
				render: this.onRender
			},
			"pontoeletronicoadmin datefield[itemId=filtroData]": {
				change: this.filtrarDataEventChange,
				select: this.filtrarDataEventSelect,
				keypress: this.filtrarDataEventKeypress
			},
			"pontoeletronicoadmin button[itemId=exportar_pdf]": {
				click: this.onButtonClickPDF
			},
			"pontoeletronicoadmin checkbox[itemId=month_year_only]": {
				change: this.setDateFieldFormat
			},
			"pontoeletronicousuario grid button[itemId=exportar_pdf_usuario]": {
				click: this.onButtonClickPDF
			},
			"pontoeletronicousuario container[itemId=containerBotoes] button": {
				click: this.onRegistrarPonto
			},
			"pontoeletronicousuario button[itemId=justificarPonto]": {
				click: this.onJustificarPonto
			},
			"pontoeletronicousuario button[itemId=corrigirPonto]": {
				click: this.onCorrigirPonto
			}
		});
	},

	onCorrigirPonto: function (button, options) {
		Ext.Msg.show({
			title: 'Corrigir pontos',
			msg: 'Tem certeza de que deseja fazer isso? Esta ação só pode ser executada uma vez. Se for executada mais do que isso, os horários serão atualizados acarretando na perca de horas.',
			buttons: Ext.Msg.YESNOCANCEL,
			icon: Ext.Msg.QUESTION,
			fn: function (buttonId) {
				if (buttonId == 'yes') {
					Ext.Ajax.request({
						method: 'POST',
						url: 'php/ponto_eletronico/somaHorasUsuarios.php',
						success: function (conn, response, options, e0pts) {
							console.log("Executado com sucesso");
						}
					});
				}
			}
		});
	},

	onRenderContainer: function (thisComponent, e0pts) {
		var store = thisComponent.getComponent('grid_pontos').getStore();
		var bateuPonto = false;
		var horarios = [];
		var hora; //VARIÁVEL CRIADA PARA SABER SE JÁ SE PASSOU 1 HORA ENTRE A SAÍDA DO 1º EXPEDIENTE E A ENTRADA DO 2º
		Ext.Ajax.request({
			method: 'POST',
			url: 'php/dataHoje.php',
			success: function (conn, response, options, e0pts) {
				var result = Packt.util.Util.decodeJSON(conn.responseText);
				var hoje = result.dataHoje;
				store.on('load', function (st) {
					store.each(function (rec) {
						var dataPonto = Ext.Date.format(rec.get('dataPonto'), 'd/m/Y');						
						//console.log(Ext.Date.format(rec.get('dataPonto'), 'd') - 1);
						if (hoje == dataPonto) { //VERIFICA SE O USUÁRIO DEU REGISTROU O PRIMEIRO PONTO
							bateuPonto = true;							
							horarios[0] = rec.get('entrada01');
							horarios[1] = rec.get('saida01');
							horarios[2] = rec.get('entrada02');
							horarios[3] = rec.get('saida02');
							hora = horarios[1] != null ? new Date(horarios[1]) : null; //SE O USUÁRIO AINDA JÁ TIVER SAÍDO NO 1º EXPEDIENTE, RECUPERAR O HORÁRIO
							hora != null? hora.setHours(hora.getHours() + 1) : null; //ACRESCENTAR UMA HORA AO HORÁRIO DE SAÍDA DO 1º EXPEDIENTE																				
						}
					});
					var btnEntrada01 = Ext.ComponentQuery.query('#entrada01')[0];
					var btnSaida01 = Ext.ComponentQuery.query('#saida01')[0];
					var btnEntrada02 = Ext.ComponentQuery.query('#entrada02')[0];
					var btnSaida02 = Ext.ComponentQuery.query('#saida02')[0];
					
					if (!bateuPonto) {//SE NÃO NÃO BATEU O PONTO HOJE, HABILITAR O BOTÃO DA PRIMEIRA ENTRADA									
						if (btnEntrada01.isDisabled()) {//VERIFICANDO SE O BOTÃO ESTÁ DESABILITADO
							btnEntrada01.setDisabled(false);//HABILITANDO-O
						}
					} else {
						/**
						 * SE O USUÁRIO BATEU PONTO, SERÁ VERIFICADO SE HOUVE MAIS ALGUMA MOVIMENTAÇÃO
						 * VISTO QUE NO MÉTODO 'onRegistrarPonto()' O CLIQUE EM UM BOTÃO HABILITA O PRÓXIMO
						 */
						if (horarios[1] == null) { //SE O HORÁRIO DE SAÍDA FOR NULO, O USUÁRIO AINDA NÃO BATEU O PONTO DE SAÍDA
							if (btnSaida01.isDisabled()) { //VERIFICANDO SE O BOTÃO ESTÁ DESABILITADO
								btnSaida01.setDisabled(false); //HABILITANDO-O
							}
						} else if ((horarios[2] == null) && (result.horaAgora >= Ext.Date.format(hora, 'H:i:s'))) { //SE O USUÁRIO NÃO BATEU O PONTO AINDA E O INTERVALO DE 1 HORA AINDA NÃO SE PASSOU 
							if (btnEntrada02.isDisabled()) { //VERIFICA SE O BOTÃO ESTÁ DESABILITADO
								btnEntrada02.setDisabled(false); //HABILITA O BOTÃO
							}							
						} else if ((horarios[3] == null) && (horarios[2] != null))  {							
							if (btnSaida02.isDisabled()) {
								btnSaida02.setDisabled(false);
							}
						}
					}
				});
			}
		});
	},

	onRender: function (component, options) {
		var store = component.getStore();
	},

	onRegistrarPonto: function (button, options) {
		var panel = this.getPontoEletronicoUsuario(); //RECUPERANDO A REFERÊNCIA DO CONTAINER DE PONTO ELETRÔNICO
		var store = panel.getComponent('grid_pontos').getStore(); //RECUPERANDO A STORE DO GRID QUE ESTÁ DENTRO DO PANEL
		var turno;										
		/**
		 * AO REGISTRAR A ENTRADA DO PRIMEIRO EXPEDIENTE, O PRÓXIMO BOTÃO, NO CASO O DE SAÍDA, É HABILITADO
		 *  */

		if (button.getItemId() == "entrada01") {
			turno = "entrada01"; //NÃO É NECESSÁRIO INFORMAR
			var btnSaida01 = Ext.ComponentQuery.query("#saida01")[0];
			if (btnSaida01.isDisabled()) {
				btnSaida01.setDisabled(false);
			}

		} else if (button.getItemId() == "saida01") {
			turno = "saida01";

		} else if (button.getItemId() == "entrada02") {					
			turno = "entrada02";
			var btnSaida02 = Ext.ComponentQuery.query("#saida02")[0];
			if (btnSaida02.isDisabled()) {
				btnSaida02.setDisabled(false);
			}
			// store.each(function (rec) {
			// 	if(Ext.Date.format(new Date(), 'd/m/Y') == Ext.Date.format(rec.get("dataPonto"), 'd/m/Y')) {					
			// 		var hora = rec.get("saida01");
			// 		hora.setHours(hora.getHours() + 3);					
			// 		if(Ext.Date.format(new Date(), 'H:i:s') >= Ext.Date.format(hora, 'H:i:s')) {						
			// 			Ext.create('Packt.view.ponto_eletronico.JustificaPontoForm');
			// 		}
			// 	}
			// });

		} else if (button.getItemId() == "saida02") {
			turno = "saida02";
		}
		button.setDisabled(true);

		var store = panel.getComponent('grid_pontos').getStore(); //RECUPERANDO A STORE DO GRID QUE ESTÁ DENTRO DO PANEL		
		Ext.Ajax.request({
			method: 'POST',
			url: 'php/ponto_eletronico/inserirPonto.php',
			params: {
				turno: turno
			},

			failure: function (conn, response, options, e0pts) {
				Packt.util.Util.decodeJSON(conn.responseText);
			},

			success: function (conn, response, options, e0pts) {
				var result = Packt.util.Util.decodeJSON(conn.responseText);

				if (result.success) {
					if(turno == "saida01") {
						Packt.util.Alert.msg('Ponto Eletrônico', 'O próximo botão será habilitado em 1 (uma) hora');
					} else {
						Packt.util.Alert.msg('Ponto Eletrônico', 'Ponto registrado.');
					}
					store.load();
				}
			}
		});
	},

	setDateFieldFormat: function (thisComponent, newValue, oldValue, eOpts) {
		var dateField = thisComponent.up('toolbar').getComponent('filtroData');
		var data = dateField.getValue();
		if(thisComponent.getValue()) {		
			dateField.format = 'm/Y'; 
			dateField.submitFormat = 'm/Y'			
			dateField.setValue(Ext.Date.format(data, 'm/Y'));
		} else {		
			dateField.format = 'd/m/Y';
			dateField.submitFormat = 'd/m/Y'			
			dateField.setValue(dateField.lastValue);
		}		
	},

	filtrarDataEventSelect: function (field, value, e0pts) {
		var checkFormat = field.up('toolbar').getComponent('month_year_only');
		var store = Ext.getStore('pontoeletronico');
		store.load({
			filters: [
				{
					property: 'dataPonto',
					value: checkFormat.getValue() ? Ext.Date.format(value, 'Y-m') : value
				},
				{
					property: 'checkDateFormat',
					value: checkFormat.getValue()
				}
			]
		});
	},

	filtrarDataEventChange: function (thisComponent, newValue, oldValue, e0pts) {		
		if (thisComponent.getValue() == null) {//SE NÃO HOUVER VALOR NO CAMPO, RECARREGUE A STORE MOSTRANDO TODOS OS REGISTROS													
			var store = Ext.getStore('pontoeletronico');
			store.load();
		} else {
			/*var checkFormat = thisComponent.up('toolbar').getComponent('month_year_only');
			var store = Ext.getStore('pontoeletronico');
			store.load({
				filters: [
					{
						property: 'dataPonto',
						value: newValue
					},
					{
						property: 'checkDateFormat',
						value: checkFormat.getValue()
					}
				]
			});*/
			var tip = Ext.create('Ext.tip.ToolTip', {
				target: thisComponent.el,
				trackMouse: true, //ACOMPANHA O MOUSE ENQUANTO O MESMO ESTIVER DENTO DO CAMPO
				//iconCls: 'informacao',																	
				html: 'Deixe o campo em branco para rever todos os registros novamente'
			});
		}
	},

	filtrarDataEventKeypress: function (field, e, options) {
		var checkFormat = field.up('toolbar').getComponent('month_year_only');
		if (e.getKey() == e.ENTER) {
			if (field.isValid()) {
				var store = Ext.getStore('pontoeletronico');
				store.load({
					filters: [
						{
							property: 'dataPonto',
							value: checkFormat.getValue() ? Ext.Date.format(field.getValue(), 'Y-m') : field.getValue()
						},
						{
							property: 'checkDateFormat',
							value: checkFormat.getValue()
						}
					]
				});
			}
		}
	},

	onButtonClickPDF: function (button, e, options) {
		var url;
		var mainPanel = Ext.ComponentQuery.query('mainpanel')[0];
		if (button.getItemId() == "exportar_pdf_usuario") {
			url = 'php/pdf/exportarPontosUsuario.php'
		} else {
			var checkDateFormat = button.up('toolbar').getComponent('month_year_only');
			var filtro = button.up().down('#filtroData').getValue();
			if (checkDateFormat.getValue()) {
				filtro = Ext.Date.format(filtro, 'Y-m');
			} else {
				filtro = Ext.Date.format(filtro, 'Y-m-d');

			}
			url = 'php/pdf/exportarPontos.php?valorDoFiltro=' + filtro + '&check=' + checkDateFormat.getValue()
		}

		newTab = mainPanel.add({
			xtype: 'panel',
			closable: true,
			iconCls: 'pdf',
			title: 'PDF dos Pontos registrados',
			layout: 'fit',
			html: 'Carregando PDF...',
			items: [{
				xtype: 'uxiframe',
				src: url
			}]
		});
		mainPanel.setActiveTab(newTab);
	},

	onJustificarPonto: function (button, e, options) {
		Ext.create('Packt.view.ponto_eletronico.JustificaPontoForm');
	}
});