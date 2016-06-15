Ext.define('Packt.view.security.Profile', {
	extend: 'Ext.window.Window',
	alias: 'widget.profile',

    modal: true,
	height: 310,
	width: 550,
	requires: ['Packt.util.Util'],

	layout: {
		type: 'fit'
	},

	title: 'User',
	items: [
		{
			xtype: 'form',
			frame: false,
			bodyPadding: 10,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'fieldset',
					flex: 2,
					title: translations.formUserFieldsetTitle1,
					defaults: {
						afterLabelTextTpl: Packt.util.Util.required,
						anchor: '100%',
						xtype: 'textfield',
						allowBlank: false,
						labelWidth: 60
					},
					items: [
                        {
                            xtype: 'hiddenfield',
                            fieldLabel: 'Label',
                            name: 'id'
                        },
                        {
                            fieldLabel: translations.formUserFieldLabelUsername,
                            name: 'userName'
                        },
                        {
                            fieldLabel: translations.formUserFieldLabelName,
                            maxLength: 100,
                            name: 'name'
                        },
                        {
                            fieldLabel: translations.formUserFieldLabelRegistration,
                            maxLength: 110,
                            name: 'registration',
							vtype: 'numerico'
                        },
                        {
							fieldLabel: translations.formUserFieldLabelPassword,
							maxLength: 100,
							name: 'password',
							inputType: 'password'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: translations.formUserFieldLabelGroup,
                            name: 'Group_id',
                            displayField: 'name',
                            valueField: 'id',
                            queryMode: 'local',
                            store: 'security.Groups',
							forceSelection: true
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Level',
                            name: 'level',
                            minValue: 1,
                            maxValue: 5,
							listeners: {
								focus: function (thisComponent, The, e0pts) {
									var tip = Ext.create('Ext.tip.ToolTip', {
										target: thisComponent.el,
										trackMouse: true,
										html: 'Quanto maior o level do usuário, mais permissões ele terá.'
									});
								}
							}
                        },
						{
							xtype: 'combobox',
							fieldLabel: 'Status',
							itemId: 'status',
							name: 'status',
							displayField: 'name',
							valueField: 'valor',
							queryMode: 'local',
							value: 'ATIVO',
							forceSelection: true, //FORÇA O USUÁRIO A ESCOLHER DENTRE AS OPÇÕES OFERECIDAS PELO COMBOBOX
							hidden: true, //COMO O USUÁRIO ESTÁ SENDO ADICIONADO, NÃO FAZ SENTIDO TORNÁ-LO INATIVO. LOGO, POR PADRÃO, UM USUÁRIO COMEÇA COM STATUS 'ATIVO'
							store: Ext.create('Ext.data.Store', {
								fields: ['valor', 'name'],
								data: [
									{ "valor": "ATIVO", "name": "Ativo" },
									{ "valor": "INATIVO", "name": "Inativo" }
								]
							})
						},
                        {
							xtype: 'filefield',
							fieldLabel: translations.formUserFieldLabelPicture,
							name: 'picture',
							allowBlank: true,
							afterLabelTextTpl: '',
                            buttonText: '',
                            buttonConfig: {
                                iconCls: 'image'
                            }
                        }
					]
				},
				{
					xtype: 'fieldset',
					title: translations.formUserFieldsetTitle2,
					width: 200,                    
					items: [
						{
							xtype: 'image',
                            itemId: 'userImageForm',
							height: 190,
							width: 190,
							src: ''
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
							text: translations.cancel,
							itemId: 'cancel',
							iconCls: 'cancel'
						},
						{
							xtype: 'button',
							text: translations.save,
							itemId: 'save',
							iconCls: 'save',
							formBind: true
						}
					]
				}
			]
		}
    ]
});