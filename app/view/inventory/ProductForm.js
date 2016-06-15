Ext.define('Packt.view.inventory.ProductForm', {
	extend: 'Ext.window.Window',
	alias: 'widget.productform',

    modal: true,
	height: 420,
	width: 630,
	requires: ['Packt.util.Util'],

	layout: {
		type: 'fit'
	},

	title: 'Product',
	items: [
		{
			xtype: 'form',
			bodyPadding: 5,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'fieldset',
					flex: 2,
					title: translations.formProductFieldsetTitle1,
					defaults: {
						afterLabelTextTpl: Packt.util.Util.required,
						anchor: '100%',
						xtype: 'textfield',
						allowBlank: false,
						labelWidth: 70
					},
					items: [
                        {
                            xtype: 'hiddenfield',
                            fieldLabel: 'Label',
                            name: 'id'
                        },
                        {
                            fieldLabel: translations.formProductFieldLabelCode,
                            name: 'codigo'
                        },
                        {
                            fieldLabel: translations.formProductFieldLabelName,
                            maxLength: 100,
                            name: 'nome'
                        },
                        {
                            xtype: 'textarea',
                            fieldLabel: translations.formProductFieldLabelDescription,
                            maxLength: 110,
                            name: 'descricao'
                        },
                        {
							fieldLabel: translations.formProductFieldLabelQuantity,
							maxLength: 100,
							name: 'quantidade',
							vtype: 'numerico'
                        },
                        {
                            fieldLabel: translations.formProductFieldLabelQuantityMin,
                            maxLength: 100,
                            name: 'quantidadeMin',
							vtype: 'numerico'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: translations.formProductFieldLabelUnit,
                            name: 'Sigla_id',
                            displayField: 'name',
                            valueField: 'id',
                            queryMode: 'local',
                            store: 'inventory.UnidadesMedida',
							forceSelection: true
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Material',
                            name: 'tipoMaterial',
                            displayField: 'name',
                            valueField: 'id',
                            queryMode: 'local',
                            store: 'inventory.Materiais',
							forceSelection: true
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: translations.formProductFieldLabelCadastre,
                            maxLength: 100,
                            name: 'dataCadastro',
                            format: 'd/m/Y',
                            submitFormat: 'Y-m-d',
                            value: new Date()
                        },
                        {
							xtype: 'filefield',
							fieldLabel: translations.formProductFieldLabelPicture,
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
					title: translations.formProductFieldsetTitle2,
					width: 270,
					items: [
						{
							xtype: 'image',
                            itemId: 'imageForm',
							height: 240,
							width: 240,
							src: ''
						}
					]
				}
			],
			dockedItems: [
				{
					xtype: 'toolbar',
					//flex: 1,
					dock: 'bottom',
					//ui: 'footer',
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
							formBind: true,
							cls: 'btn btn-success'
						}
					]
				}
			]
		}
    ]/*,
	dockedItems: [
		{
    		xtype: 'toolbar',
    		flex: 1,
    		dock: 'bottom',
    		ui: 'footer',
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
                    cls: 'btn btn-success'
        		}
    		]
		}
	]*/
});