Ext.define('Packt.view.chaves.ChaveForm', {
	extend: 'Ext.window.Window',
	alias: 'widget.chaveform',

	title: 'Formulário de chaves',
	bodyPadding: 5,	
	height: 330,
	width: 500,

	modal: true,
	autoShow: true,
	autoScroll: true,

	layout: 'anchor',

	items: [
		{
			xtype: 'form',
			itemId: 'formChave',
			bodyPadding: 5,
			layout: 'anchor',
			items: [
				{
					xtype: 'fieldset',
					title: 'Retirada',
					itemId: 'fieldset_retirada',
					layout: 'anchor',					
					items: [
						{
							xtype: 'textfield',
							fieldLabel: 'Nº da chave',
							labelWidth: '30%',
							name: 'numChave',							
							disabled: true,
							anchor: '100%'
						},
						{
							xtype: 'textfield',
							fieldLabel: 'Retirando',
							labelWidth: '30%',
							name: 'retirar',
							allowBlank: false,
							anchor: '100%'
						},
						{
							xtype: 'textfield',
							fieldLabel: 'Entregando',
							labelWidth: '30%',
							name: 'entregar',
							allowBlank: false,
							anchor: '100%'
						},
						{
							xtype: 'datefield',
							fieldLabel: 'Data de retirada',
							labelWidth: '30%',
							name: 'dataRetirada',
							format: 'd/m/Y',
							submitFormat: 'Y-m-d',
							anchor: '100%'
						}
					]
				},				
				{
					xtype: 'fieldset',
					title: 'Devolução',
					itemId: 'fieldset_devolucao',
					layout: 'anchor',					
					items: [
						{
							xtype: 'textfield',
							fieldLabel: 'Devolvendo',
							labelWidth: '30%',
							name: 'devolver',
							allowBlank: false,
							anchor: '100%'
						},
						{
							xtype: 'textfield',
							fieldLabel: 'Recebendo',
							labelWidth: '30%',
							name: 'receber',
							allowBlank: false,
							anchor: '100%'
						},
						{
							xtype: 'datefield',
							fieldLabel: 'Data de Devolução',
							labelWidth: '40%',
							name: 'dataDevolucao',
							format: 'd/m/Y',
							submitFormat: 'Y-m-d',
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
						pack: 'end'
					},
					items: [
						{
							xtype: 'button',
							text: 'Salvar',
							itemId: 'salvar',
							iconCls: 'save'
						},
						{
							xtype: 'button',
							text: 'Cancelar',
							itemId: 'cancelar',
							iconCls: 'cancel'
						}
					]
				}
			]
		}		
	]
});
