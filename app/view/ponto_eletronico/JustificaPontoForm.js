Ext.define('Packt.view.ponto_eletronico.JustificaPontoForm', {
	extend: 'Ext.window.Window',
	alias: 'widget.justificapontoform',
	modal: true,
	autoShow: true,
	closable: false,
	height: 370,
	width: 390,
	minHeight: 370,	
	layout: {
		type: 'fit'
	},

	title: 'Justificar Ponto',
	items: [
		{
			xtype: 'form',
			bodyPadding: 10,
			defaults: {
				anchor: '100%'
			},
			items: [
				{
					xtype: 'hiddenfield',
					fieldLabel: 'ID da Justificativa',
					name: 'id'
				},
				{
					xtype: 'hiddenfield',
					fieldLabel: 'ID do ponto',
					name: 'idPonto',
					itemId: 'idPonto'
				},
				{
					xtype: 'fieldcontainer',
					name: 'fieldContainer_date',
					layout: 'hbox',
					items: [
						{
							xtype: 'datefield',
							fieldLabel: 'Data do ponto',
							name: 'dataPonto',							
							alowBlank: false,							
							labelWidth: 110,
							width: 314,							
							padding: '0 0 0 10'											
						},
						{
							xtype: 'button',
							itemId: 'btnClearFilters',
							disabled: true,
							iconCls: 'delete-filter',
							tooltip: 'Limpar filtro',
							margin: '0 0 0 10'							
						}
					]
				},
				{
					xtype: 'fieldset',
					itemId: 'fieldset_horarios',
					disabled: true,
					title: 'Horários',					
					items: [
						{
							xtype: 'fieldcontainer',
							name: 'fieldContainer_entrada01',
							defaultType: 'textfield',
							layout: {
								type: 'hbox'
							},
							items: [
								{
									fieldLabel: 'Entrada - 1º Exp.',
									disabled: true,
									labelWidth: 110,
									name: 'entradaExp1',
									itemId: 'entradaExp1'
								},
								{
									xtype: 'checkbox',
									boxLabel: 'Editar',
									boxLabelAlign: 'after',
									padding: '0 0 0 10',
									name: 'checkEditEntrada1',
									listeners: {
										change: function (thisComponent, oldValue, newValue, eOpts) {
											thisComponent.up('fieldcontainer').getComponent('entradaExp1').setDisabled(!thisComponent.getValue());
										}
									}
								}
							]
						},
						{
							xtype: 'fieldcontainer',
							name: 'fieldContainer_saida01',
							defaultType: 'textfield',
							layout: {
								type: 'hbox'
							},
							items: [
								{
									fieldLabel: 'Saída    - 1º Exp.',
									disabled: true,
									labelWidth: 110,
									name: 'saidaExp1',
									itemId: 'saidaExp1'
								},
								{
									xtype: 'checkbox',
									boxLabel: 'Editar',
									boxLabelAlign: 'after',
									padding: '0 0 0 10',
									name: 'checkEditSaida1',
									listeners: {
										change: function (thisComponent, oldValue, newValue, eOpts) {
											thisComponent.up('fieldcontainer').getComponent('saidaExp1').setDisabled(!thisComponent.getValue());
										}
									}
								}
							]
						},
						{
							xtype: 'fieldcontainer',
							name: 'fieldContainer_entrada02',
							defaultType: 'textfield',
							layout: {
								type: 'hbox'
							},
							items: [
								{
									fieldLabel: 'Entrada - 2º Exp.',
									disabled: true,
									labelWidth: 110,
									name: 'entradaExp2',
									itemId: 'entradaExp2'
								},
								{
									xtype: 'checkbox',
									boxLabel: 'Editar',
									boxLabelAlign: 'after',
									padding: '0 0 0 10',
									name: 'checkEditEntrada2',
									listeners: {
										change: function (thisComponent, oldValue, newValue, eOpts) {
											thisComponent.up('fieldcontainer').getComponent('entradaExp2').setDisabled(!thisComponent.getValue());
										}
									}
								}
							]
						},
						{
							xtype: 'fieldcontainer',
							name: 'fieldContainer_saida02',
							defaultType: 'textfield',
							layout: {
								type: 'hbox'
							},
							items: [
								{
									fieldLabel: 'Saída - 2º Exp.',
									disabled: true,
									labelWidth: 110,
									name: 'saidaExp2',
									itemId: 'saidaExp2'
								},
								{
									xtype: 'checkbox',
									boxLabel: 'Editar',
									boxLabelAlign: 'after',
									padding: '0 0 0 10',
									name: 'checkEditSaida2',
									listeners: {
										change: function (thisComponent, oldValue, newValue, eOpts) {
											thisComponent.up('fieldcontainer').getComponent('saidaExp2').setDisabled(!thisComponent.getValue());
										}
									}
								}
							]
						}
					]
				},
				{
					xtype: 'fieldset',
					title: 'Justificativa',
					name: 'fieldset_justificativa',
					items: [
						{
							xtype: 'textarea',
							name: 'textarea_justificativa',
							allowBlank: false,
							rows: 7,
							fieldStyle: {
								backgroundImage: 'none;', 									//RETIRA A SOMBRA NO TOPO DO TEXTAREA
								border: 'none;',											//RETIRAS AS BORDAS DO TEXTAREA
								fontStyle: 'italic;'										//FONTE ITÁLICA
							},
							emptyText: 'Justifique aqui o seu ponto',
							anchor: '100%'
						}
					]
				}
			],
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'bottom',
					layout: {
						pack: 'end',
						type: 'hbox'
					},
					items: [
						{
							xtype: 'button',
							text: 'Cancelar',
							itemId: 'cancel',
							iconCls: 'cancel'
						},
						{
							xtype: 'button',
							text: 'Justificar',
							itemId: 'justificar',
							iconCls: 'justificar-button',
							formBind: true
						}
					]
				}
			]
		}
	]
});