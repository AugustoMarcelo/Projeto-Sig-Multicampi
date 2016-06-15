Ext.define('Packt.view.unidade.FormUnidade', {
	extend: 'Ext.window.Window',
	alias: 'widget.formunidade',
	modal: true,
	autoShow: true,
	height: 160,
	width: 460,

	title: 'Cadastrar Unidade',

	items: [
		{
			xtype: 'form',
			bodyPadding: 10,
			defaults: {
				xtype: 'textfield',
				anchor: '100%',
				labelWidth: '35%'
			},
			items: [
				{
					xtype: 'hiddenfield',
					fieldLabel: 'Id',
					name: 'id'
				},
				{
					fieldLabel: 'Código',
					name: 'codigo',
					emptyText: 'Ex.: 18.00'
				},
				{
					fieldLabel: 'Nome da Unidade',
					name: 'nomeUnidade',
					emptyText: 'Ex.: CERES ou Centro de Ensino Superior do Seridó'
				},
				{
					fieldLabel: 'Responsável',
					name: 'responsavel',
					emptyText: 'Responsável pela unidade'
				}
			]			
		}
	],
	dockedItems: [
		{
			xtype: 'toolbar',
			dock: 'bottom',
			ui: 'footer',
			layout: {
				pack: 'end',
				type: 'hbox'
			},
			items: [
				{
					xtype: 'button',
					text: 'Cancelar',
					itemId: 'cancelar',
					iconCls: 'cancel'
				},				
				{
					xtype: 'tbseparator'
				},
				{
					xtype: 'button',
					text: 'Salvar',
					itemId: 'salvar',
					iconCls: 'save'
				}
			]
		}
	]
});