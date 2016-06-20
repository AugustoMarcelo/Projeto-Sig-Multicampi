Ext.define('Packt.view.ponto_eletronico.JustificaPontoForm', {
	extend: 'Ext.window.Window',
	alias: 'widget.justificapontoform',

	modal: true,
	autoShow: true,
	height: 350,
	width: 390,
	minHeight: 350,
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
					fieldLabel: 'label',
					name: 'id'
				},
				{
					xtype: 'datefield',
					fieldLabel: 'Data do ponto',
					name: 'dataPonto'
				},
				// {
				// 	xtype: 'combobox',
				// 	fieldLabel: 'Expediente',
				// 	displayField: 'name',
				// 	valueField: 'valor',
				// 	store: Ext.create('Ext.data.Store', {
				// 		fields: ['valor', 'name'],
				// 		data: [
				// 			{ "valor": "entrada01", "name": "Entrada/1º Expediente" },
				// 			{ "valor": "saida01", "name": "Saída/1º Expediente" },
				// 			{ "valor": "entrada01", "name": "Entrada/2º Expediente" },
				// 			{ "valor": "saida02", "name": "Saída/2º Expediente" }
				// 		]
				// 	})
				// },
				{
					xtype: 'fieldset',
					title: 'Horários',
					defaults: {
						// xtype: 'textfield',
						// emptyText: 'hh:mm:ss',
						// anchor: '100%',
						// labelWidth: 90						
					},
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
									fieldLabel: 'Exntrada - 1º Exp.',
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
										change: function(thisComponent, oldValue, newValue, eOpts) {
											thisComponent.up('fieldcontainer').getComponent('entradaExp1').setDisabled(!thisComponent.getValue());
										}
									}
								}
							]
						}
					]
				},
				{
					xtype: 'textarea',
					rows: 7,
					fieldLabel: 'Justificativa',
					emptyText: 'Justifique aqui o seu ponto',
					anchor: '100%'
				}
			],
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'bottom',
					//flex: 1,
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
							iconCls: 'justificar-button'
						}
					]
				}
			]
		}
	]
});