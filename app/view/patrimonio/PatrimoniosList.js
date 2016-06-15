Ext.define('Packt.view.patrimonio.PatrimoniosList', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.patrimonioslist',

	requires: [
		'Ext.ux.grid.column.ActionButtonColumn',
		'Ext.ux.TextMaskPlugin'
	],

	store: 'patrimonio.Patrimonios',	

	columnLines: true,	
	initComponent: function() {		
		var me = this;

		Ext.apply(me, {
			columns: [
				{text: 'Tombo', dataIndex: 'tombo', width: '10%'},
				{text: 'Denominação', dataIndex: 'denominacao', width: '30%'},				
				{ 
					text: 'Tipo do Material',
					dataIndex: 'tipoMaterial', 
					width: '10%',
					renderer: function(value, metaData, record) {
                        var materialStore = Ext.getStore('materiais');
                        var material = materialStore.findRecord('id', value);
						if(material != null) {
							return material.get('name');
						} else {
							return "Não informado";
						}
                    } 
				},
				{
					text: 'Preço', 
					dataIndex: 'preco', 
					width: '10%', 
					renderer: Ext.util.Format.maskRenderer('R$ #9.999.999,99', true)
				},				
				{
					text: 'Código da unidade - Responsável ', 
					dataIndex: 'codigo_unidade', 
					width: '30%',
					renderer: function(value, metaData, record) {
						var unidadeStore = Ext.getStore('unidades');
						var unidade = unidadeStore.findRecord('id', value);
						
						if(unidade != null) {							
							return (unidade.get('codigo') + " - " + unidade.get('responsavel'));
						} else {
							return "Não informado";
						}
					}
				},				
				{					
					xtype: 'actionbuttoncolumn',
					header: 'Especificações',
					width: '10%',					
					items: [
						{
							//action: 'informacoes',							
							iconCls: 'detalhes',
							tooltip: 'Informação',
							text: 'Ver detalhes',
							handler: function(grid, rowIndex, colIndex) {
		                        var rec = grid.getStore().getAt(rowIndex);
		                        console.log("Espeficiações: " + rec.get('especificacoes') + "\n" + "Situação: "+rec.get('situacao'));            
		                    }							
						}
					]
				}
			],
			forceFit: true,
			dockedItems: [
				{
					xtype: 'pagingtoolbar',
					store: me.store,
					dock: 'bottom',
					displayInfo: true,
					emptyMsg: 'Não há registros a serem exibidos',
					displayMsg: 'Mostrando {0} - {1} de {2} registro(s)'
				}
			]
		});

		me.callParent(arguments);
		//me.store.load();
	}

});