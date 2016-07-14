Ext.define('Packt.controller.ponto_eletronico.PontoEletronico', {
	extend: 'Ext.app.Controller',

	requires: [
		'Ext.form.field.Time',
		'Ext.form.FieldContainer'
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
				click: this.onOpenViewJustificarPonto
			},
			"pontoeletronicousuario button[itemId=corrigirPonto]": {
				click: this.onCorrigirPonto
			},
			"justificapontoform button#cancel": {
				click: this.onCloseWindow
			},
			"justificapontoform datefield": {
				select: this.onBuscarPontos,
				change: this.onChangeValue
			},
			"justificapontoform button#btnClearFilters": {
				click: this.onClearFilter
			},
			"justificapontoform button#justificar": {
				click: this.onJustificarPonto
			}
		});
	},

	onJustificarPonto: function (button, e, options) {
		var modify = false;															//VARIÁVEL UTILIZADA PARA VERIFICAR SE HOUVE MUDANÇAS NOS HORÁRIOS DOS PONTOS
		var botoes = [];															//VETOR DE BOTÕES
		var form = button.up('form');												//REFERÊNCIA DO FORMULÁRIO

		botoes[1] = button.up('form').query('textfield#entradaExp1')[0];			//BOTÃO REFERENTE A ENTRADA DO 1º EXPEDIENTE
		botoes[2] = button.up('form').query('textfield#saidaExp1')[0];				//BOTÃO REFERENTE A SAIDA DO 1º EXPEDIENTE
		botoes[3] = button.up('form').query('textfield#entradaExp2')[0];			//BOTÃO REFERENTE A ENTRADA DO 2º EXPEDIENTE
		botoes[4] = button.up('form').query('textfield#saidaExp2')[0];				//BOTÃO REFERENTE A SAIDA DO 2º EXPEDIENTE

		for (var i = 1; botoes.length; i++) {
			if (botoes[i].originalValue != botoes[i].getValue()) {
				modify = true;
				break;
			}
		}

		if (modify) {
			if (form.getForm().isValid()) {
				form.getForm().submit({
					clientValidation: true,
					url: 'php/ponto_eletronico/inserirJustificativa.php',

					success: function (form, action) {
						var resultado = action.result;

						if (resultado.success) {
							if (resultado.novo) {
								Packt.util.Alert.msg('Ponto eletrônico', 'Ponto Justificado com sucesso.');
								button.up('window').close();
							} else {
								Packt.util.Alert.msg('Ponto eletrônico', 'Justificativa alterada com sucesso.');
								button.up('window').close();
							}
							Ext.getStore('justificativas').load();
						}
					},

					failure: function (form, action) {
						switch (action.failureType) {
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

		} else {
			Packt.util.Alert.msg('Ponto eletrônico', 'Todos os horários estão iguais.');
		}
	},

	/**
	 * MÉTODO UTILIZADO PARA LIMPAR OS TEXTFIELDS E DESMARCAR OS CHECKBOXES
	 */
	onClearFilter: function (button, e, options) {
		button.up('fieldcontainer').down('datefield').reset();						//RESETANDO O CAMPO DA DATA
		var fieldset = button.up('form').getComponent('fieldset_horarios');			//PEGANDO A REFERÊNCIA DO FIELDSET PARA ITERAÇÃO
		for (var i = 0; i < fieldset.items.length; i++) { 							//PERCORRENDO OS COMPONENTES DO FIELDSET E RESENTANDO SEUS CAMPOS
			fieldset.query('textfield')[i].reset();      							//RESETANDO TODOS OS TEXTFIELDS
			fieldset.query('checkbox')[i].setValue(false);							//DESMARCANDO TODOS OS CHECKBOXES
		}
	},

	/**
	 * MÉTODO UTILIZADO PARA BUSCAR OS HORÁRIOS DO USUÁRIO APÓS O MESMO
	 * ESCOLHER UMA DATA A PARTIR DO PICKER DO DATEFIELD. 
	 * TODOS OS HORÁRIOS ENCONTRADOS NA DATA DETERMINADA SERÃO PREENCHIDOS 
	 * EM SEUS RESPECTIVOS CAMPOS. 
	 */
	onBuscarPontos: function (field, value, eOpts) {
		Ext.Ajax.request({															//REQUISIÇÃO AJAX PASSANDO POR PARÂMETRO A DATA
			url: 'php/ponto_eletronico/buscaPontos.php',
			method: 'POST',
			params: {
				dataPonto: Ext.Date.format(field.getValue(), 'Y-m-d')
			},

			success: function (conn, response, options, eOpts) {								//EM CASO DE SUCESSO, TODOS OS VALORES SERÃO SETADOS
				var result = Packt.util.Util.decodeJSON(conn.responseText);
				if (result.ponto != null) {
					if (result.justificativa == null) {
						var fieldset = field.up('form').getComponent('fieldset_horarios');
						field.up('form').down('hiddenfield#idPonto').setValue(result.ponto.id);
						fieldset.query('textfield#entradaExp1')[0].setValue(result.ponto.entrada01);
						fieldset.query('textfield#entradaExp1')[0].originalValue = result.ponto.entrada01;	 //SETANDO O VALOR ORIGINAL NO TEXTFIELD PARA QUE POSSA SER COMPARADO EM CASO DE ALGUMA JUSTIFICATIVA DO USUÁRIO			
						fieldset.query('textfield#saidaExp1')[0].setValue(result.ponto.saida01);
						fieldset.query('textfield#saidaExp1')[0].originalValue = result.ponto.saida01;		 //SETANDO O VALOR ORIGINAL NO TEXTFIELD PARA QUE POSSA SER COMPARADO EM CASO DE ALGUMA JUSTIFICATIVA DO USUÁRIO
						fieldset.query('textfield#entradaExp2')[0].setValue(result.ponto.entrada02);
						fieldset.query('textfield#entradaExp2')[0].originalValue = result.ponto.entrada02;	 //SETANDO O VALOR ORIGINAL NO TEXTFIELD PARA QUE POSSA SER COMPARADO EM CASO DE ALGUMA JUSTIFICATIVA DO USUÁRIO
						fieldset.query('textfield#saidaExp2')[0].setValue(result.ponto.saida02);
						fieldset.query('textfield#saidaExp2')[0].originalValue = result.ponto.saida02;		 //SETANDO O VALOR ORIGINAL NO TEXTFIELD PARA QUE POSSA SER COMPARADO EM CASO DE ALGUMA JUSTIFICATIVA DO USUÁRIO
					} else {
						Ext.Msg.show({
							title: 'Opa..',
							closable: false,
							msg: 'Você já justificou esse dia.' + '<br />' + 'Vá ao menu de justificativas e edite-a',
							buttons: Ext.Msg.OK,
							icon: 'stop',
							fn: function () {
								field.reset();
							}
						});
					}
				} else {
					field.markInvalid("Você não registrou entradas nesse dia! Ao justificá-lo, será criado um ponto com horários não determinados.");
				}
			},

			failure: function (conn, response, options, eOpts) {
				var result = Packt.util.Util.decodeJSON(conn.responseText);
			}
		});
	},

	/**
	 * MÉTODO UTILIZADO PARA HABILITAR/DESABILITAR O BOTÃO DE LIMPAR O FILTRO DE DATA.
	 * ESSE MÉTODO É EXECUTADO A PARTIR DO EVENTO 'change' DO DATEFIELD;
	 * SEMPRE QUE FOR VAZIO, O BOTÃO ESTARÁ DESABILITADO.
	 */
	onChangeValue: function (thisComponent, newValue, oldValue, eOpts) {
		var btnClearFilters = thisComponent.up('fieldcontainer').getComponent('btnClearFilters');
		var fieldset = thisComponent.up('form').getComponent('fieldset_horarios');
		btnClearFilters.setDisabled(thisComponent.getValue() != null ? false : true);
		fieldset.setDisabled(thisComponent.getValue() != null ? false : true);
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
							hora = horarios[1] != null ? new Date(horarios[1]) : null; 								//SE O USUÁRIO AINDA JÁ TIVER SAÍDO NO 1º EXPEDIENTE, RECUPERAR O HORÁRIO
							hora != null ? hora.setHours(hora.getHours() + 1) : null; 								//ACRESCENTAR UMA HORA AO HORÁRIO DE SAÍDA DO 1º EXPEDIENTE																				
						}
					});
					var btnEntrada01 = Ext.ComponentQuery.query('#entrada01')[0];
					var btnSaida01 = Ext.ComponentQuery.query('#saida01')[0];
					var btnEntrada02 = Ext.ComponentQuery.query('#entrada02')[0];
					var btnSaida02 = Ext.ComponentQuery.query('#saida02')[0];

					if (!bateuPonto) {																				//SE NÃO NÃO BATEU O PONTO HOJE, HABILITAR O BOTÃO DA PRIMEIRA ENTRADA									
						if (btnEntrada01.isDisabled()) {															//VERIFICANDO SE O BOTÃO ESTÁ DESABILITADO
							btnEntrada01.setDisabled(false);														//HABILITANDO-O
						}
					} else {
						/**
						 * SE O USUÁRIO BATEU PONTO, SERÁ VERIFICADO SE HOUVE MAIS ALGUMA MOVIMENTAÇÃO
						 * VISTO QUE NO MÉTODO 'onRegistrarPonto()' O CLIQUE EM UM BOTÃO HABILITA O PRÓXIMO
						 */
						if (horarios[1] == null) { 																	//SE O HORÁRIO DE SAÍDA FOR NULO, O USUÁRIO AINDA NÃO BATEU O PONTO DE SAÍDA
							if (btnSaida01.isDisabled()) {															//VERIFICANDO SE O BOTÃO ESTÁ DESABILITADO
								btnSaida01.setDisabled(false); 														//HABILITANDO-O
							}
						} else if ((horarios[2] == null) && (result.horaAgora >= Ext.Date.format(hora, 'H:i:s'))) { //SE O USUÁRIO NÃO BATEU O PONTO AINDA E O INTERVALO DE 1 HORA AINDA NÃO SE PASSOU 
							if (btnEntrada02.isDisabled()) { 														//VERIFICA SE O BOTÃO ESTÁ DESABILITADO
								btnEntrada02.setDisabled(false); 													//HABILITA O BOTÃO
							}
						} else if ((horarios[3] == null) && (horarios[2] != null)) {
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
		var panel = this.getPontoEletronicoUsuario(); 										//RECUPERANDO A REFERÊNCIA DO CONTAINER DE PONTO ELETRÔNICO
		var store = panel.getComponent('grid_pontos').getStore(); 							//RECUPERANDO A STORE DO GRID QUE ESTÁ DENTRO DO PANEL
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

		//var store = panel.getComponent('grid_pontos').getStore(); //RECUPERANDO A STORE DO GRID QUE ESTÁ DENTRO DO PANEL		
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
					if (turno == "saida01") {
						Packt.util.Alert.msg('Ponto Eletrônico', 'O próximo botão será habilitado em 1 (uma) hora');
					} else {
						Packt.util.Alert.msg('Ponto Eletrônico', 'Ponto registrado.');
					}
					store.load();
				}
			}
		});
	},

	/**
	 * MÉTODO UTILIZADO PARA FORMATAR O CAMPO DATEFIELD CASO O USUÁRIO DESEJE 
	 * FILTRAR SOMENTE PELO MÊS E O ANO.
	 */
	setDateFieldFormat: function (thisComponent, newValue, oldValue, eOpts) {
		var dateField = thisComponent.up('toolbar').getComponent('filtroData');
		var data = dateField.getValue();
		if (thisComponent.getValue()) {												//SE O CHECKBOX ESTIVER MARCADO
			dateField.format = 'm/Y';												//MUDE A FORMA DE APRESENTAÇÃO PARA MOSTRAR SOMENTE MÊS E ANO
			dateField.submitFormat = 'm/Y'											//MUDE A FORMA DE ENVIO DA DATA PARA ENVIAR SOMENTE MÊS E ANO
			dateField.setValue(Ext.Date.format(data, 'm/Y'));						//SETE A DATA NO DATEFIELD COM A FORMATAÇÃO DE MÊS E ANO

		} else {																	//SE O CHECKBOX NÃO ESTIVER MARCADO
			dateField.format = 'd/m/Y';												//PERMANAÇA COM A FORMA PADRÃO DA APLICAÇÃO MOSTRANDO DIA/MÊS/ANO
			dateField.submitFormat = 'd/m/Y'										//PERMANEÇA COM A FORMA DE ENVIO DA DATA SENDO DIA/MÊS/ANO
			dateField.setValue(dateField.lastValue);								//SETE NO DATEFIELD A ÚLTIMA DATA QUE CONTINHA A FORMATAÇÃO PADRÃO DA APLICAÇÃO
		}
	},

	/**
	 * MÉTODO UTILIZADO PARA FILTRAR OS PONTOS A PARTIR DA TECLA 'ENTER'
	 */
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

	/**
	 * MÉTODO UTILIZADO PARA MOSTRAR TODOS OS DADOS NO GRID, CASO O DATEFIELD ESTEJA EM BRANCO
	 */
	filtrarDataEventChange: function (thisComponent, newValue, oldValue, e0pts) {
		if (thisComponent.getValue() == null) {													//SE NÃO HOUVER VALOR NO CAMPO, RECARREGUE A STORE MOSTRANDO TODOS OS REGISTROS													
			var store = Ext.getStore('pontoeletronico');
			store.load();
		} else {
			var tip = Ext.create('Ext.tip.ToolTip', {
				target: thisComponent.el,
				trackMouse: true, 																//ACOMPANHA O MOUSE ENQUANTO O MESMO ESTIVER DENTO DO CAMPO															
				html: 'Deixe o campo em branco para rever todos os registros novamente'
			});
		}
	},

	/**
	 * MÉTODO UTILIZADO PARA FILTRAR OS PONTOS A PARTIR DA TECLA 'ENTER'
	 */
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

	//MÉTODO UTILIZADO PARA ABRIR O FORMULÁRIO DE JUSTIFICATIVA DE PONTO
	onOpenViewJustificarPonto: function (button, e, options) {
		Ext.create('Packt.view.ponto_eletronico.JustificaPontoForm');
		// Ext.Msg.show({
		// 	title: 'Tenha calma...',
		// 	msg: 'Funcionalidade a ser liberada em breve',
		// 	buttons: Ext.Msg.OK,
		// 	icon: 'yoga'
		// });
	},

	//MÉTODO UTILIZADO PARA FECHAR O FORMULÁRIO DE JUSTIFICATIVA DE PONTO
	onCloseWindow: function (button, e, options) {
		button.up('window').close();
	}
});