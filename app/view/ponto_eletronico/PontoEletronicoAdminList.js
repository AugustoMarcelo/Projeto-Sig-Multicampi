Ext.define('Packt.view.ponto_eletronico.PontoEletronicoAdminList', {
	extend: 'Ext.grid.Panel',

	alias: 'widget.pontoeletronicoadminlist',

	// store: {
	// 	type: 'pontoeletronico'
	// },

	store: 'pontoeletronico',

	columnLines: true,

	initComponent: function() {
		var me = this;		

		if(Ext.isString(me.store)) {
			me.store = Ext.create('Packt.store.ponto_eletronico.PontoEletronico');
		}		

		Ext.apply(me, {
			columns: [				
				{
					xtype: 'datecolumn',
					format: 'd/m/Y',
					text: 'Data',
					dataIndex: 'dataPonto',
					width: '12%',
					align: 'center'
				},
				{
					text: 'Usuário',					
					dataIndex: 'nomeUsuario',
					width: '22%',
					align: 'center'
				},
				{
					text: 'IP da Máquina',
					dataIndex: 'ip',
					width: '14%',
					align: 'center'
				},
				{
					xtype: 'datecolumn',
					format: 'H:i:s',
					text: 'Entrada/1º Expediente',
					dataIndex: 'entrada01',
					width: '13%',
					align: 'center',
					renderer: function(value, metaData, record) {						
						return value != null ? Ext.Date.format(value, 'H:i:s') : '--:--:--';
					}
				},
				{
					xtype: 'datecolumn',
					format: 'H:i:s',
					text: 'Saída/1º Expediente',
					dataIndex: 'saida01',
					width: '13%',
					align: 'center',
					renderer: function(value, metaData, record) {						
						return value != null ? Ext.Date.format(value, 'H:i:s') : '--:--:--';
					}
				},
				{
					xtype: 'datecolumn',
					format: 'H:i:s',
					text: 'Entrada/2º Expediente',
					dataIndex: 'entrada02',
					width: '13%',
					align: 'center',
					renderer: function(value, metaData, record) {						
						return value != null ? Ext.Date.format(value, 'H:i:s') : '--:--:--';
					}
				},
				{
					xtype: 'datecolumn',
					format: 'H:i:s',
					text: 'Saída/2º Expediente',
					dataIndex: 'saida02',
					width: '13%',
					align: 'center',
					renderer: function(value, metaData, record) {						
						return value != null ? Ext.Date.format(value, 'H:i:s') : '--:--:--';
					}
				}
			],			
			forceFit: true,	
			dockedItems: [
				{
					xtype: 'pagingtoolbar',
					store: me.store,
					dock: 'bottom',
					displayInfo: true,
					emptyMsg: 'Não há pontos registrados',
					displayMsg: 'Exibindo {0} - {1} de {2} registro(s)'
				}
			]
		});

		me.callParent(arguments);
		//me.store.load();
	}

});