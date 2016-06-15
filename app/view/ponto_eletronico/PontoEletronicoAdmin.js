Ext.define('Packt.view.ponto_eletronico.PontoEletronicoAdmin', {
	extend: 'Ext.panel.Panel',
	frame: true,
	alias: 'widget.pontoeletronicoadmin',

	requires: [
		'Packt.view.ponto_eletronico.PontoEletronicoAdminList'
	],

	layout: 'fit',

	items: [
		{
			xtype: 'pontoeletronicoadminlist',
			emptyText: 'Nenhum ponto cadastrado'
		}
	],

	dockedItems: [
		{
			xtype: 'toolbar',
			flex: 1,
			dock: 'top',
			items: [				
				{
					xtype: 'tbtext',
					text: 'Filtrar por data:'
				},
				{
					xtype: 'datefield',
					itemId: 'filtroData',																			
					emptyText: 'dd/mm/aaaa',					
					enableKeyEvents: true/*,
					listeners: {						
						/*keypress: function(field, e, options) {
							if(e.getKey() == e.ENTER) {									
								var store = Ext.getStore('pontoeletronico');
								store.clearFilter();
								store.filter({
									property: 'dataPonto', 
									value: field.getValue()
								});																							
							} 
						},*/
						/*change: function(thisComponent, newValue, oldValue, e0pts) {							
							if(newValue) {
								var store = Ext.getStore('pontoeletronico');
								store.clearFilter();
								store.filter({
									property: 'dataPonto', 
									value: newValue
								});
								var tip = Ext.create('Ext.tip.ToolTip', {
									target: thisComponent.el,
									trackMouse: true, //ACOMPANHA O MOUSE ENQUANTO O MESMO ESTIVER DENTO DO CAMPO
									iconCls: 'informacao',																	
									html: 'Deixe o campo em branco para rever todos os registros novamente'
								});								
							} else {
								var store = Ext.getStore('pontoeletronico');
								store.clearFilter();
							}																				
						}
					}*/
				},
				{
					xtype: 'tbseparator'
				},
				{
					xtype: 'button',
					text: 'Exportar para PDF',
					tooltip: 'Exporta todos os pontos já registrados para o formatdo PDF',					
					itemId: 'exportar_pdf',
					iconCls: 'pdf'
				},
				{
					xtype: 'tbseparator'
				},
				{
					xtype: 'checkbox',
					fieldLabel: 'somente mês e ano',
					itemId: 'month_year_only'						
				}
				
			]
		}
	]
});